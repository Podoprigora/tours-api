import http from 'http';
import chalk from 'chalk';
import debug from 'debug';

import { app } from './app';

const server = http.createServer(app.handler);
const debugLog = debug('app');

if (process.env.DEBUG) {
    process.on('unhandledRejection', (error: Error) => {
        debugLog('Unhandled Rejection:', error);
        process.exit(1);
    });

    process.on('uncaughtException', (error: Error) => {
        debugLog('Uncaught Exception:', error);
        process.exit(1);
    });
}

server.listen(3005, 'localhost', () => {
    debugLog(chalk`{gray [${new Date().toLocaleString()}] debug log}`);
    debugLog('The server is running on', chalk.blue('http://localhost:3005'));

    const routes = app.routes;

    routes.forEach((route) => {
        debugLog('Routes configured for', chalk.bold.greenBright(route.displayName));
    });
});

export {};
