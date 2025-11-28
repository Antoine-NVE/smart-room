import { Pool } from 'pg';
import { Env } from './env';

export const connectToPostgres = async ({
    user,
    password,
}: {
    user: Env['DB_USER'];
    password: Env['DB_PASSWORD'];
}) => {
    const pool = new Pool({
        // postgres://user:password@hostname:port/database
        // postgres = user
        // postgres = password
        // database = hostname du service Docker
        // 5432 = port interne
        // smart-room = nom de la DB que tu as mis dans POSTGRES_DB
        host: 'database',
        port: 5432,
        user,
        password,
        database: 'smart-room',
    });

    // Check database connection, better now than after
    await pool.query('SELECT 1');

    return pool;
};

// export async function query(text: string, params?: any[]) {
//     const start = Date.now();
//     const res = await pool.query(text, params);
//     const duration = Date.now() - start;
//     console.log('executed query', { text, duration, rows: res.rowCount });
//     return res;
// }
//
// export default pool;
