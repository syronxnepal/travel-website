import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { HomePageSection } from '../models/HomePageSection';

export const getHomePageSection = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const sectionRepository = AppDataSource.getRepository(HomePageSection);
    const sectionKey = req.params.sectionKey;
    
    let section = await sectionRepository.findOne({
      where: { sectionKey }
    });
    
    // If section doesn't exist, create it with default values
    if (!section) {
      const defaultValues: { [key: string]: any } = {
        'top-trek-section': { topTitle: 'Trekking', heading: 'Explore Our Top Trekking Destinations' },
        'top-tours-section': { topTitle: 'Tours & Short Tours', heading: 'Explore Our Top Tours & Short Tours' },
        'testimonials-section': { topTitle: 'Testimonials', heading: 'What Our Customers Say' },
        'why-choose-us-section': { 
          topTitle: 'Why Choose Us', 
          heading: 'Experience the Difference',
          adventureTitle: 'Adventure With Us',
          adventureDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima repellat at maiores illum,',
          adventureImage: 'https://www.shutterstock.com/image-photo/big-group-happy-tourists-having-600nw-2416663047.jpg',
          adventureOptions: JSON.stringify(['Tours', 'Destinations'])
        },
        'blog-section': { topTitle: 'Latest News', heading: 'Stay Updated with Our Blog' }
      };
      
      const defaults = defaultValues[sectionKey] || { topTitle: '', heading: '' };
      
      section = sectionRepository.create({
        sectionKey,
        topTitle: defaults.topTitle,
        heading: defaults.heading,
        adventureTitle: defaults.adventureTitle,
        adventureDescription: defaults.adventureDescription,
        adventureImage: defaults.adventureImage,
        adventureOptions: defaults.adventureOptions
      });
      section = await sectionRepository.save(section);
    }
    
    return res.json({ success: true, data: section });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHomePageSection = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const sectionRepository = AppDataSource.getRepository(HomePageSection);
    const sectionKey = req.params.sectionKey;
    const { topTitle, heading, adventureTitle, adventureDescription, adventureImage, adventureOptions } = req.body;

    // Validate required fields (only for topTitle and heading)
    if (!topTitle || !heading) {
      return res.status(400).json({ 
        success: false, 
        message: 'Top title and heading are required' 
      });
    }

    let section = await sectionRepository.findOne({
      where: { sectionKey }
    });

    if (!section) {
      // Create new section if it doesn't exist
      section = sectionRepository.create({
        sectionKey,
        topTitle: topTitle.trim(),
        heading: heading.trim(),
        adventureTitle: adventureTitle?.trim(),
        adventureDescription: adventureDescription?.trim(),
        adventureImage: adventureImage?.trim(),
        adventureOptions: typeof adventureOptions === 'string' ? adventureOptions : JSON.stringify(adventureOptions)
      });
    } else {
      // Update existing section
      section.topTitle = topTitle.trim();
      section.heading = heading.trim();
      if (adventureTitle !== undefined) section.adventureTitle = adventureTitle?.trim();
      if (adventureDescription !== undefined) section.adventureDescription = adventureDescription?.trim();
      if (adventureImage !== undefined) section.adventureImage = adventureImage?.trim();
      if (adventureOptions !== undefined) {
        section.adventureOptions = typeof adventureOptions === 'string' ? adventureOptions : JSON.stringify(adventureOptions);
      }
    }
    
    const savedSection = await sectionRepository.save(section);
    return res.json({ success: true, data: savedSection });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

