import 'reflect-metadata';
import { App } from './app';
import { ConfigDotEnv } from './config/config';
import { ExeptionFilters } from './errors/exeption.filters';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

function main(): void {
	const logger = new LoggerService();
	const config = new ConfigDotEnv(logger);
	const app = new App(
		logger,
		new UsersController(logger, new UsersService(config), config),
		new ExeptionFilters(logger),
		config,
	);
	app.init();
}

main();
