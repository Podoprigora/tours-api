import http from 'http';
import chalk from 'chalk';
import debug from 'debug';

import { config } from './config';
import { app } from './app';

const server = http.createServer(app.handler);
const dlog = debug('app');

server.listen(config.port, config.host, () => {
    dlog(chalk.gray(`[${new Date().toLocaleString()}] Init ${chalk.green('app')} debug logging`));
    dlog('The server is running on', chalk.blue(`http://${config.host}:${config.port}`));

    const routes = app.routes;

    routes.forEach((route) => {
        dlog('Routes configured for', chalk.bold.green(route.displayName));
    });
});

if (process.env.DEBUG) {
    process.on('unhandledRejection', (error) => {
        dlog('Unhandled Rejection:', error);
        process.exit(1);
    });

    process.on('uncaughtException', (error) => {
        dlog('Uncaught Exception:', error);
        process.exit(1);
    });
}

export {};
