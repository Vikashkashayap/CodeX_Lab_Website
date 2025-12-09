import { Request, Response } from 'express';
import Lead from '../models/Lead.model.js';

interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  message: string;
}

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, projectType, budgetRange, message }: ContactFormData = req.body;

    // Validation
    if (!name || !email || !projectType || !budgetRange || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Save to database
    const lead = new Lead({
      name,
      email,
      projectType,
      budgetRange,
      message,
      status: 'new'
    });

    await lead.save();

    res.status(200).json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you within 24 hours.',
      data: {
        name,
        email,
        projectType,
        budgetRange
      }
    });
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: leads
    });
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads'
    });
  }
};

export const updateLeadStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (error: any) {
    console.error('Error updating lead status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update lead status'
    });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting lead:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete lead'
    });
  }
};

