import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { GalleryCategory } from './GalleryCategory';

export interface IGalleryImage {
  id: number;
  title: string;
  alt: string;
  image: string;
  location?: string;
  categoryId: number;
  category?: GalleryCategory;
  size: 'small' | 'medium' | 'large' | 'tall';
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('gallery_images')
export class GalleryImage implements IGalleryImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 500 })
  alt!: string;

  @Column({ type: 'varchar', length: 500 })
  image!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string;

  @Column({ type: 'int' })
  categoryId!: number;

  @ManyToOne(() => GalleryCategory)
  @JoinColumn({ name: 'categoryId' })
  category?: GalleryCategory;

  @Column({ 
    type: 'enum', 
    enum: ['small', 'medium', 'large', 'tall'],
    default: 'medium'
  })
  size!: 'small' | 'medium' | 'large' | 'tall';

  @Column({ type: 'int', default: 0 })
  order!: number;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

