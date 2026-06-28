import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'viewer' | 'customer';
  avatar?: string;
  createdAt: Date;
}

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ 
    type: 'enum', 
    enum: ['admin', 'editor', 'viewer', 'customer'], 
    default: 'customer' 
  })
  role!: 'admin' | 'editor' | 'viewer' | 'customer';

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar?: string;

  @CreateDateColumn()
  createdAt!: Date;
}

