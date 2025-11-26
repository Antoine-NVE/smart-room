import express, {NextFunction, Request, Response} from 'express';
import {corsMiddleware} from "./middlewares/cors";

export const createServer = () => {
    const app = express();

    app.use(corsMiddleware);

    app.use(express.json());

    app.use('/', (req: Request, res: Response) => {
        res.status(200).send('OK');
    });

    // Error handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(500).json(err)
    })

    return app;
};
