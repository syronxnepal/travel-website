import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IAboutWhyChooseUsItem {
  id: number;
  heading: string;
  paragraph: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('about_why_choose_us_items')
export class AboutWhyChooseUsItem implements IAboutWhyChooseUsItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  heading!: string;

  @Column({ type: 'text' })
  paragraph!: string;

  @Column({ type: 'varchar', length: 100 })
  icon!: string;

  @Column({ type: 'int', default: 0 })
  order!: number;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

