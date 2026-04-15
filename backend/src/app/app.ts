import express, { type NextFunction, type Request, type Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import type { Env } from '../config/env.js';
import type { Logger } from 'pino';

export const createApp = (allowedOrigins: Env['allowedOrigins'], logger: Logger) => {
    const app = express();

    app.use(
        cors({
            origin: allowedOrigins,
            credentials: true,
        }),
    );

    app.use(express.json());
    app.use(cookieParser());

    app.use('/test', (req: Request, res: Response) => {
        res.status(200).send('OK');
    });
    app.all(/.*/, (req: Request, res: Response) => {
        res.status(404).send('Route not found');
    });

    // Error handler
    app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
        logger.error(err instanceof Error ? err.message : 'Unknown error');

        res.status(500).json({ success: false, message: 'Internal server error' });
    });

    return app;
};
