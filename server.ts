import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import authRoutes from './server/routes/authRoutes.ts';
import productRoutes from './server/routes/productRoutes.ts';
import categoryRoutes from './server/routes/categoryRoutes.ts';
import cartRoutes from './server/routes/cartRoutes.ts';
import orderRoutes from './server/routes/orderRoutes.ts';
import reviewRoutes from './server/routes/reviewRoutes.ts';
import userRoutes from './server/routes/userRoutes.ts';
import adminRoutes from './server/routes/adminRoutes.ts';
import wishlistRoutes from './server/routes/wishlistRoutes.ts';
import { seedDatabase } from './server/seed.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

// Basic middleware
app.use(cors());
app.use(express.json());

// Auto-seed database if empty
seedDatabase(false).catch(err => {
  console.error('Failed to auto-seed database:', err);
});

// REST API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      time: new Date().toISOString(),
      platform: 'BYU E-Commerce Platform',
    },
    message: 'BYU API service is operational',
  });
});

// Seed endpoint for manual triggers
app.post('/api/seed', async (_req, res) => {
  try {
    await seedDatabase(true);
    res.json({
      success: true,
      message: 'Database reseeded successfully with full BYU catalog.',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Error reseeding database.',
    });
  }
});

// Setup frontend integration (Vite middleware in dev, static files in prod)
async function startServer() {
  if (!isProd) {
    // Dynamic import to avoid bundling Vite in production
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BYU E-Commerce Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
