import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IWishlist {
  id: number;
  userId?: number; // Optional for guest users (stored in localStorage)
  itemId: number;
  itemType: 'trek' | 'tour' | 'short-tour';
  createdAt: Date;
  updatedAt: Date;
}

@Entity('wishlists')
export class Wishlist implements IWishlist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int', nullable: true })
  userId?: number;

  @Column({ type: 'int' })
  itemId!: number;

  @Column({ type: 'varchar', length: 50 })
  itemType!: 'trek' | 'tour' | 'short-tour';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

