import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IContactPageSection {
  id: number;
  sectionKey: string; // 'contact-info-section' or 'contact-form-section'
  topTitle?: string;
  heading: string;
  paragraph?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  contactHours?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('contact_page_sections')
export class ContactPageSection implements IContactPageSection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  sectionKey!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  topTitle?: string;

  @Column({ type: 'varchar', length: 255 })
  heading!: string;

  @Column({ type: 'text', nullable: true })
  paragraph?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contactHours?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

