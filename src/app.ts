import express, { Express } from "express";
import { Server } from "http"
import { UsersController } from './users/users.controller'
import { ExeptionFilters } from './errors/exeption.filters'
import { ILogger } from "./logger/logger.interface";


export class App {
    app: Express;
    server: Server;
    port: number;
    logger: ILogger;
    usersController: UsersController;
    exeptionFilters: ExeptionFilters;

    constructor(logger: ILogger, usersController: UsersController, exeptionFilters: ExeptionFilters) {

        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.usersController = usersController;
        this.exeptionFilters = exeptionFilters;

    };

    useRoutes() {
        this.app.use('/users', this.usersController.router);
    }

    useExeptionFilters() {
        this.app.use(this.exeptionFilters.catch.bind(this.exeptionFilters))
    }

    public async init() {
        this.useRoutes()
        this.useExeptionFilters()
        this.server = this.app.listen(this.port)
        this.logger.log('Server zapushen')

    }

}
