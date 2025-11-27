import { createServer } from './presentation/server';
import { loadEnv } from './infrastructure/env';

const start = () => {
    const env = loadEnv();
    console.log('Environment validated');

    const app = createServer();
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
