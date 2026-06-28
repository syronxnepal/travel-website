import 'reflect-metadata';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get API base URL from environment or use default
const API_BASE_URL = process.env.API_BASE_URL || 'http://72.61.151.220:3001/api';

const dummyTours = [
  {
    title: 'Cultural Heritage Tour of Nepal',
    location: 'Kathmandu, Pokhara, Chitwan',
    category: 'Cultural',
    duration: '10 days',
    price: '$1,200',
    originalPrice: '$1,500',
    rating: '4.8',
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop'
    ],
    description: 'Discover the rich cultural heritage of Nepal through ancient temples, traditional architecture, and vibrant local communities. This comprehensive tour takes you through UNESCO World Heritage sites, royal palaces, and authentic cultural experiences.',
    difficulty: 'Easy',
    groupSize: 'Small groups (max 12 people)',
    highlights: [
      'Visit 7 UNESCO World Heritage Sites',
      'Explore ancient temples and palaces',
      'Experience traditional Newari culture',
      'Wildlife safari in Chitwan National Park',
      'Boat ride on Phewa Lake in Pokhara'
    ],
    included: [
      'Professional English-speaking guide',
      'All entrance fees and permits',
      'Airport transfers',
      '4-star hotel accommodation',
      'Daily breakfast and selected meals',
      'Private transportation',
      'Cultural show tickets'
    ],
    excluded: [
      'International flights',
      'Nepal visa fees',
      'Travel insurance',
      'Personal expenses',
      'Tips for guides and drivers',
      'Alcoholic beverages'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kathmandu',
        description: 'Arrive at Tribhuvan International Airport. Transfer to hotel and welcome dinner with cultural show.',
        activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner', 'Cultural show'],
        meals: ['Dinner'],
        accommodation: '4-star hotel in Kathmandu'
      },
      {
        day: 2,
        title: 'Kathmandu Valley Sightseeing',
        description: 'Full day tour of Kathmandu Valley including Swayambhunath Stupa, Pashupatinath Temple, Boudhanath Stupa, and Patan Durbar Square.',
        activities: ['Temple visits', 'Cultural exploration', 'Photography'],
        meals: ['Breakfast', 'Lunch'],
        accommodation: '4-star hotel in Kathmandu'
      },
      {
        day: 3,
        title: 'Drive to Pokhara',
        description: 'Scenic drive to Pokhara (200km, 6-7 hours). Evening boat ride on Phewa Lake with views of Annapurna range.',
        activities: ['Scenic drive', 'Boat ride', 'Sunset viewing'],
        meals: ['Breakfast', 'Dinner'],
        accommodation: '4-star hotel in Pokhara'
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
        value: '10 days / 8 days touring'
      },
      {
        icon: 'fa-map-marker-alt',
        title: 'Destinations',
        value: 'Kathmandu, Pokhara, Chitwan'
      },
      {
        icon: 'fa-star',
        title: 'Difficulty',
        value: 'Easy - suitable for all ages'
      }
    ],
    faqs: [
      {
        question: 'What is included in the tour price?',
        answer: 'The tour includes accommodation, most meals, transportation, entrance fees, and guide services. International flights and personal expenses are not included.'
      },
      {
        question: 'What is the best time to visit?',
        answer: 'The best time is during spring (March-May) and autumn (September-November) when the weather is pleasant and skies are clear.'
      }
    ],
    featured: true
  },
  {
    title: 'Adventure Safari in Chitwan',
    location: 'Chitwan National Park, Nepal',
    category: 'Adventure',
    duration: '5 days',
    price: '$450',
    originalPrice: '$600',
    rating: '4.7',
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop'
    ],
    description: 'Experience the thrill of wildlife safari in Chitwan National Park, home to one-horned rhinoceros, Bengal tigers, and diverse bird species. Enjoy jungle walks, elephant rides, and canoe trips.',
    difficulty: 'Medium',
    groupSize: 'Small groups (max 10 people)',
    highlights: [
      'Jungle safari on elephant back',
      'Canoe ride on Rapti River',
      'Bird watching (over 500 species)',
      'Tharu cultural dance performance',
      'Wildlife spotting opportunities'
    ],
    included: [
      'Jungle lodge accommodation',
      'All safari activities',
      'Meals (breakfast, lunch, dinner)',
      'Professional naturalist guide',
      'Park entrance fees',
      'Transportation from Pokhara/Kathmandu'
    ],
    excluded: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Tips',
      'Alcoholic beverages'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Chitwan',
        description: 'Arrive at Chitwan and transfer to jungle lodge. Afternoon village walk and Tharu cultural program.',
        activities: ['Village walk', 'Cultural program'],
        meals: ['Lunch', 'Dinner'],
        accommodation: 'Jungle lodge'
      },
      {
        day: 2,
        title: 'Full Day Safari Activities',
        description: 'Early morning elephant safari, canoe ride, and afternoon jungle walk.',
        activities: ['Elephant safari', 'Canoe ride', 'Jungle walk'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Jungle lodge'
      }
    ],
    tourInfo: [
      {
        icon: 'fa-paw',
        title: 'Wildlife',
        value: 'Rhino, Tiger, Elephant, Crocodile'
      },
      {
        icon: 'fa-binoculars',
        title: 'Activities',
        value: 'Safari, Canoe, Jungle Walk'
      }
    ],
    faqs: [
      {
        question: 'What wildlife can we see?',
        answer: 'Chitwan is home to one-horned rhinoceros, Bengal tigers, sloth bears, leopards, and over 500 species of birds.'
      }
    ],
    featured: true
  },
  {
    title: 'Mountain Flight & Pokhara Adventure',
    location: 'Kathmandu, Pokhara',
    category: 'Nature',
    duration: '7 days',
    price: '$850',
    rating: '4.6',
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    description: 'Combine the thrill of a mountain flight over Everest with the natural beauty of Pokhara. Perfect for those with limited time who want to experience the best of Nepal.',
    difficulty: 'Easy',
    groupSize: 'Small groups (max 15 people)',
    highlights: [
      'Mountain flight over Mount Everest',
      'Paragliding in Pokhara',
      'Visit to Sarangkot for sunrise',
      'Boat ride on Phewa Lake',
      'Explore Pokhara\'s natural beauty'
    ],
    included: [
      'Mountain flight ticket',
      'Hotel accommodation',
      'Breakfast daily',
      'Paragliding experience',
      'Transportation',
      'Guide services'
    ],
    excluded: [
      'International flights',
      'Lunch and dinner',
      'Personal expenses',
      'Travel insurance'
    ],
    featured: false
  },
  {
    title: 'Spiritual Journey to Lumbini',
    location: 'Lumbini, Nepal',
    category: 'Historical',
    duration: '4 days',
    price: '$380',
    rating: '4.5',
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
    description: 'Visit the birthplace of Lord Buddha in Lumbini, a UNESCO World Heritage Site. Explore ancient monasteries, meditation centers, and the sacred garden.',
    difficulty: 'Easy',
    highlights: [
      'Visit Maya Devi Temple',
      'Explore international monasteries',
      'Meditation sessions',
      'Peace pagoda visit',
      'Cultural immersion'
    ],
    included: [
      'Hotel accommodation',
      'All meals',
      'Entrance fees',
      'Guide services',
      'Transportation'
    ],
    featured: false
  },
  {
    title: 'Annapurna Base Camp Trek',
    location: 'Annapurna Region, Nepal',
    category: 'Adventure',
    duration: '12 days',
    price: '$1,100',
    originalPrice: '$1,300',
    rating: '4.9',
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
    description: 'Trek to Annapurna Base Camp through diverse landscapes, from terraced fields to alpine meadows, with stunning views of Annapurna and Machhapuchhre peaks.',
    difficulty: 'Moderate',
    groupSize: 'Small groups (max 12 people)',
    highlights: [
      'Trek to Annapurna Base Camp (4,130m)',
      'Hot springs in Jhinu Danda',
      'Spectacular mountain views',
      'Gurung and Magar culture',
      'Diverse flora and fauna'
    ],
    included: [
      'Professional trekking guide',
      'Porter service',
      'All meals during trek',
      'Teahouse accommodation',
      'Permits and fees',
      'Airport transfers'
    ],
    excluded: [
      'International flights',
      'Travel insurance',
      'Personal equipment',
      'Tips'
    ],
    featured: true
  }
];

const dummyShortTours = [
  {
    title: 'Kathmandu City Highlights',
    location: 'Kathmandu, Nepal',
    category: 'Cultural',
    duration: '4 hours',
    price: '$45',
    rating: '4.7',
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&h=800&fit=crop'
    ],
    description: 'Explore the best of Kathmandu in a comprehensive half-day tour. Visit ancient temples, royal palaces, and bustling markets while learning about the rich history and culture of the city.',
    highlights: [
      'Swayambhunath Stupa (Monkey Temple)',
      'Kathmandu Durbar Square',
      'Thamel market exploration',
      'Local cuisine tasting',
      'Traditional architecture'
    ],
    featured: true
  },
  {
    title: 'Pokhara Day Trip',
    location: 'Pokhara, Nepal',
    category: 'Nature',
    duration: '6 hours',
    price: '$55',
    rating: '4.6',
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop',
    description: 'Discover the natural beauty of Pokhara with a full-day tour including Phewa Lake, World Peace Pagoda, and stunning mountain views. Perfect for nature lovers and photographers.',
    highlights: [
      'Boat ride on Phewa Lake',
      'World Peace Pagoda visit',
      'Sarangkot viewpoint',
      'Devi\'s Fall and Gupteshwor Cave',
      'Mountain panorama'
    ],
    featured: true
  },
  {
    title: 'Bhaktapur Heritage Walk',
    location: 'Bhaktapur, Nepal',
    category: 'Historical',
    duration: '3 hours',
    price: '$35',
    rating: '4.8',
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1535034987458-41a30d3eb93e?w=1200&h=800&fit=crop',
    description: 'Step back in time as you explore the medieval city of Bhaktapur, known for its well-preserved architecture, pottery squares, and traditional Newari culture.',
    highlights: [
      'Bhaktapur Durbar Square',
      'Pottery Square',
      'Nyatapola Temple',
      'Traditional handicrafts',
      'Local cuisine experience'
    ],
    featured: false
  },
  {
    title: 'Nagarkot Sunrise Tour',
    location: 'Nagarkot, Nepal',
    category: 'Nature',
    duration: '5 hours',
    price: '$40',
    rating: '4.5',
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    description: 'Early morning tour to Nagarkot for spectacular sunrise views over the Himalayas. Witness the golden rays illuminating the snow-capped peaks including Mount Everest on clear days.',
    highlights: [
      'Sunrise over Himalayas',
      'Mountain panorama',
      'Everest viewing (weather permitting)',
      'Breakfast with a view',
      'Photography opportunities'
    ],
    featured: false
  },
  {
    title: 'Local Food & Culture Tour',
    location: 'Kathmandu, Nepal',
    category: 'Cultural',
    duration: '4 hours',
    price: '$50',
    rating: '4.7',
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop',
    description: 'Immerse yourself in Nepali culture through its food. Visit local markets, street food stalls, and traditional restaurants while learning about culinary traditions and customs.',
    highlights: [
      'Local market visit',
      'Street food tasting',
      'Traditional restaurant experience',
      'Cooking demonstration',
      'Cultural insights'
    ],
    featured: true
  }
];

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  token?: string;
  user?: any;
}

async function login(email: string, password: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error: any = await response.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(error.message || 'Login failed');
  }

  const data = await response.json() as ApiResponse;
  if (data.success && data.token) {
    return data.token;
  }
  throw new Error('Failed to get authentication token');
}

async function createTour(tourData: any, token: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/tours`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(tourData),
  });

  if (!response.ok) {
    const error: any = await response.json().catch(() => ({ message: 'Failed to create tour' }));
    throw new Error(error.message || 'Failed to create tour');
  }

  const data = await response.json() as ApiResponse;
  if (!data.success) {
    throw new Error(data.message || 'Failed to create tour');
  }
}

async function createShortTour(shortTourData: any, token: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/short-tours`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(shortTourData),
  });

  if (!response.ok) {
    const error: any = await response.json().catch(() => ({ message: 'Failed to create short tour' }));
    throw new Error(error.message || 'Failed to create short tour');
  }

  const data = await response.json() as ApiResponse;
  if (!data.success) {
    throw new Error(data.message || 'Failed to create short tour');
  }
}

async function main() {
  try {
    console.log('🌱 Starting tour and short tour seeding via API...\n');

    // Get credentials from environment or use defaults
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    console.log(`📡 Connecting to API: ${API_BASE_URL}`);
    console.log(`🔐 Logging in as: ${email}\n`);

    // Login to get token
    const token = await login(email, password);
    console.log('✅ Authentication successful!\n');

    // Create tours
    console.log('📦 Creating tours...');
    for (let i = 0; i < dummyTours.length; i++) {
      const tour = dummyTours[i];
      try {
        await createTour(tour, token);
        console.log(`  ✅ Tour ${i + 1}/${dummyTours.length}: ${tour.title}`);
      } catch (error: any) {
        console.error(`  ❌ Failed to create tour "${tour.title}": ${error.message}`);
      }
    }

    console.log('\n📦 Creating short tours...');
    for (let i = 0; i < dummyShortTours.length; i++) {
      const shortTour = dummyShortTours[i];
      try {
        await createShortTour(shortTour, token);
        console.log(`  ✅ Short Tour ${i + 1}/${dummyShortTours.length}: ${shortTour.title}`);
      } catch (error: any) {
        console.error(`  ❌ Failed to create short tour "${shortTour.title}": ${error.message}`);
      }
    }

    console.log('\n✨ Seeding completed!');
    console.log(`📊 Created ${dummyTours.length} tours and ${dummyShortTours.length} short tours.`);
  } catch (error: any) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();

