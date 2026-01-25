import { createBaseLogger } from './infrastructure/config/pino.js';
import { loadEnv } from './infrastructure/config/env.js';
import { fail, ok } from './core/utils/result.js';
import { connectToPostgres } from './infrastructure/config/postgres.js';
import { createHttpApp } from './presentation/http/app.js';
import { startServer } from './presentation/server.js';
import type { Result } from './core/types/result.js';

const logger = createBaseLogger({
    nodeEnv: process.env.NODE_ENV === 'development' ? 'development' : 'production',
});

const start = async (): Promise<Result<void, Error>> => {
    const envResult = loadEnv();
    if (!envResult.success) return fail(new Error('Failed to load environment', { cause: envResult.error }));
    const { allowedOrigins, nodeEnv, port, postgresUrl } = envResult.data;
    logger.info('Environment loaded');

    const postgresResult = await connectToPostgres({ postgresUrl });
    if (!postgresResult.success)
        return fail(new Error('Failed to connect to Postgres', { cause: postgresResult.error }));
    const { postgresPool } = postgresResult.data;
    logger.info('Postgres connected');

    const app = createHttpApp({
        allowedOrigins,
    });

    const serverResult = await startServer({ app, port });
    if (!serverResult.success) return fail(new Error('Failed to start server', { cause: serverResult.error }));
    logger.info('Server started');

    return ok(undefined);
};

const result = await start();
if (!result.success) {
    logger.fatal({ err: result.error }, result.error.message);
    process.exit(1);
}
