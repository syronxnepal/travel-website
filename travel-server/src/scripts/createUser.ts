import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

interface UserData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'viewer';
}

const defaultUser: UserData = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin'
};

async function createUser() {
  try {
    console.log('👤 Creating user...\n');
    
    // Get user data from environment variables or use defaults
    const userData: UserData = {
      name: process.env.USER_NAME || defaultUser.name,
      email: process.env.USER_EMAIL || defaultUser.email,
      password: process.env.USER_PASSWORD || defaultUser.password,
      role: (process.env.USER_ROLE as 'admin' | 'editor' | 'viewer') || defaultUser.role
    };

    console.log(`📝 User details:`);
    console.log(`   Name: ${userData.name}`);
    console.log(`   Email: ${userData.email}`);
    console.log(`   Role: ${userData.role}\n`);

    // Check if database credentials are provided
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
      console.error('❌ Missing database credentials!');
      console.error('\nPlease provide database credentials via environment variables:');
      console.error('  DB_HOST=your-db-host');
      console.error('  DB_PORT=5432 (optional, defaults to 5432)');
      console.error('  DB_USER=your-db-user');
      console.error('  DB_PASSWORD=your-db-password');
      console.error('  DB_NAME=your-db-name');
      console.error('\nOptional user data:');
      console.error('  USER_NAME=Admin User');
      console.error('  USER_EMAIL=admin@example.com');
      console.error('  USER_PASSWORD=admin123');
      console.error('  USER_ROLE=admin (admin, editor, or viewer)');
      console.error('\nExample:');
      console.error('  DB_HOST=localhost DB_USER=postgres DB_PASSWORD=pass DB_NAME=traveldb USER_EMAIL=admin@example.com USER_PASSWORD=admin123 npm run user:create');
      process.exit(1);
    }

    // Initialize the data source
    await AppDataSource.initialize();
    console.log('✅ Database connection established\n');

    const userRepository = AppDataSource.getRepository(User);

    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      console.log(`⚠️  User with email ${userData.email} already exists!`);
      console.log('   Use a different email or delete the existing user first.\n');
      await AppDataSource.destroy();
      process.exit(1);
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = userRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role
    });

    const savedUser = await userRepository.save(user);

    console.log('\n✅ User created successfully!');
    console.log(`\n📊 User ID: ${savedUser.id}`);
    console.log(`   Name: ${savedUser.name}`);
    console.log(`   Email: ${savedUser.email}`);
    console.log(`   Role: ${savedUser.role}`);
    console.log(`   Created: ${savedUser.createdAt}\n`);

    console.log('🔑 Login credentials:');
    console.log(`   Email: ${userData.email}`);
    console.log(`   Password: ${userData.password}\n`);

    await AppDataSource.destroy();
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Failed to create user:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run the script
createUser();

