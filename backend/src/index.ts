import { createServer } from './presentation/server';
import { loadEnv } from './infrastructure/env';
import { buildContainer } from './infrastructure/container';
import { createLogger } from './infrastructure/logger';
import { Logger } from 'pino';

const start = async () => {
    const logger = createLogger(
        process.env.NODE_ENV === 'development' ? 'development' : 'production',
    );

    const env = await step('Environment validation', logger, async () => {
        const env = loadEnv();
        logger.info('Environment validated');
        return env;
    });

    // TODO: connect to DB

    const container = await step('Container build', logger, async () => {
        const container = buildContainer();
        logger.info('Container built');
        return container;
    });

    const app = createServer(env);
    const server = app.listen(3000);
    server.on('listening', () => {
        logger.info('Server started');
    });
    server.on('error', (err: unknown) => {
        exit(logger, 'Server startup', err);
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
        return exit(logger, name, err);
    }
};

const exit = (logger: Logger, stepName: string, err: unknown) => {
    logger.fatal({ err }, `${stepName} failed`);
    process.exit(1);
};

start().then();
