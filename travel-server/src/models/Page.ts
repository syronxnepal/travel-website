import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export interface IPage {
  id: number;
  image: string;
  topTitle: string;
  heading: string;
  status: 'published' | 'draft';
  createdAt: Date;
}

@Entity('pages')
export class Page implements IPage {
  @PrimaryGeneratedColumn()
  id!: number;

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
}

