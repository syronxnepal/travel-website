import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export interface IShortTour {
  id: number;
  title: string;
  location: string;
  category: string;
  duration: string;
  price: string;
  rating: string;
  reviewCount: number;
  image: string;
  description: string;
  highlights?: string[];
  featured: boolean;
  createdAt: Date;
}

@Entity('short_tours')
export class ShortTour implements IShortTour {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255 })
  location!: string;

  @Column({ type: 'varchar', length: 100 })
  category!: string;

  @Column({ type: 'varchar', length: 100 })
  duration!: string;

  @Column({ type: 'varchar', length: 50 })
  price!: string;

  @Column({ type: 'varchar', length: 10 })
  rating!: string;

  @Column({ type: 'int', default: 0 })
  reviewCount!: number;

  @Column({ type: 'varchar', length: 500 })
  image!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'jsonb', nullable: true })
  highlights?: string[];

  @Column({ type: 'boolean', default: false })
  featured!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}

