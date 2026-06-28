import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IContact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  tag?: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
}

@Entity('contacts')
export class Contact implements IContact {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  subject?: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  tag?: string;

  @Column({ type: 'varchar', length: 50, default: 'new' })
  status!: 'new' | 'read' | 'replied';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

