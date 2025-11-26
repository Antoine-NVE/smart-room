import {createServer} from "./presentation/server";

const start = () => {
    const app = createServer();
    const server = app.listen(3000);
    server.on('listening', () => {
        console.log('Server started')
    });
    server.on('error', (err: unknown) => {
        console.error('Server startup failed:', err)
        process.exit(1);
    });
}

start();
