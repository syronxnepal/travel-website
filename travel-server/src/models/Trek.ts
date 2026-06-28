import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities?: string[];
  meals?: string[];
  accommodation?: string;
  highlights?: string[];
}

export interface TourInfo {
  icon: string;
  title: string;
  value: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ITrek {
  id: number;
  title: string;
  location: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  duration: string;
  price: string;
  originalPrice?: string;
  rating: string;
  reviewCount: number;
  image: string;
  images?: string[];
  description: string;
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  itinerary?: ItineraryDay[];
  tourInfo?: TourInfo[];
  faqs?: FAQ[];
  featured: boolean;
  createdAt: Date;
}

@Entity('treks')
export class Trek implements ITrek {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255 })
  location!: string;

  @Column({ 
    type: 'enum', 
    enum: ['Easy', 'Moderate', 'Challenging', 'Expert'] 
  })
  difficulty!: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';

  @Column({ type: 'varchar', length: 100 })
  duration!: string;

  @Column({ type: 'varchar', length: 50 })
  price!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  originalPrice?: string;

  @Column({ type: 'varchar', length: 10 })
  rating!: string;

  @Column({ type: 'int', default: 0 })
  reviewCount!: number;

  @Column({ type: 'varchar', length: 500 })
  image!: string;

  @Column({ type: 'jsonb', nullable: true })
  images?: string[];

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'jsonb', nullable: true })
  highlights?: string[];

  @Column({ type: 'jsonb', nullable: true })
  included?: string[];

  @Column({ type: 'jsonb', nullable: true })
  excluded?: string[];

  @Column({ type: 'jsonb', nullable: true })
  itinerary?: ItineraryDay[];

  @Column({ type: 'jsonb', nullable: true })
  tourInfo?: TourInfo[];

  @Column({ type: 'jsonb', nullable: true })
  faqs?: FAQ[];

  @Column({ type: 'boolean', default: false })
  featured!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}

