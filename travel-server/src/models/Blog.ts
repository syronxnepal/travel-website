import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export interface IBlog {
  id: number;
  title: string;
  author: string;
  category: string;
  image: string;
  images?: string[];
  content: string;
  excerpt: string;
  date: Date;
  readTime?: string;
  views: number;
  featured: boolean;
  published: boolean;
  createdAt: Date;
}

@Entity('blogs')
export class Blog implements IBlog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255 })
  author!: string;

  @Column({ type: 'varchar', length: 100 })
  category!: string;

  @Column({ type: 'varchar', length: 500 })
  image!: string;

  @Column({ type: 'jsonb', nullable: true })
  images?: string[];

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'text' })
  excerpt!: string;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  readTime?: string;

  @Column({ type: 'int', default: 0 })
  views!: number;

  @Column({ type: 'boolean', default: false })
  featured!: boolean;

  @Column({ type: 'boolean', default: false })
  published!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}

