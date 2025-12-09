import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import contactRoutes from './routes/contact.routes.js';
import servicesRoutes from './routes/services.routes.js';
import pricingRoutes from './routes/pricing.routes.js';
import adminRoutes from './routes/admin.routes.js';
import contentRoutes from './routes/content.routes.js';
import Admin from './models/Admin.model.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/contact', contactRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  
  // Connect to MongoDB
  await connectDB();
  
  // Create default admin if not exists
  try {
    const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@gmail.com';
    const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    
    if (defaultAdminPassword) {
      const adminExists = await Admin.findOne({ email: defaultAdminEmail });
      if (!adminExists) {
        const defaultAdmin = new Admin({
          email: defaultAdminEmail,
          password: defaultAdminPassword
        });
        await defaultAdmin.save();
        console.log(`✅ Default admin created: ${defaultAdminEmail}`);
      }
    }
  } catch (error: any) {
    console.error('Error creating default admin:', error.message);
  }
});

export default app;

