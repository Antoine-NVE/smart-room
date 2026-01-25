import express, { type NextFunction, type Request, type Response } from 'express';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './middlewares/cors.js';

export const createHttpApp = ({ allowedOrigins }: { allowedOrigins: string[] }) => {
    const app = express();

    app.use(corsMiddleware({ allowedOrigins }));

    app.use(express.json());
    app.use(cookieParser());

    app.use('/test', (req: Request, res: Response) => {
        res.status(200).send('OK');
    });
    app.all(/.*/, (req: Request, res: Response) => {
        res.status(404).send('Route not found');
    });

    // Error handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        res.json(err);
    });

    return app;
};
