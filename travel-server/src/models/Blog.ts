import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export interface IBlog {
  id: number;
  title: string;
  author: string;
  category: string;
  image: string;
  content: string;
  excerpt: string;
  date: Date;
  published: boolean;
  createdAt: Date;
}

@Entity('blogs')
export class Blog implements IBlog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255 })
  author!: string;

  @Column({ type: 'varchar', length: 100 })
  category!: string;

  @Column({ type: 'varchar', length: 500 })
  image!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'text' })
  excerpt!: string;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ type: 'boolean', default: false })
  published!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}

