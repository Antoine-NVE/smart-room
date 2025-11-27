import { createServer } from './presentation/server';
import { loadEnv } from './infrastructure/env';
import { buildContainer } from './infrastructure/container';

const start = () => {
    const env = loadEnv();
    console.log('Environment validated');

    // TODO: connect to DB

    const container = buildContainer();

    const app = createServer(env);
    const server = app.listen(3000);
    server.on('listening', () => {
        console.log('Server started');
    });
    server.on('error', (err: unknown) => {
        console.error('Server startup failed:', err);
        process.exit(1);
    });
};

start();
