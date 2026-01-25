import pino, { type BaseLogger } from 'pino';

export const createBaseLogger = ({ nodeEnv }: { nodeEnv: 'development' | 'production' }): BaseLogger => {
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
