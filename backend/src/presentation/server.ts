import express, {Request, Response} from 'express';

export const createServer = () => {
    const app = express();

    app.use(express.json());

    app.use('/', (req: Request, res: Response) => {
        res.status(200).send('OK');
    });

    return app;
};
