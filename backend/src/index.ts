import { loadEnv } from './config/env.js';
import { connectToPostgres } from './config/postgres.js';
import { startServer } from './app/server.js';
import { createLogger } from './config/pino.js';
import { createApp } from './app/app.js';

const start = async () => {
    const logger = createLogger(process.env.NODE_ENV === 'development' ? 'development' : 'production');

    try {
        const { postgresUrl, port, allowedOrigins } = loadEnv();
        logger.info('Environment loaded');

        const postgres = await connectToPostgres(postgresUrl);
        logger.info('Postgres connected');

        const app = createApp(allowedOrigins, logger);
        await startServer(app, port);
        logger.info('Server started');
    } catch (err: unknown) {
        logger.fatal(err instanceof Error ? err.message : 'Unknown error');
        process.exit(1);
    }
};

await start();
