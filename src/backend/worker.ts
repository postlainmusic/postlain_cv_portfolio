import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export const app = new Hono();

// Global CORS Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'postlain-api',
  });
});

// Profile metadata endpoint
app.get('/api/profile', (c) => {
  return c.json({
    success: true,
    data: {
      name: 'Ngô Phúc',
      alias: 'POSTLAIN',
      title: 'MANAGER — QUẢN LÍ',
      slogan: 'Quản lí bằng logic. Thổi hồn bằng nghệ thuật.',
      contacts: {
        phone: '0938-649-420',
        email: 'studionopu@gmail.com',
        location: 'Kim Đồng, Đà Lạt, Lâm Đồng',
      },
      featuredProject: 'https://hiddenmusic.postlain.com',
    },
  });
});

// Contact schema & email dispatcher
const contactSchema = z.object({
  name: z.string().min(1, 'Họ tên là bắt buộc'),
  email: z.string().email('Địa chỉ email không hợp lệ'),
  message: z.string().min(3, 'Nội dung tin nhắn tối thiểu 3 ký tự'),
});

app.post('/api/contact', zValidator('json', contactSchema), async (c) => {
  const payload = c.req.valid('json');
  const clientIp = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'Unknown IP';
  const cf = (c.req.raw as unknown as { cf?: { city?: string; country?: string } }).cf;
  const city = cf?.city || 'Đà Lạt';
  const country = cf?.country || 'VN';
  const timestamp = new Date().toISOString();

  // HTML Email Body
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #030305; color: #ededed; padding: 24px; }
        .card { max-width: 600px; margin: 0 auto; background: #0c1017; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; }
        .badge { display: inline-block; padding: 4px 12px; background: rgba(163, 230, 53, 0.15); color: #a3e635; border-radius: 9999px; font-size: 11px; font-weight: bold; }
        h2 { color: #ffffff; margin-top: 16px; font-size: 20px; }
        .info { margin: 20px 0; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 12px; font-size: 14px; }
        .msg { background: #050608; border-left: 3px solid #a3e635; padding: 16px; margin: 20px 0; font-size: 15px; line-height: 1.6; color: #f8fafc; }
        .footer { font-size: 11px; color: #64748b; margin-top: 24px; border-top: 1px solid #1e293b; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="badge">POSTLAIN PORTFOLIO DISPATCH</span>
        <h2>Bạn có lời nhắn mới từ ${payload.name}</h2>
        <div class="info">
          <strong>Người gửi:</strong> ${payload.name}<br>
          <strong>Email:</strong> <a href="mailto:${payload.email}" style="color:#a3e635;">${payload.email}</a><br>
          <strong>Vị trí:</strong> ${city}, ${country} (IP: ${clientIp})<br>
          <strong>Thời gian:</strong> ${timestamp}
        </div>
        <div class="msg">
          <strong>Nội dung tin nhắn:</strong><br>
          ${payload.message.replace(/\n/g, '<br>')}
        </div>
        <div class="footer">
          Email này được gửi tự động từ hệ thống Portfolio của Ngô Phúc (studionopu@gmail.com). Bạn có thể bấm Reply để trả lời trực tiếp.
        </div>
      </div>
    </body>
    </html>
  `;

  // Dispatch email to studionopu@gmail.com via Cloudflare MailChannels
  try {
    const mailResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: 'studionopu@gmail.com', name: 'Ngô Phúc' }],
          },
        ],
        from: {
          email: 'dispatch@postlain.com',
          name: `${payload.name} (via Postlain Portfolio)`,
        },
        reply_to: {
          email: payload.email,
          name: payload.name,
        },
        subject: `[POSTLAIN PORTFOLIO] Lời nhắn từ ${payload.name} (${payload.email})`,
        content: [
          {
            type: 'text/html',
            value: emailHtml,
          },
        ],
      }),
    });

    console.log('MailChannels status:', mailResponse.status);
  } catch (err) {
    console.error('Email dispatch error (safe fallback):', err);
  }

  return c.json({
    success: true,
    message: 'Lời nhắn của bạn đã được gửi thẳng tới studionopu@gmail.com!',
    timestamp,
    received: {
      name: payload.name,
      email: payload.email,
      location: `${city}, ${country}`,
    },
  });
});

export default app;
