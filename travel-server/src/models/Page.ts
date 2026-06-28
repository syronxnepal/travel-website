import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IPage {
  id: number;
  pageType: 'about' | 'about-our-story' | 'about-why-choose-us' | 'contact' | 'trek-listing' | 'tour-listing' | 'short-tour-listing' | 'gallery' | 'blogs' | 'custom-listing';
  image: string;
  topTitle: string;
  heading: string;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

@Entity('pages')
export class Page implements IPage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ 
    type: 'enum', 
    enum: ['about', 'about-our-story', 'about-why-choose-us', 'contact', 'trek-listing', 'tour-listing', 'short-tour-listing', 'gallery', 'blogs', 'custom-listing'],
    nullable: false
  })
  pageType!: 'about' | 'about-our-story' | 'about-why-choose-us' | 'contact' | 'trek-listing' | 'tour-listing' | 'short-tour-listing' | 'gallery' | 'blogs' | 'custom-listing';

  @Column({ type: 'varchar', length: 500 })
  image!: string;

  @Column({ type: 'varchar', length: 255 })
  topTitle!: string;

  @Column({ type: 'varchar', length: 255 })
  heading!: string;

  @Column({ 
    type: 'enum', 
    enum: ['published', 'draft'], 
    default: 'draft' 
  })
  status!: 'published' | 'draft';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

