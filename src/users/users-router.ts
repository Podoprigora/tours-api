import express from 'express';

import { AbstractRouter } from '../lib/abstract';

export class UsersRouter extends AbstractRouter<express.Application> {
    constructor(app: express.Application) {
        super(app, 'UsersRouter');
    }

    configureRoutes() {
        const usersRoute = this.app.route('/api/v1/users');

        usersRoute
            .get((req, res) => {
                res.status(200).send('All users');
            })
            .post((req, res) => {
                res.status(200).send('Post to users');
            });

        const userByIdRoute = this.app.route('/api/v1/users/:userId');

        userByIdRoute
            .get((req, res) => {
                res.status(200).send(`GET requested for id: ${req.params.userId}`);
            })
            .patch((req, res) => {
                res.status(200).send(`PATCH requested for id: ${req.params.userId}`);
            })
            .delete((req, res) => {
                res.status(200).send(`DELETE requested for id: ${req.params.userId}`);
            });
    }
}
