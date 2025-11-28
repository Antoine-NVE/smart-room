import { createApp } from './presentation/app';
import { loadEnv } from './infrastructure/env';
import { buildContainer } from './infrastructure/container';
import { createLogger } from './infrastructure/logger';
import { Logger } from 'pino';
import { connectToPostgres } from './infrastructure/postgres';

const start = async () => {
    const logger = createLogger(
        process.env.NODE_ENV === 'development' ? 'development' : 'production',
    );

    const env = await step('Environment validation', logger, async () => {
        const env = loadEnv();
        logger.info('Environment validated');
        return env;
    });

    const postgresPool = await step('Postgres connection', logger, async () => {
        const pool = await connectToPostgres({
            user: env.DB_USER,
            password: env.DB_PASSWORD,
        });
        logger.info('Postgres connected');
        return pool;
    });

    const container = buildContainer();

    const app = createApp({
        allowedOrigins: env.ALLOWED_ORIGINS,
        nodeEnv: env.NODE_ENV,
    });
    const server = app.listen(3000);
    server.on('listening', () => {
        logger.info('Server started');
    });
    server.on('error', (err: unknown) => {
        stop(logger, 'Server startup', err);
    });
};

const step = async <T>(
    name: string,
    logger: Logger,
    fn: () => Promise<T>,
): Promise<T> => {
    try {
        return await fn();
    } catch (err) {
        return stop(logger, name, err);
    }
};

const stop = (logger: Logger, stepName: string, err: unknown) => {
    logger.fatal({ err }, `${stepName} failed`);
    process.exit(1);
};

start().then();
