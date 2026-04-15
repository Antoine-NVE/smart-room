import { Pool } from 'pg';
import type { Result } from '../../core/types/result.js';
import { fail, ok } from '../../core/utils/result.js';

export const connectToPostgres = async ({
    postgresUrl,
}: {
    postgresUrl: string;
}): Promise<Result<{ postgresPool: Pool }, unknown>> => {
    const postgresPool = new Pool({ connectionString: postgresUrl });

    try {
        // Check database connection, better now than after
        await postgresPool.query('SELECT 1');

        return ok({ postgresPool });
    } catch (err: unknown) {
        return fail(err);
    }
};
