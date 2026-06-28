import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IAboutPageSection {
  id: number;
  sectionKey: string; // 'about-intro-section' (includes intro and mission data)
  topTitle?: string;
  heading: string;
  paragraph?: string;
  description?: string;
  features?: string[]; // For intro section features list
  missionHeading?: string; // Mission section heading
  missionParagraph?: string; // Mission section paragraph
  createdAt: Date;
  updatedAt: Date;
}

@Entity('about_page_sections')
export class AboutPageSection implements IAboutPageSection {
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

  @Column({ type: 'jsonb', nullable: true })
  features?: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  missionHeading?: string;

  @Column({ type: 'text', nullable: true })
  missionParagraph?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

