import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IContactSocialLink {
  id: number;
  platform: string;
  url: string;
  icon?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('contact_social_links')
export class ContactSocialLink implements IContactSocialLink {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  platform!: string;

  @Column({ type: 'varchar', length: 500 })
  url!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  icon?: string;

  @Column({ type: 'int', default: 0 })
  order!: number;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

