import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IAboutMissionItem {
  id: number;
  heading: string;
  paragraph: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('about_mission_items')
export class AboutMissionItem implements IAboutMissionItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  heading!: string;

  @Column({ type: 'text' })
  paragraph!: string;

  @Column({ type: 'int', default: 0 })
  order!: number;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

