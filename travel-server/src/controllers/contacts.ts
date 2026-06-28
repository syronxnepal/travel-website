import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Contact } from '../models/Contact';

export const getContacts = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const contactRepository = AppDataSource.getRepository(Contact);
    const { status } = req.query;
    
    const where: any = {};
    if (status) where.status = status;
    
    const contacts = await contactRepository.find({
      where,
      order: { createdAt: 'DESC' }
    });
    
    return res.json({ success: true, data: contacts });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getContact = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = await contactRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    
    return res.json({ success: true, data: contact });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createContact = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, email, phone, subject, message, tag } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = contactRepository.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      subject: subject?.trim(),
      message: message.trim(),
      tag: tag?.trim(),
      status: 'new'
    });
    
    const savedContact = await contactRepository.save(contact);
    return res.status(201).json({ success: true, data: savedContact });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateContact = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = await contactRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    const { name, email, phone, subject, message, tag, status } = req.body;

    if (name !== undefined) contact.name = name.trim();
    if (email !== undefined) contact.email = email.trim();
    if (phone !== undefined) contact.phone = phone?.trim() || null;
    if (subject !== undefined) contact.subject = subject?.trim() || null;
    if (message !== undefined) contact.message = message.trim();
    if (tag !== undefined) contact.tag = tag?.trim() || null;
    if (status !== undefined) {
      if (['new', 'read', 'replied'].includes(status)) {
        contact.status = status;
      }
    }
    
    const updatedContact = await contactRepository.save(contact);
    return res.json({ success: true, data: updatedContact });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteContact = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = await contactRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    
    await contactRepository.remove(contact);
    return res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

