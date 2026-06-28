import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IHomePageSection {
  id: number;
  sectionKey: string; // e.g., 'top-trek-section', 'top-tours-section', etc.
  topTitle: string;
  heading: string;
  adventureTitle?: string;
  adventureDescription?: string;
  adventureImage?: string;
  adventureOptions?: string; // JSON string array of options
  createdAt: Date;
  updatedAt: Date;
}

@Entity('home_page_sections')
export class HomePageSection implements IHomePageSection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  sectionKey!: string;

  @Column({ type: 'varchar', length: 255 })
  topTitle!: string;

  @Column({ type: 'text' })
  heading!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  adventureTitle?: string;

  @Column({ type: 'text', nullable: true })
  adventureDescription?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  adventureImage?: string;

  @Column({ type: 'text', nullable: true })
  adventureOptions?: string; // JSON string array

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

