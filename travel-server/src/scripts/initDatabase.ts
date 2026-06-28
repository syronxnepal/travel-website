import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from '../config/database';

// Load environment variables
dotenv.config();

/**
 * Initialize database and create all tables
 * This script creates all tables defined in the entities
 */
async function initDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // Initialize the data source
    await AppDataSource.initialize();
    console.log('✅ Database connection established');

    // Run migrations or synchronize schema
    // Note: In production, use migrations instead of synchronize
    if (process.env.NODE_ENV === 'production') {
      console.log('⚠️  Production mode detected. Use migrations instead of synchronize.');
      console.log('   Run: npm run migration:run');
    } else {
      // For development, synchronize will create tables
      // This is already handled by the synchronize option in database.ts
      console.log('✅ Database schema synchronized');
    }

    // Verify tables exist by checking if we can query
    const queryRunner = AppDataSource.createQueryRunner();
    
    // Check if treks table exists
    const tables = await queryRunner.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('\n📊 Existing tables:');
    tables.forEach((table: any) => {
      console.log(`   - ${table.table_name}`);
    });

    // Check specifically for treks table
    const treksTableExists = tables.some((table: any) => table.table_name === 'treks');
    
    if (!treksTableExists) {
      console.log('\n❌ Treks table does not exist!');
      console.log('💡 Solution: Set NODE_ENV=development or enable synchronize in database.ts');
      console.log('   Or manually create tables using SQL or migrations.');
    } else {
      console.log('\n✅ Treks table exists!');
    }

    await queryRunner.release();
    await AppDataSource.destroy();
    
    console.log('\n✅ Database initialization complete!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Database initialization failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run the initialization
initDatabase();



