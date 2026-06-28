import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IMedia {
  id: number;
  filename: string;
  originalName: string;
  url: string;
  path: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  title?: string;
  description?: string;
  alt?: string;
  category?: string;
  tags?: string[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('media')
export class Media implements IMedia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  filename!: string;

  @Column({ type: 'varchar', length: 255 })
  originalName!: string;

  @Column({ type: 'varchar', length: 500 })
  url!: string;

  @Column({ type: 'varchar', length: 500 })
  path!: string;

  @Column({ type: 'varchar', length: 100 })
  mimeType!: string;

  @Column({ type: 'bigint' })
  size!: number;

  @Column({ type: 'int', nullable: true })
  width?: number;

  @Column({ type: 'int', nullable: true })
  height?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  alt?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category?: string;

  @Column({ type: 'jsonb', nullable: true })
  tags?: string[];

  @Column({ type: 'boolean', default: false })
  isDeleted!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

