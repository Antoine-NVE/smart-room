import type { Express } from 'express';
import { Server } from 'node:http';
import type { Result } from '../core/types/result.js';
import { fail, ok } from '../core/utils/result.js';

export const startServer = ({
    app,
    port,
}: {
    app: Express;
    port: number;
}): Promise<Result<{ server: Server }, unknown>> => {
    return new Promise((resolve) => {
        const server = app.listen(port);

        server.on('listening', () => {
            resolve(ok({ server }));
        });

        server.on('error', (err: unknown) => {
            resolve(fail(err));
        });
    });
};
