import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from '../config/database';

// Load environment variables
dotenv.config();

/**
 * Synchronize database schema (create/update tables)
 * WARNING: This will modify your database schema
 * Use with caution in production!
 */
async function syncDatabase() {
  try {
    console.log('🔄 Synchronizing database schema...');
    console.log('⚠️  This will create/update all database tables based on your entities.\n');
    
    // Initialize the data source
    await AppDataSource.initialize();
    console.log('✅ Database connection established');

    // Force synchronization (overrides the synchronize setting in DataSource config)
    // This will create all tables defined in entities
    console.log('📝 Creating/updating database tables...');
    await AppDataSource.synchronize(false); // false = don't drop existing data
    console.log('✅ Database schema synchronized successfully!');

    // Verify tables were created
    const queryRunner = AppDataSource.createQueryRunner();
    const tables = await queryRunner.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('\n📊 Database tables:');
    tables.forEach((table: any) => {
      console.log(`   ✓ ${table.table_name}`);
    });

    await queryRunner.release();
    await AppDataSource.destroy();
    
    console.log('\n✅ Database synchronization complete!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Database synchronization failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run the synchronization
syncDatabase();

