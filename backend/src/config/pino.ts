import pino from 'pino';
import type { Env } from './env.js';

export const createLogger = (nodeEnv: Env['nodeEnv']) => {
    const isDev = nodeEnv === 'development';

    return pino({
        level: isDev ? 'debug' : 'info', // Minimum level to show. List: fatal > error > warn > info > debug > trace
        ...(isDev && {
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                },
            },
        }),
    });
};
