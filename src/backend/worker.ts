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
    runtime: 'Cloudflare Edge Worker',
    region: c.req.raw.cf?.colo || 'GLOBAL',
  });
});

// Profile endpoint
app.get('/api/profile', (c) => {
  return c.json({
    success: true,
    data: {
      name: 'Ngô Phúc',
      alias: 'POSTLAIN',
      title: 'Multi-Disciplinary Operations Lead & Sound Producer',
      bio: 'Fusing logic-driven management with creative music production, engineered through automated AI workflows.',
      location: 'Đà Lạt, Lâm Đồng, Việt Nam',
      contacts: {
        email: 'postlain.music@gmail.com',
        phone: '0377 758 764',
      },
      domains: [
        'Luxury Retail & Store Management (ALDO)',
        'Recording Studio & MCN Operations (SB Studio)',
        'Culinary Shift Operations (Phủi Steak)',
        'AI Autonomous Agents & Workflow Automation',
        'Electronic & Atmospheric Music Production',
      ]
    },
  });
});

// Experience data endpoint
app.get('/api/experiences', (c) => {
  return c.json({
    success: true,
    data: [
      {
        episode: 'ACT IV',
        role: 'Quản Lý Cửa Hàng (Store General Manager)',
        company: 'ALDO GO! Đà Lạt',
        period: '06/2025 - 07/2026',
        highlights: [
          'Quản lý toàn diện vận hành cửa hàng ALDO tại TTTM GO! Đà Lạt.',
          'Kiểm soát kho hàng, định mức tồn kho và luân chuyển sản phẩm.',
          'Đào tạo nhân sự và dẫn dắt doanh số bán lẻ cao cấp.',
        ]
      },
      {
        episode: 'ACT III & II-B',
        role: 'Ca Trưởng Bếp & Bếp Chính',
        company: 'PHỦI STEAK Đà Lạt',
        period: '10/2024 - 06/2025',
        highlights: [
          'Điều phối ca vận hành bếp Âu và kiểm soát tiêu chuẩn chất lượng steak.',
          'Áp chảo bò chuyên sâu và làm chủ thực đơn phong cách fine-dining.',
        ]
      },
      {
        episode: 'ACT II-A',
        role: 'Quản Lý Phòng Thu & Điều Hành Sản Xuất',
        company: 'Công ty TNHH SB Studio',
        period: '03/2023 - 10/2024',
        highlights: [
          'Quản lý doanh thu, chiến lược kinh doanh và chăm sóc nghệ sĩ/MCN.',
          'Giám sát sản xuất âm nhạc, thu âm, mixing/mastering và quay MV.',
        ]
      },
      {
        episode: 'ACT I',
        role: 'Ca Trưởng Pha Chế',
        company: 'VIVA STAR COFFEE',
        period: '05/2019 - 01/2020',
        highlights: [
          'Pha chế tiêu chuẩn chuỗi, phân ca và quản lý chất lượng dịch vụ.',
        ]
      }
    ]
  });
});

// Postlain Music Tracks / Audio Showcase endpoint
app.get('/api/tracks', (c) => {
  return c.json({
    success: true,
    data: [
      {
        id: 'track-01',
        title: 'NEON DA LAT // 03:00 AM',
        artist: 'POSTLAIN',
        genre: 'Cyberpunk Atmospheric Pad & Synthwave',
        bpm: 124,
        key: 'A Minor',
        status: 'Released',
      },
      {
        id: 'track-02',
        title: 'MIST OVER ROBIN HILL',
        artist: 'POSTLAIN',
        genre: 'Deep Organic Chillhop & Melodic Plucks',
        bpm: 86,
        key: 'F# Minor',
        status: 'Studio Cut',
      },
      {
        id: 'track-03',
        title: 'AUTONOMOUS DRIFT',
        artist: 'POSTLAIN',
        genre: 'Liquid Neuro DnB & Futuristic Bass',
        bpm: 174,
        key: 'D Minor',
        status: 'Edge Master',
      }
    ]
  });
});

// Contact schema & POST endpoint
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(3, 'Message must be at least 3 characters'),
});

app.post('/api/contact', zValidator('json', contactSchema), async (c) => {
  const payload = c.req.valid('json');
  return c.json({
    success: true,
    message: 'Lời nhắn của bạn đã được chuyển thẳng tới Postlain Edge Dispatch!',
    timestamp: new Date().toISOString(),
    received: payload,
  });
});

export default app;
