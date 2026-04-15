import { Pool } from 'pg';
import type { Env } from './env.js';

export const connectToPostgres = async (postgresUrl: Env['postgresUrl']) => {
    const pool = new Pool({ connectionString: postgresUrl });

    // Check database connection, better now than after
    await pool.query('SELECT 1');

    return { pool };
};
