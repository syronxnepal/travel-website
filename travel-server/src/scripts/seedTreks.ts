import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from '../config/database';
import { Trek } from '../models/Trek';

// Load environment variables
dotenv.config();

const dummyTreks = [
  {
    title: 'Everest Base Camp Trek',
    location: 'Nepal, Himalayas',
    difficulty: 'Challenging' as const,
    duration: '14 days',
    price: '$1,500',
    originalPrice: '$1,800',
    rating: '4.8',
    reviewCount: 245,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop',
    description: 'Experience the ultimate adventure trekking to the base of the world\'s highest mountain. This iconic trek takes you through stunning Sherpa villages, ancient monasteries, and breathtaking Himalayan landscapes.',
    highlights: [
      'Trek to Everest Base Camp at 5,364m',
      'Visit Tengboche Monastery',
      'Witness sunrise over Mount Everest',
      'Experience Sherpa culture and hospitality',
      'Cross suspension bridges over glacial rivers'
    ],
    included: [
      'Professional trekking guide',
      'Porter service (1 porter per 2 trekkers)',
      'All meals during trek',
      'Teahouse accommodation',
      'TIMS and Sagarmatha National Park permits',
      'Airport transfers',
      'First aid kit and oxygen cylinder'
    ],
    excluded: [
      'International flights',
      'Nepal visa fees',
      'Travel insurance',
      'Personal trekking equipment',
      'Tips for guides and porters',
      'Alcoholic beverages'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kathmandu',
        description: 'Arrive at Tribhuvan International Airport and transfer to hotel. Briefing about the trek.',
        activities: ['Airport pickup', 'Hotel check-in', 'Trek briefing'],
        meals: ['Dinner'],
        accommodation: 'Hotel in Kathmandu'
      },
      {
        day: 2,
        title: 'Fly to Lukla, Trek to Phakding',
        description: 'Early morning flight to Lukla (2,860m). Begin trek to Phakding (2,610m) - 3 hours walk.',
        activities: ['Flight to Lukla', 'Trek to Phakding', 'Acclimatization walk'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Teahouse in Phakding'
      },
      {
        day: 3,
        title: 'Trek to Namche Bazaar',
        description: 'Trek to Namche Bazaar (3,440m) - 6-7 hours. Cross suspension bridges and enter Sagarmatha National Park.',
        activities: ['Trek to Namche', 'National Park entry', 'First view of Everest'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Teahouse in Namche Bazaar'
      }
    ],
    tourInfo: [
      {
        icon: 'fa-users',
        title: 'Group Size',
        value: 'Small groups (max 12 people)'
      },
      {
        icon: 'fa-clock',
        title: 'Duration',
        value: '14 days / 12 days trekking'
      },
      {
        icon: 'fa-mountain',
        title: 'Max Altitude',
        value: '5,364m (Everest Base Camp)'
      },
      {
        icon: 'fa-walking',
        title: 'Difficulty',
        value: 'Challenging - requires good fitness'
      }
    ],
    faqs: [
      {
        question: 'Do I need previous trekking experience?',
        answer: 'While previous trekking experience is helpful, it\'s not mandatory. However, you should have good physical fitness and be able to walk 5-7 hours daily on mountain terrain.'
      },
      {
        question: 'What is the best time to trek?',
        answer: 'The best times are March-May (spring) and September-November (autumn) when weather is clear and stable.'
      },
      {
        question: 'What about altitude sickness?',
        answer: 'We follow a gradual ascent schedule with acclimatization days. Our guides are trained to recognize symptoms and we carry oxygen cylinders for emergencies.'
      }
    ],
    featured: true
  },
  {
    title: 'Annapurna Circuit Trek',
    location: 'Nepal, Annapurna Region',
    difficulty: 'Moderate' as const,
    duration: '18 days',
    price: '$1,200',
    originalPrice: '$1,450',
    rating: '4.7',
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    description: 'One of the world\'s greatest treks, the Annapurna Circuit offers diverse landscapes from subtropical forests to high-altitude deserts, with stunning views of the Annapurna and Dhaulagiri ranges.',
    highlights: [
      'Cross Thorong La Pass (5,416m)',
      'Visit Muktinath Temple',
      'Experience diverse landscapes',
      'Hot springs in Tatopani',
      'Traditional Gurung and Thakali villages'
    ],
    included: [
      'Experienced trekking guide',
      'Porter service',
      'All meals',
      'Teahouse accommodation',
      'ACAP and TIMS permits',
      'Transportation'
    ],
    excluded: [
      'International flights',
      'Nepal visa',
      'Travel insurance',
      'Personal equipment',
      'Tips'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Drive to Besisahar, Trek to Bhulbhule',
        description: 'Drive from Kathmandu to Besisahar (6 hours), then trek to Bhulbhule (840m) - 1 hour.',
        activities: ['Drive to Besisahar', 'Trek to Bhulbhule'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Teahouse in Bhulbhule'
      }
    ],
    tourInfo: [
      {
        icon: 'fa-users',
        title: 'Group Size',
        value: 'Max 15 people'
      },
      {
        icon: 'fa-clock',
        title: 'Duration',
        value: '18 days'
      },
      {
        icon: 'fa-mountain',
        title: 'Max Altitude',
        value: '5,416m (Thorong La Pass)'
      }
    ],
    faqs: [
      {
        question: 'How difficult is this trek?',
        answer: 'Moderate difficulty. The main challenge is crossing Thorong La Pass, but we take it slow with proper acclimatization.'
      }
    ],
    featured: true
  },
  {
    title: 'Langtang Valley Trek',
    location: 'Nepal, Langtang Region',
    difficulty: 'Moderate' as const,
    duration: '10 days',
    price: '$950',
    rating: '4.6',
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop',
    description: 'A beautiful trek through the Langtang Valley, offering stunning mountain views, rich Tamang culture, and the opportunity to visit the sacred Gosainkunda Lake.',
    highlights: [
      'Langtang Valley views',
      'Tamang culture experience',
      'Gosainkunda Lake',
      'Langtang National Park',
      'Traditional villages'
    ],
    included: [
      'Trekking guide',
      'Porter',
      'Meals',
      'Accommodation',
      'Permits'
    ],
    excluded: [
      'Flights',
      'Visa',
      'Insurance',
      'Equipment'
    ],
    tourInfo: [
      {
        icon: 'fa-users',
        title: 'Group Size',
        value: 'Max 12 people'
      },
      {
        icon: 'fa-clock',
        title: 'Duration',
        value: '10 days'
      }
    ],
    faqs: [
      {
        question: 'Is this trek suitable for beginners?',
        answer: 'Yes, this is a moderate trek suitable for beginners with good fitness levels.'
      }
    ],
    featured: false
  },
  {
    title: 'Manaslu Circuit Trek',
    location: 'Nepal, Manaslu Region',
    difficulty: 'Expert' as const,
    duration: '21 days',
    price: '$1,800',
    originalPrice: '$2,100',
    rating: '4.9',
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop',
    description: 'A challenging and remote trek around the eighth highest mountain in the world. This restricted area trek offers pristine wilderness and authentic cultural experiences.',
    highlights: [
      'Larkya La Pass (5,160m)',
      'Remote and pristine wilderness',
      'Tibetan Buddhist culture',
      'Manaslu Conservation Area',
      'Less crowded than other treks'
    ],
    included: [
      'Special permit for restricted area',
      'Experienced guide',
      'Porter',
      'All meals',
      'Camping equipment',
      'Transportation'
    ],
    excluded: [
      'International flights',
      'Nepal visa',
      'Travel insurance',
      'Personal gear'
    ],
    tourInfo: [
      {
        icon: 'fa-users',
        title: 'Group Size',
        value: 'Small groups (max 8 people)'
      },
      {
        icon: 'fa-clock',
        title: 'Duration',
        value: '21 days'
      },
      {
        icon: 'fa-mountain',
        title: 'Max Altitude',
        value: '5,160m (Larkya La Pass)'
      }
    ],
    faqs: [
      {
        question: 'Why is this trek more expensive?',
        answer: 'This is a restricted area trek requiring special permits and camping equipment, making it more expensive than teahouse treks.'
      }
    ],
    featured: true
  },
  {
    title: 'Poon Hill Sunrise Trek',
    location: 'Nepal, Annapurna Region',
    difficulty: 'Easy' as const,
    duration: '5 days',
    price: '$650',
    rating: '4.5',
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
    description: 'A short and scenic trek perfect for beginners. Enjoy stunning sunrise views over the Annapurna and Dhaulagiri ranges from Poon Hill (3,210m).',
    highlights: [
      'Poon Hill sunrise (3,210m)',
      'Panoramic mountain views',
      'Short duration - perfect for beginners',
      'Gurung villages',
      'Rhododendron forests'
    ],
    included: [
      'Guide',
      'Porter',
      'Meals',
      'Accommodation',
      'Permits',
      'Transportation'
    ],
    excluded: [
      'Flights',
      'Visa',
      'Insurance',
      'Personal items'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Drive to Pokhara, Trek to Tikhedhunga',
        description: 'Drive from Kathmandu to Pokhara (6 hours), then trek to Tikhedhunga (1,540m) - 3 hours.',
        activities: ['Drive to Pokhara', 'Trek to Tikhedhunga'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Teahouse in Tikhedhunga'
      },
      {
        day: 2,
        title: 'Trek to Ghorepani',
        description: 'Trek to Ghorepani (2,860m) - 5-6 hours. Climb stone steps through rhododendron forests.',
        activities: ['Trek to Ghorepani', 'Village exploration'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Teahouse in Ghorepani'
      },
      {
        day: 3,
        title: 'Poon Hill Sunrise, Trek to Tadapani',
        description: 'Early morning hike to Poon Hill for sunrise (1 hour), then trek to Tadapani (2,630m) - 5 hours.',
        activities: ['Poon Hill sunrise', 'Trek to Tadapani'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Teahouse in Tadapani'
      }
    ],
    tourInfo: [
      {
        icon: 'fa-users',
        title: 'Group Size',
        value: 'Max 15 people'
      },
      {
        icon: 'fa-clock',
        title: 'Duration',
        value: '5 days'
      },
      {
        icon: 'fa-mountain',
        title: 'Max Altitude',
        value: '3,210m (Poon Hill)'
      },
      {
        icon: 'fa-walking',
        title: 'Difficulty',
        value: 'Easy - suitable for all fitness levels'
      }
    ],
    faqs: [
      {
        question: 'Is this trek suitable for children?',
        answer: 'Yes, this is one of the easiest treks in Nepal and suitable for children above 8 years old with basic fitness.'
      },
      {
        question: 'What should I bring?',
        answer: 'Basic trekking gear including good walking shoes, warm clothing, water bottle, and camera. A detailed packing list will be provided.'
      }
    ],
    featured: false
  }
];

async function seedTreks() {
  try {
    console.log('🌱 Seeding trek data...\n');
    
    // Check if database credentials are provided
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
      console.error('❌ Missing database credentials!');
      console.error('\nPlease provide database credentials via environment variables:');
      console.error('  DB_HOST=your-db-host');
      console.error('  DB_PORT=5432 (optional, defaults to 5432)');
      console.error('  DB_USER=your-db-user');
      console.error('  DB_PASSWORD=your-db-password');
      console.error('  DB_NAME=your-db-name');
      console.error('\nExample:');
      console.error('  DB_HOST=72.61.151.220 DB_USER=postgres DB_PASSWORD=pass DB_NAME=travel_cms npm run db:seed');
      console.error('\nAlternatively, use the API-based seed script:');
      console.error('  npm run db:seed:api');
      process.exit(1);
    }
    
    console.log(`📊 Connecting to database: ${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`);
    
    // Initialize the data source
    await AppDataSource.initialize();
    console.log('✅ Database connection established');

    const trekRepository = AppDataSource.getRepository(Trek);

    // Check if treks already exist
    const existingTreks = await trekRepository.count();
    if (existingTreks > 0) {
      console.log(`⚠️  Found ${existingTreks} existing treks in database.`);
      console.log('   Skipping seed to avoid duplicates.\n');
      console.log('   To re-seed, delete existing treks first or modify this script.');
      await AppDataSource.destroy();
      process.exit(0);
    }

    // Create and save dummy treks
    console.log('📝 Creating dummy treks...\n');
    for (const trekData of dummyTreks) {
      const trek = trekRepository.create(trekData);
      const savedTrek = await trekRepository.save(trek);
      console.log(`   ✓ Created: ${savedTrek.title}`);
    }

    console.log(`\n✅ Successfully seeded ${dummyTreks.length} treks!`);
    
    // Verify
    const count = await trekRepository.count();
    console.log(`📊 Total treks in database: ${count}\n`);

    await AppDataSource.destroy();
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Seeding failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run the seeding
seedTreks();

