import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IBooking {
  id: number;
  // Customer Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  nationality?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  specialRequests?: string;
  
  // Booking Details
  bookingType: 'trek' | 'tour' | 'short-tour' | 'custom-package';
  itemId: number;
  itemTitle: string;
  itemLocation?: string;
  category?: string;
  travelDate: Date;
  selectedTime?: string;
  numberOfPersons: number;
  basePrice: number;
  totalPrice: number;
  
  // Payment Details
  paymentMethod: 'cash-after-delivery' | 'stripe';
  paymentStatus: 'pending' | 'completed' | 'failed';
  stripePaymentIntentId?: string;
  stripeClientSecret?: string;
  
  // Additional Options
  travelInsurance: boolean;
  privateGuide: boolean;
  privateTransport: boolean;
  mealUpgrade: boolean;
  additionalOptions?: string[];
  
  // Status
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  
  // Metadata
  bookingDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Entity('bookings')
export class Booking implements IBooking {
  @PrimaryGeneratedColumn()
  id!: number;

  // Customer Details
  @Column({ type: 'varchar', length: 255 })
  firstName!: string;

  @Column({ type: 'varchar', length: 255 })
  lastName!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 50 })
  phone!: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nationality?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  emergencyContact?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  emergencyPhone?: string;

  @Column({ type: 'text', nullable: true })
  specialRequests?: string;

  // Booking Details
  @Column({ type: 'varchar', length: 50 })
  bookingType!: 'trek' | 'tour' | 'short-tour' | 'custom-package';

  @Column({ type: 'int' })
  itemId!: number;

  @Column({ type: 'varchar', length: 500 })
  itemTitle!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  itemLocation?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category?: string;

  @Column({ type: 'date' })
  travelDate!: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  selectedTime?: string;

  @Column({ type: 'int' })
  numberOfPersons!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  basePrice!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice!: number;

  // Payment Details
  @Column({ type: 'varchar', length: 50, default: 'cash-after-delivery' })
  paymentMethod!: 'cash-after-delivery' | 'stripe';

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  paymentStatus!: 'pending' | 'completed' | 'failed';

  @Column({ type: 'varchar', length: 255, nullable: true })
  stripePaymentIntentId?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  stripeClientSecret?: string;

  // Additional Options
  @Column({ type: 'boolean', default: false })
  travelInsurance!: boolean;

  @Column({ type: 'boolean', default: false })
  privateGuide!: boolean;

  @Column({ type: 'boolean', default: false })
  privateTransport!: boolean;

  @Column({ type: 'boolean', default: false })
  mealUpgrade!: boolean;

  @Column({ type: 'jsonb', nullable: true })
  additionalOptions?: string[];

  // Status
  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status!: 'pending' | 'confirmed' | 'cancelled' | 'completed';

  // Metadata
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  bookingDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

