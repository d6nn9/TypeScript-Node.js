import { App } from './app';
import { ExeptionFilters } from './errors/exeption.filters';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';


function main() {
    const logger = new LoggerService();
    const app = new App(
        logger,
        new UsersController(logger),
        new ExeptionFilters(logger));
    app.init()
}

main()





