import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IHomePageSection {
  id: number;
  sectionKey: string; // e.g., 'top-trek-section', 'top-tours-section', etc.
  topTitle?: string;
  heading?: string;
  subtitle?: string;
  adventureTitle?: string;
  adventureDescription?: string;
  adventureImage?: string;
  adventureOptions?: string; // JSON string array of options
  ctaLabel?: string;
  backgroundImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('home_page_sections')
export class HomePageSection implements IHomePageSection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  sectionKey!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  topTitle?: string;

  @Column({ type: 'text', nullable: true })
  heading?: string;

  @Column({ type: 'text', nullable: true })
  subtitle?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  adventureTitle?: string;

  @Column({ type: 'text', nullable: true })
  adventureDescription?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  adventureImage?: string;

  @Column({ type: 'text', nullable: true })
  adventureOptions?: string; // JSON string array

  @Column({ type: 'varchar', length: 100, nullable: true })
  ctaLabel?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  backgroundImage?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

