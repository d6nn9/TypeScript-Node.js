import express, { Express } from 'express';
import { Server } from 'http';
import { UsersController } from './users/users.controller';
import { ExeptionFilters } from './errors/exeption.filters';
import { ILogger } from './logger/logger.interface';
import { json } from 'body-parser';

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
	}

	useMidleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.usersController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilters.catch.bind(this.exeptionFilters));
	}

	public async init(): Promise<void> {
		this.useMidleware();
		this.useRoutes();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log('Server zapushen');
	}
}
