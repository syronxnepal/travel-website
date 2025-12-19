export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  highlights: string[];
  bestTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  price: number;
}

export interface Activity {
  id: string;
  name: string;
  type: 'trek' | 'tour' | 'adventure' | 'cultural';
  destination: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  price: number;
  image: string;
  description: string;
  highlights: string[];
  groupSize: {
    min: number;
    max: number;
  };
}

export interface PackageOption {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'accommodation' | 'transport' | 'guide' | 'equipment' | 'meal';
  required: boolean;
}

export interface CustomPackage {
  id: string;
  destinations: Destination[];
  activities: Activity[];
  options: PackageOption[];
  groupSize: number;
  duration: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'draft' | 'quoted' | 'booked';
  createdAt: string;
}

export const destinations: Destination[] = [
  {
    id: 'kathmandu',
    name: 'Kathmandu',
    country: 'Nepal',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'The capital city of Nepal, rich in culture and history',
    highlights: ['Durbar Square', 'Swayambhunath', 'Pashupatinath', 'Boudhanath'],
    bestTime: 'October - May',
    difficulty: 'Easy',
    duration: '2-3 days',
    price: 50
  },
  {
    id: 'pokhara',
    name: 'Pokhara',
    country: 'Nepal',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Gateway to the Annapurna region with stunning lake views',
    highlights: ['Phewa Lake', 'Annapurna Range', 'Peace Pagoda', 'Davis Falls'],
    bestTime: 'October - May',
    difficulty: 'Easy',
    duration: '2-4 days',
    price: 75
  },
  {
    id: 'chitwan',
    name: 'Chitwan',
    country: 'Nepal',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Famous for wildlife and jungle safaris',
    highlights: ['Chitwan National Park', 'Wildlife Safari', 'Tharu Culture', 'Bird Watching'],
    bestTime: 'October - March',
    difficulty: 'Easy',
    duration: '2-3 days',
    price: 100
  },
  {
    id: 'lumbini',
    name: 'Lumbini',
    country: 'Nepal',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Birthplace of Lord Buddha, a UNESCO World Heritage Site',
    highlights: ['Maya Devi Temple', 'Sacred Garden', 'Monasteries', 'Peace Pagoda'],
    bestTime: 'October - March',
    difficulty: 'Easy',
    duration: '1-2 days',
    price: 60
  },
  {
    id: 'bhaktapur',
    name: 'Bhaktapur',
    country: 'Nepal',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Ancient city known for its traditional architecture',
    highlights: ['Durbar Square', 'Pottery Square', 'Nyatapola Temple', 'Traditional Crafts'],
    bestTime: 'October - May',
    difficulty: 'Easy',
    duration: '1 day',
    price: 40
  }
];

export const activities: Activity[] = [
  // Treks
  {
    id: 'everest-base-camp',
    name: 'Everest Base Camp Trek',
    type: 'trek',
    destination: 'kathmandu',
    duration: '14 days',
    difficulty: 'Hard',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'The ultimate trekking experience to the base of Mount Everest',
    highlights: ['Everest Base Camp', 'Kala Patthar', 'Namche Bazaar', 'Tengboche Monastery'],
    groupSize: { min: 2, max: 12 }
  },
  {
    id: 'annapurna-circuit',
    name: 'Annapurna Circuit Trek',
    type: 'trek',
    destination: 'pokhara',
    duration: '12 days',
    difficulty: 'Hard',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Diverse trek around the Annapurna massif',
    highlights: ['Thorong La Pass', 'Manang', 'Muktinath', 'Jomsom'],
    groupSize: { min: 2, max: 15 }
  },
  {
    id: 'langtang-valley',
    name: 'Langtang Valley Trek',
    type: 'trek',
    destination: 'kathmandu',
    duration: '8 days',
    difficulty: 'Medium',
    price: 600,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Beautiful valley trek with mountain views',
    highlights: ['Langtang Valley', 'Kyanjin Gompa', 'Langtang Lirung', 'Tamang Culture'],
    groupSize: { min: 2, max: 10 }
  },
  // Tours
  {
    id: 'kathmandu-heritage',
    name: 'Kathmandu Heritage Tour',
    type: 'cultural',
    destination: 'kathmandu',
    duration: '1 day',
    difficulty: 'Easy',
    price: 80,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Explore the cultural heritage of Kathmandu Valley',
    highlights: ['Swayambhunath', 'Pashupatinath', 'Boudhanath', 'Durbar Square'],
    groupSize: { min: 1, max: 20 }
  },
  {
    id: 'pokhara-adventure',
    name: 'Pokhara Adventure Tour',
    type: 'adventure',
    destination: 'pokhara',
    duration: '2 days',
    difficulty: 'Medium',
    price: 150,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Adventure activities in Pokhara',
    highlights: ['Paragliding', 'Boating', 'Hiking', 'Zip-lining'],
    groupSize: { min: 2, max: 8 }
  },
  {
    id: 'chitwan-safari',
    name: 'Chitwan Wildlife Safari',
    type: 'adventure',
    destination: 'chitwan',
    duration: '2 days',
    difficulty: 'Easy',
    price: 200,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Wildlife safari in Chitwan National Park',
    highlights: ['Jungle Safari', 'Bird Watching', 'Elephant Ride', 'Tharu Culture'],
    groupSize: { min: 2, max: 12 }
  },
  {
    id: 'lumbini-pilgrimage',
    name: 'Lumbini Pilgrimage Tour',
    type: 'cultural',
    destination: 'lumbini',
    duration: '1 day',
    difficulty: 'Easy',
    price: 60,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Spiritual journey to the birthplace of Buddha',
    highlights: ['Maya Devi Temple', 'Sacred Garden', 'International Monasteries', 'Peace Pagoda'],
    groupSize: { min: 1, max: 25 }
  }
];

export const packageOptions: PackageOption[] = [
  {
    id: 'accommodation-3star',
    name: '3-Star Accommodation',
    description: 'Comfortable 3-star hotels and lodges',
    price: 50,
    type: 'accommodation',
    required: true
  },
  {
    id: 'accommodation-4star',
    name: '4-Star Accommodation',
    description: 'Luxury 4-star hotels and resorts',
    price: 100,
    type: 'accommodation',
    required: false
  },
  {
    id: 'accommodation-5star',
    name: '5-Star Accommodation',
    description: 'Premium 5-star hotels and luxury resorts',
    price: 200,
    type: 'accommodation',
    required: false
  },
  {
    id: 'transport-private',
    name: 'Private Vehicle',
    description: 'Private car with driver for all transfers',
    price: 80,
    type: 'transport',
    required: true
  },
  {
    id: 'transport-luxury',
    name: 'Luxury Vehicle',
    description: 'Premium vehicle with experienced driver',
    price: 120,
    type: 'transport',
    required: false
  },
  {
    id: 'guide-english',
    name: 'English Speaking Guide',
    description: 'Professional English speaking guide',
    price: 40,
    type: 'guide',
    required: true
  },
  {
    id: 'guide-multilingual',
    name: 'Multilingual Guide',
    description: 'Guide speaking multiple languages',
    price: 60,
    type: 'guide',
    required: false
  },
  {
    id: 'equipment-basic',
    name: 'Basic Trekking Equipment',
    description: 'Essential trekking gear and equipment',
    price: 30,
    type: 'equipment',
    required: false
  },
  {
    id: 'equipment-premium',
    name: 'Premium Trekking Equipment',
    description: 'High-quality trekking gear and equipment',
    price: 60,
    type: 'equipment',
    required: false
  },
  {
    id: 'meal-breakfast',
    name: 'Breakfast Included',
    description: 'Daily breakfast at accommodation',
    price: 15,
    type: 'meal',
    required: false
  },
  {
    id: 'meal-full-board',
    name: 'Full Board Meals',
    description: 'All meals included (breakfast, lunch, dinner)',
    price: 45,
    type: 'meal',
    required: false
  }
];
