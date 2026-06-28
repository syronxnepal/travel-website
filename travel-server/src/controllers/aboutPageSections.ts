import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { AboutPageSection } from '../models/AboutPageSection';

export const getAboutPageSection = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const sectionRepository = AppDataSource.getRepository(AboutPageSection);
    const sectionKey = req.params.sectionKey;
    
    let section = await sectionRepository.findOne({
      where: { sectionKey }
    });
    
    // If section doesn't exist, create it with default values
    if (!section) {
      const defaultValues: { [key: string]: Partial<AboutPageSection> } = {
        'about-intro-section': { 
          topTitle: 'GET TO KNOW US',
          heading: 'Welcome to Our Travel Company',
          paragraph: 'We are dedicated to providing exceptional travel experiences around the world.',
          description: 'We understand that every journey has unique needs. Therefore, we offer customized travel packages designed according to your preferences and budget.',
          features: ['Many variations of lorem', 'Many variations of lorem', 'Expert many variations teacher'],
          missionHeading: 'Our Mission',
          missionParagraph: 'Our mission is to inspire and enable travelers to explore the world in meaningful ways.'
        },
        'about-why-choose-us-section': {
          heading: 'Why Choose Us',
          paragraph: 'Discover what makes us the perfect travel companion for your adventures.'
        }
      };
      
      const defaults = defaultValues[sectionKey] || { heading: '' };
      
      section = sectionRepository.create({
        sectionKey,
        ...defaults
      } as AboutPageSection);
      section = await sectionRepository.save(section);
    }
    
    return res.json({ success: true, data: section });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAboutPageSection = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const sectionRepository = AppDataSource.getRepository(AboutPageSection);
    const sectionKey = req.params.sectionKey;
    const { topTitle, heading, paragraph, description, features, missionHeading, missionParagraph } = req.body;

    if (!heading) {
      return res.status(400).json({ 
        success: false, 
        message: 'Heading is required' 
      });
    }

    let section = await sectionRepository.findOne({
      where: { sectionKey }
    });

    if (!section) {
      section = sectionRepository.create({
        sectionKey,
        topTitle: topTitle?.trim(),
        heading: heading.trim(),
        paragraph: paragraph?.trim(),
        description: description?.trim(),
        features: Array.isArray(features) ? features : undefined,
        missionHeading: missionHeading?.trim(),
        missionParagraph: missionParagraph?.trim()
      });
    } else {
      if (topTitle !== undefined) section.topTitle = topTitle?.trim();
      section.heading = heading.trim();
      if (paragraph !== undefined) section.paragraph = paragraph?.trim();
      if (description !== undefined) section.description = description?.trim();
      if (features !== undefined) section.features = Array.isArray(features) ? features : section.features;
      if (missionHeading !== undefined) section.missionHeading = missionHeading?.trim();
      if (missionParagraph !== undefined) section.missionParagraph = missionParagraph?.trim();
    }
    
    const savedSection = await sectionRepository.save(section);
    return res.json({ success: true, data: savedSection });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

