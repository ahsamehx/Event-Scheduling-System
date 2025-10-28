import { getPool } from './connection.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setupDatabase = async () => {
  try {
    const pool = getPool();
    
    // Read the SQL file
    const sqlFile = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    // Execute the SQL
    await pool.query(sql);
    
    console.log('Database tables created successfully!');
    
    // Close the pool
    await pool.end();
  } catch (error) {
    console.error('Database setup error:', error);
    process.exit(1);
  }
};

// Run setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupDatabase();
}

export default setupDatabase;
