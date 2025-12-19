
interface Tour {
    id: number;
    title: string;
    location: string;
    rating: number;
    reviewCount: number;
    duration: string;
    difficulty: string;
    price: string;
    originalPrice?: string;
    discount?: string;
    images: string[];
    description: string;
    highlights: string[];
    included: string[];
    excluded: string[];
    tourInfo: {
      duration: string;
      difficulty: string;
      groupSize: string;
      maxAge: string;
      language: string[];
      paymentMethod: string[];
      transportation: string[];
      walkingHours: string;
      meals: string[];
      activities: string[];
      tourType: string;
      destination: string;
      roomLocation: string;
      seatAvailability: string;
      wifi: string;
      guest: string;
    };
    itinerary: {
      day: number;
      title: string;
      description: string;
      activities: string[];
      meals: string[];
      accommodation: string;
      highlights: string[];
    }[];
    reviews: {
      id: number;
      name: string;
      date: string;
      rating: number;
      title: string;
      comment: string;
      categories: {
        quality: number;
        hospitality: number;
        service: number;
        pricing: number;
      };
    }[];
  }
  

export const trekData: Tour[] = [
         {
          id: 1,
          title: 'Everest Base Camp Trek',
          location: 'Sagarmatha National Park, Nepal',
          rating: 4.8,
          reviewCount: 1247,
          duration: '14 Days',
          difficulty: 'Challenging',
          price: '$1,299',
          originalPrice: '$1,599',
          discount: '19% OFF',
          images: [
            'https://admin.ntb.gov.np/image-cache/ebc_tk_adventure_2-1624450765.jpeg?p=main&s=1f72965258be9625bee4886c373424ad',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
            'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800',
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
          ],
          description: 'Experience the ultimate adventure with our Everest Base Camp trek. This challenging 14-day journey takes you through the heart of the Himalayas, offering breathtaking views of the world\'s highest peak and an unforgettable cultural experience in the Sherpa villages.',
          highlights: [
            'Trek to the base camp of Mount Everest (5,364m)',
            'Experience Sherpa culture and hospitality',
            'Witness stunning Himalayan panoramas',
            'Visit ancient monasteries and prayer wheels',
            'Cross suspension bridges over glacial rivers',
            'Explore Namche Bazaar, the gateway to Everest'
          ],
          included: [
            'Professional English-speaking guide',
            'Porter service (1 porter per 2 trekkers)',
            'All meals during the trek',
            'Teahouse accommodation',
            'All necessary permits and fees',
            'Airport transfers',
            'Trekking equipment rental',
            'Medical kit and emergency oxygen'
          ],
          excluded: [
            'International flights',
            'Travel insurance',
            'Personal expenses',
            'Tips for guide and porter',
            'Alcoholic beverages',
            'Hot showers and charging devices'
          ],
          tourInfo: {
            duration: '14 Days',
            difficulty: 'Challenging',
            groupSize: '2-12 People',
            maxAge: '65+ Years',
            language: ['English', 'Nepali'],
            paymentMethod: ['VISA', 'Master Card', 'PayPal'],
            transportation: ['Flight', 'Private Vehicle', 'Walking'],
            walkingHours: '6-8 Hours Daily',
            meals: ['Breakfast', 'Lunch', 'Dinner'],
            activities: ['Trekking', 'Cultural Tours', 'Photography'],
            tourType: 'Adventure',
            destination: 'Nepal, Everest Region',
            roomLocation: 'Teahouse Lodges',
            seatAvailability: 'Limited Availability',
            wifi: 'Available in Namche',
            guest: 'Qualified'
          },
          itinerary: [
            {
              day: 1,
              title: 'Arrival in Kathmandu',
              description: 'Arrive in Kathmandu and transfer to hotel. Briefing about the trek and equipment check.',
              activities: [
                'Airport pickup and transfer to hotel',
                'Trek briefing and equipment check',
                'Explore Thamel district'
              ],
              meals: ['Welcome Dinner'],
              accommodation: '3-star hotel in Kathmandu',
              highlights: [
                'Cultural immersion in Kathmandu',
                'Equipment preparation and briefing'
              ]
            },
            {
              day: 2,
              title: 'Flight to Lukla and Trek to Phakding',
              description: 'Early morning flight to Lukla, then begin trekking to Phakding village.',
              activities: [
                'Scenic flight to Lukla (2,860m)',
                'Trek to Phakding (2,610m)',
                'Visit local monasteries'
              ],
              meals: ['Breakfast', 'Lunch', 'Dinner'],
              accommodation: 'Teahouse in Phakding',
              highlights: [
                'Breathtaking mountain flight',
                'First day of trekking adventure'
              ]
            },
            {
              day: 3,
              title: 'Trek to Namche Bazaar',
              description: 'Trek to Namche Bazaar, the trading hub of the Khumbu region.',
              activities: [
                'Cross suspension bridges',
                'Trek to Namche Bazaar (3,440m)',
                'Explore local markets'
              ],
              meals: ['Breakfast', 'Lunch', 'Dinner'],
              accommodation: 'Teahouse in Namche',
              highlights: [
                'First views of Mount Everest',
                'Acclimatization in Namche'
              ]
            }
          ],
          reviews: [
            {
              id: 1,
              name: 'Sarah Johnson',
              date: 'March 15, 2024',
              rating: 5,
              title: 'Absolutely Amazing Experience!',
              comment: 'The Everest Base Camp trek was the most incredible adventure of my life. Our guide was knowledgeable and supportive throughout the journey.',
              categories: {
                quality: 5,
                hospitality: 5,
                service: 5,
                pricing: 4
              }
            },
            {
              id: 2,
              name: 'Michael Chen',
              date: 'February 28, 2024',
              rating: 4,
              title: 'Challenging but Rewarding',
              comment: 'This trek pushed me to my limits, but the views and experience made it all worthwhile. Highly recommend for adventure seekers.',
              categories: {
                quality: 4,
                hospitality: 5,
                service: 4,
                pricing: 4
              }
            }
          ]
        },
    {
      id: 2,
      title: 'Annapurna Circuit Trek',
      location: 'Annapurna Region, Nepal',
      rating: 4.6,
      reviewCount: 892,
      duration: '12 Days',
      difficulty: 'Moderate',
      price: '$899',
      originalPrice: '$1,099',
      discount: '18% OFF',
      images: [
        'https://www.adventuregreathimalaya.com/wp-content/uploads/nepal-hiking-tours.jpg',
        'https://images.unsplash.com/photo-1551524164-6cf2ac5313f4?w=800',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800'
      ],
      description: 'Discover the diverse landscapes of the Annapurna region on this classic trekking route. From lush valleys to high mountain passes, experience the rich culture and stunning mountain views.',
      highlights: [
        'Trek around the entire Annapurna massif',
        'Cross the famous Thorong La Pass (5,416m)',
        'Experience diverse landscapes and cultures',
        'Visit ancient monasteries and villages',
        'Witness sunrise over the Himalayas',
        'Explore the beautiful Manang Valley'
      ],
      included: [
        'Professional English-speaking guide',
        'Porter service (1 porter per 2 trekkers)',
        'All meals during the trek',
        'Teahouse accommodation',
        'All necessary permits and fees',
        'Airport transfers',
        'Trekking equipment rental',
        'Medical kit and emergency oxygen'
      ],
      excluded: [
        'International flights',
        'Travel insurance',
        'Personal expenses',
        'Tips for guide and porter',
        'Alcoholic beverages',
        'Hot showers and charging devices'
      ],
      tourInfo: {
        duration: '12 Days',
        difficulty: 'Moderate',
        groupSize: '2-15 People',
        maxAge: '60+ Years',
        language: ['English', 'Nepali'],
        paymentMethod: ['VISA', 'Master Card', 'PayPal'],
        transportation: ['Private Vehicle', 'Walking'],
        walkingHours: '5-7 Hours Daily',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        activities: ['Trekking', 'Cultural Tours', 'Photography'],
        tourType: 'Adventure',
        destination: 'Nepal, Annapurna Region',
        roomLocation: 'Teahouse Lodges',
        seatAvailability: 'Good Availability',
        wifi: 'Available in most villages',
        guest: 'Qualified'
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Kathmandu',
          description: 'Arrive in Kathmandu and transfer to hotel. Briefing about the trek.',
          activities: [
            'Airport pickup and transfer to hotel',
            'Trek briefing and equipment check',
            'Explore Thamel district'
          ],
          meals: ['Welcome Dinner'],
          accommodation: '3-star hotel in Kathmandu',
          highlights: [
            'Cultural immersion in Kathmandu',
            'Equipment preparation and briefing'
          ]
        },
        {
          day: 2,
          title: 'Drive to Besisahar and Trek to Ngadi',
          description: 'Scenic drive to Besisahar and begin trekking to Ngadi.',
          activities: [
            'Drive to Besisahar (760m)',
            'Trek to Ngadi (930m)',
            'Visit local villages'
          ],
          meals: ['Breakfast', 'Lunch', 'Dinner'],
          accommodation: 'Teahouse in Ngadi',
          highlights: [
            'Beautiful countryside views',
            'First day of trekking adventure'
          ]
        }
      ],
      reviews: [
        {
          id: 1,
          name: 'Emma Wilson',
          date: 'April 10, 2024',
          rating: 5,
          title: 'Incredible Mountain Views!',
          comment: 'The Annapurna Circuit was absolutely breathtaking. The diversity of landscapes was amazing.',
          categories: {
            quality: 5,
            hospitality: 4,
            service: 5,
            pricing: 4
          }
        }
      ]
    },
    {
      id: 3,
      title: 'Trishuli River Rafting',
      location: 'Trishuli River, Nepal',
      rating: 4.2,
      reviewCount: 456,
      duration: '2 Days',
      difficulty: 'Easy',
      price: '$199',
      originalPrice: '$249',
      discount: '20% OFF',
      images: [
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/22/84/90/white-water-rafting-at.jpg?w=1200&h=1200&s=1',
        'https://images.unsplash.com/photo-1551524164-6cf2ac5313f4?w=800',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800'
      ],
      description: 'Experience the thrill of white water rafting on the Trishuli River. Perfect for beginners and families, this adventure offers exciting rapids and beautiful scenery.',
      highlights: [
        'White water rafting on Grade III rapids',
        'Beautiful river valley scenery',
        'Professional safety equipment',
        'Experienced river guides',
        'Riverside camping experience',
        'Traditional Nepali meals'
      ],
      included: [
        'Professional river guide',
        'All rafting equipment',
        'Safety gear and life jackets',
        'All meals during the trip',
        'Riverside camping accommodation',
        'Transportation to/from river',
        'Photography service',
        'First aid kit'
      ],
      excluded: [
        'International flights',
        'Travel insurance',
        'Personal expenses',
        'Tips for guide',
        'Alcoholic beverages',
        'Personal clothing'
      ],
      tourInfo: {
        duration: '2 Days',
        difficulty: 'Easy',
        groupSize: '4-12 People',
        maxAge: 'No limit',
        language: ['English', 'Nepali'],
        paymentMethod: ['VISA', 'Master Card', 'PayPal'],
        transportation: ['Private Vehicle', 'Raft'],
        walkingHours: '2-3 Hours Daily',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        activities: ['Rafting', 'Swimming', 'Camping'],
        tourType: 'Adventure',
        destination: 'Nepal, Trishuli River',
        roomLocation: 'Riverside Camping',
        seatAvailability: 'Good Availability',
        wifi: 'Not Available',
        guest: 'All Levels'
      },
      itinerary: [
        {
          day: 1,
          title: 'Drive to River and Start Rafting',
          description: 'Drive to the starting point and begin rafting adventure.',
          activities: [
            'Drive to Charaudi (starting point)',
            'Safety briefing and equipment fitting',
            'Start rafting on Trishuli River',
            'Lunch by the river'
          ],
          meals: ['Lunch', 'Dinner'],
          accommodation: 'Riverside Camping',
          highlights: [
            'First rafting experience',
            'Beautiful river scenery'
          ]
        },
        {
          day: 2,
          title: 'Continue Rafting and Return',
          description: 'Continue rafting and return to Kathmandu.',
          activities: [
            'Continue rafting adventure',
            'Swimming in the river',
            'Drive back to Kathmandu'
          ],
          meals: ['Breakfast', 'Lunch'],
          accommodation: 'Not included',
          highlights: [
            'Complete rafting experience',
            'Memorable adventure'
          ]
        }
      ],
      reviews: [
        {
          id: 1,
          name: 'David Brown',
          date: 'March 22, 2024',
          rating: 4,
          title: 'Fun and Exciting!',
          comment: 'Great experience for beginners. The guides were very professional and safety-conscious.',
          categories: {
            quality: 4,
            hospitality: 4,
            service: 5,
            pricing: 4
          }
        }
      ]
    },
    {
      id: 4,
      title: 'Langtang Valley Trek',
      location: 'Langtang Region, Nepal',
      rating: 4.4,
      reviewCount: 623,
      duration: '8 Days',
      difficulty: 'Moderate',
      price: '$699',
      originalPrice: '$849',
      discount: '18% OFF',
      images: [
        'https://www.adventuregreathimalaya.com/wp-content/uploads/nepal-hiking-tours.jpg',
        'https://images.unsplash.com/photo-1551524164-6cf2ac5313f4?w=800',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800'
      ],
      description: 'Explore the beautiful Langtang Valley, known for its stunning mountain views and rich Tibetan culture. This trek offers a perfect blend of nature and culture.',
      highlights: [
        'Trek through Langtang National Park',
        'Visit traditional Tamang villages',
        'Witness stunning mountain panoramas',
        'Experience Tibetan culture',
        'See diverse wildlife and flora',
        'Visit ancient monasteries'
      ],
      included: [
        'Professional English-speaking guide',
        'Porter service (1 porter per 2 trekkers)',
        'All meals during the trek',
        'Teahouse accommodation',
        'All necessary permits and fees',
        'Airport transfers',
        'Trekking equipment rental',
        'Medical kit and emergency oxygen'
      ],
      excluded: [
        'International flights',
        'Travel insurance',
        'Personal expenses',
        'Tips for guide and porter',
        'Alcoholic beverages',
        'Hot showers and charging devices'
      ],
      tourInfo: {
        duration: '8 Days',
        difficulty: 'Moderate',
        groupSize: '2-12 People',
        maxAge: '65+ Years',
        language: ['English', 'Nepali'],
        paymentMethod: ['VISA', 'Master Card', 'PayPal'],
        transportation: ['Private Vehicle', 'Walking'],
        walkingHours: '5-6 Hours Daily',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        activities: ['Trekking', 'Cultural Tours', 'Wildlife Viewing'],
        tourType: 'Adventure',
        destination: 'Nepal, Langtang Region',
        roomLocation: 'Teahouse Lodges',
        seatAvailability: 'Good Availability',
        wifi: 'Available in some villages',
        guest: 'Qualified'
      },
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Kathmandu',
          description: 'Arrive in Kathmandu and transfer to hotel. Briefing about the trek.',
          activities: [
            'Airport pickup and transfer to hotel',
            'Trek briefing and equipment check',
            'Explore Thamel district'
          ],
          meals: ['Welcome Dinner'],
          accommodation: '3-star hotel in Kathmandu',
          highlights: [
            'Cultural immersion in Kathmandu',
            'Equipment preparation and briefing'
          ]
        },
        {
          day: 2,
          title: 'Drive to Syabrubesi',
          description: 'Scenic drive to Syabrubesi, the starting point of the trek.',
          activities: [
            'Drive to Syabrubesi (1,460m)',
            'Explore the village',
            'Prepare for trekking'
          ],
          meals: ['Breakfast', 'Lunch', 'Dinner'],
          accommodation: 'Teahouse in Syabrubesi',
          highlights: [
            'Beautiful countryside views',
            'Preparation for adventure'
          ]
        }
      ],
      reviews: [
        {
          id: 1,
          name: 'Lisa Anderson',
          date: 'February 15, 2024',
          rating: 5,
          title: 'Beautiful Valley and Culture!',
          comment: 'The Langtang Valley was absolutely stunning. The cultural experience was amazing.',
          categories: {
            quality: 5,
            hospitality: 5,
            service: 4,
            pricing: 4
          }
        }
      ]
    }
  ];
