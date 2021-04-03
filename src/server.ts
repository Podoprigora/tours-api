import http from 'http';
import chalk from 'chalk';
import debug from 'debug';

import { app } from './app';

const server = http.createServer(app.handler);
const debugLog = debug('app');

server.listen(3005, 'localhost', () => {
    debugLog(
        chalk.gray(`[${new Date().toLocaleString()}] Init ${chalk.green('app')} debug logging`)
    );
    debugLog('The server is running on', chalk.blue('http://localhost:3005'));

    const routes = app.routes;

    routes.forEach((route) => {
        debugLog('Routes configured for', chalk.bold.green(route.displayName));
    });
});

if (process.env.DEBUG) {
    process.on('unhandledRejection', (error) => {
        debugLog('Unhandled Rejection:', error);
        process.exit(1);
    });

    process.on('uncaughtException', (error) => {
        debugLog('Uncaught Exception:', error);
        process.exit(1);
    });
}

export {};
