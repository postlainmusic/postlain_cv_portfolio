import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { projects, profiles } from '../db/schema';

export const app = new Hono();

// Global Middlewares
app.use('*', cors());

// Health check
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'postlain-cv-portfolio-edge-api',
  });
});

// Profile API
app.get('/api/profile', (c) => {
  return c.json({
    success: true,
    data: {
      name: 'Ngô Phúc',
      alias: 'POSTLAIN',
      title: 'Fullstack Engineer & Music Producer',
      bio: 'Chuyên sâu kiến trúc Edge Computing, Modern Frontend & Typesafe Data Pipelines.',
    },
  });
});

// Contact schema & handler
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

app.post('/api/contact', zValidator('json', contactSchema), async (c) => {
  const payload = c.req.valid('json');
  return c.json({
    success: true,
    message: 'Cảm ơn bạn đã để lại lời nhắn!',
    received: payload,
  });
});

export default app;
