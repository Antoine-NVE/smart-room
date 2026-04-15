import type { Express } from 'express';
import type { Env } from '../config/env.js';

export const startServer = (app: Express, port: Env['port']) => {
    return new Promise((resolve, reject) => {
        const server = app.listen(port);

        server.on('listening', () => {
            resolve(server);
        });

        server.on('error', (err: unknown) => {
            reject(err);
        });
    });
};
