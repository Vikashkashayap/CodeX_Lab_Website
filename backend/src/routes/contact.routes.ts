import { Router } from 'express';
import { 
  submitContactForm, 
  getLeads, 
  updateLeadStatus, 
  deleteLead 
} from '../controllers/contact.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// Public route
router.post('/submit', submitContactForm);

// Protected routes (admin only)
router.get('/leads', authenticate, getLeads);
router.put('/leads/:id/status', authenticate, updateLeadStatus);
router.delete('/leads/:id', authenticate, deleteLead);

export default router;

