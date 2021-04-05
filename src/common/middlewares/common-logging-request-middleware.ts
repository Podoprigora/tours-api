import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import { ResponseError } from '../../lib';

export function commonLoggingRequestMiddleware(debugName: string) {
    const dlog = debug(debugName);

    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        dlog(
            chalk.gray(`[${new Date().toLocaleTimeString()}]`),
            chalk.bold.magentaBright(req.method, req.path)
        );
        dlog(chalk`{gray Request body:} %o`, req.body);
        dlog(chalk`{gray Request params:} %o`, req.params);

        next();
    };
}
