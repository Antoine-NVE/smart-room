import { Pool } from 'pg'

const pool = new Pool({
  connectionString: 'postgres://postgres:postgres@database:5432/smart-room',
  // postgres://user:password@hostname:port/database
  // postgres = user
  // postgres = password
  // database = hostname du service Docker
  // 5432 = port interne
  // smart-room = nom de la DB que tu as mis dans POSTGRES_DB
})

export async function query(text: string, params?: any[]) {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log('executed query', { text, duration, rows: res.rowCount })
  return res
}

export default pool
