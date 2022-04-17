import { App } from './app';
import { ExeptionFilters } from './errors/exeption.filters';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

function main(): void {
	const logger = new LoggerService();
	const app = new App(
		logger,
		new UsersController(logger, new UsersService()),
		new ExeptionFilters(logger),
	);
	app.init();
}

main();
