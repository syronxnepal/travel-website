import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export interface IBlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
}

@Entity('blog_categories')
export class BlogCategory implements IBlogCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}

