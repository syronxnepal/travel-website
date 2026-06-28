import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { ContactPageSection } from '../models/ContactPageSection';

export const getContactPageSection = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const sectionRepository = AppDataSource.getRepository(ContactPageSection);
    const sectionKey = req.params.sectionKey;
    
    let section = await sectionRepository.findOne({
      where: { sectionKey }
    });
    
    if (!section) {
      const defaultValues: { [key: string]: Partial<ContactPageSection> } = {
        'contact-info-section': {
          topTitle: 'Contact Us',
          heading: 'Get in Touch',
          email: 'info@travelexample.com',
          address: '123 Main Street, Kathmandu, Nepal',
          contactHours: 'Monday - Friday: 9:00 AM - 6:00 PM'
        },
        'contact-form-section': {
          topTitle: 'Send Us a Message',
          heading: 'We\'d Love to Hear From You'
        }
      };
      
      const defaults = defaultValues[sectionKey] || { heading: '' };
      
      section = sectionRepository.create({
        sectionKey,
        ...defaults
      } as ContactPageSection);
      section = await sectionRepository.save(section);
    }
    
    return res.json({ success: true, data: section });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateContactPageSection = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const sectionRepository = AppDataSource.getRepository(ContactPageSection);
    const sectionKey = req.params.sectionKey;
    const { topTitle, heading, paragraph, description, email, phone, address, contactHours } = req.body;

    let section = await sectionRepository.findOne({
      where: { sectionKey }
    });

    if (!section) {
      // When creating a new section, heading is required
      if (!heading) {
        return res.status(400).json({ 
          success: false, 
          message: 'Heading is required' 
        });
      }
      section = sectionRepository.create({
        sectionKey,
        topTitle: topTitle?.trim(),
        heading: heading.trim(),
        paragraph: paragraph?.trim(),
        description: description?.trim(),
        email: email?.trim(),
        phone: phone?.trim(),
        address: address?.trim(),
        contactHours: contactHours?.trim()
      });
    } else {
      // When updating existing section, only update heading if provided
      if (topTitle !== undefined) section.topTitle = topTitle?.trim();
      if (heading !== undefined) section.heading = heading.trim();
      if (paragraph !== undefined) section.paragraph = paragraph?.trim();
      if (description !== undefined) section.description = description?.trim();
      if (email !== undefined) section.email = email?.trim();
      if (phone !== undefined) section.phone = phone?.trim();
      if (address !== undefined) section.address = address?.trim();
      if (contactHours !== undefined) section.contactHours = contactHours?.trim();
    }
    
    const savedSection = await sectionRepository.save(section);
    return res.json({ success: true, data: savedSection });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

