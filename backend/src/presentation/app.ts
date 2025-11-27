import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { NotFoundError } from '../infrastructure/errors/not-found-error';
import { HttpError } from '../infrastructure/errors/http-error';
import { createCorsMiddleware } from './middlewares/cors';
import { Env } from '../infrastructure/env';

export const createApp = (env: Env) => {
    const app = express();

    app.use(createCorsMiddleware(env.ALLOWED_ORIGINS));

    app.use(express.json());
    app.use(cookieParser());

    app.use('/test', (req: Request, res: Response) => {
        res.status(200).send('OK');
    });
    app.all(/.*/, () => {
        throw new NotFoundError('Route not found');
    });

    // Error handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        const isHttpError = err instanceof HttpError;
        const status = isHttpError ? err.status : 500;

        res.status(status).json(err);
    });

    return app;
};
