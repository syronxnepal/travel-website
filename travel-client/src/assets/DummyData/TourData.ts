export interface Tour {
  id: number;
  title: string;
  location: string;
  duration: string;
  rating: number;
  reviewCount: number;
  price: string;
  image: string;
  category: string;
  description: string;
  difficulty?: string;
  groupSize?: string;
  highlights?: string[];
}

export const tourData: Tour[] = [
  {
    id: 1,
    title: "National Sea Life Centre Entrance Ticket",
    location: "Birmingham",
    duration: "0 - 3 hours",
    rating: 4.5,
    reviewCount: 128,
    price: "$25",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Cultural",
    description: "Discover London's most essential sights and landmarks in this comprehensive city tour.",
    highlights: ["Underwater tunnel", "Marine life viewing", "Educational exhibits"]
  },
  {
    id: 2,
    title: "Starlight with Sea Cave Kayaking and Loy Krathong Floating",
    location: "18-01 Astoria Blvd, Astoria",
    duration: "3 days",
    rating: 4.5,
    reviewCount: 2,
    price: "$219.00",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Adventure",
    description: "Experience the magic of sea cave kayaking under the stars with traditional Loy Krathong floating ceremony.",
    difficulty: "Medium",
    groupSize: "Small groups",
    highlights: ["Sea cave exploration", "Kayaking", "Cultural ceremony"]
  },
  {
    id: 3,
    title: "Cultural Heritage Walking Tour",
    location: "Kathmandu, Nepal",
    duration: "4 hours",
    rating: 4.8,
    reviewCount: 45,
    price: "$35",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Cultural",
    description: "Explore the rich cultural heritage of Kathmandu through its ancient temples and traditional architecture.",
    highlights: ["UNESCO sites", "Local guide", "Traditional architecture"]
  },
  {
    id: 4,
    title: "Mountain Adventure Trek",
    location: "Annapurna Region",
    duration: "7 days",
    rating: 4.9,
    reviewCount: 78,
    price: "$450",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Adventure",
    description: "Experience the breathtaking beauty of the Annapurna region with this challenging mountain trek.",
    difficulty: "Hard",
    groupSize: "Small groups",
    highlights: ["Mountain views", "Local villages", "Nature trails"]
  },
  {
    id: 5,
    title: "Wildlife Safari Experience",
    location: "Chitwan National Park",
    duration: "2 days",
    rating: 4.7,
    reviewCount: 32,
    price: "$180",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Nature",
    description: "Get up close with exotic wildlife in one of Nepal's most famous national parks.",
    highlights: ["Wildlife spotting", "Jungle walks", "Bird watching"]
  },
  {
    id: 6,
    title: "Historical City Exploration",
    location: "Patan, Nepal",
    duration: "3 hours",
    rating: 4.6,
    reviewCount: 28,
    price: "$25",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Historical",
    description: "Discover the ancient history and architectural marvels of Patan Durbar Square.",
    highlights: ["Ancient temples", "Historical sites", "Local culture"]
  }
];

export const shortTourData: Tour[] = [
  {
    id: 7,
    title: "Kathmandu City Highlights",
    location: "Kathmandu, Nepal",
    duration: "1 day",
    rating: 4.4,
    reviewCount: 67,
    price: "$45",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Cultural",
    description: "Explore the best of Kathmandu in a single day with our comprehensive city tour.",
    highlights: ["Swayambhunath", "Pashupatinath", "Durbar Square"]
  },
  {
    id: 8,
    title: "Pokhara Day Trip",
    location: "Pokhara, Nepal",
    duration: "1 day",
    rating: 4.6,
    reviewCount: 89,
    price: "$55",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Nature",
    description: "Experience the natural beauty of Pokhara with its lakes and mountain views.",
    highlights: ["Phewa Lake", "Mountain views", "Peace Pagoda"]
  },
  {
    id: 9,
    title: "Bhaktapur Heritage Walk",
    location: "Bhaktapur, Nepal",
    duration: "4 hours",
    rating: 4.7,
    reviewCount: 34,
    price: "$30",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Historical",
    description: "Step back in time with a guided walk through the ancient city of Bhaktapur.",
    highlights: ["Ancient architecture", "Local crafts", "Traditional culture"]
  },
  {
    id: 10,
    title: "Nagarkot Sunrise View",
    location: "Nagarkot, Nepal",
    duration: "6 hours",
    rating: 4.8,
    reviewCount: 56,
    price: "$40",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Nature",
    description: "Witness the spectacular sunrise over the Himalayas from Nagarkot viewpoint.",
    highlights: ["Sunrise views", "Himalayan panorama", "Photography"]
  },
  {
    id: 11,
    title: "Thamel Food Tour",
    location: "Kathmandu, Nepal",
    duration: "3 hours",
    rating: 4.5,
    reviewCount: 42,
    price: "$25",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Cultural",
    description: "Taste authentic Nepali cuisine while exploring the vibrant Thamel district.",
    highlights: ["Local food", "Street food", "Cultural experience"]
  },
  {
    id: 12,
    title: "Weekend Mountain Retreat",
    location: "Dhulikhel, Nepal",
    duration: "2 days",
    rating: 4.9,
    reviewCount: 23,
    price: "$120",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Nature",
    description: "Escape to the mountains for a peaceful weekend retreat with stunning views.",
    highlights: ["Mountain views", "Relaxation", "Nature walks"]
  }
];
