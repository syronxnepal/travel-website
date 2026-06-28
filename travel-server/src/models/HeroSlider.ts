import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IHeroSlider {
  id: number;
  image: string;
  title: string;
  paragraph: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('hero_sliders')
export class HeroSlider implements IHeroSlider {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 500 })
  image!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

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

