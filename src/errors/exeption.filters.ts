import { NextFunction, Request, Response } from "express";
import { ILogger } from "../logger/logger.interface";
import { LoggerService } from "../logger/logger.service";
import { IExeptionFilters } from "./exeption.filters.interfacets";
import { HTTPError } from "./http-error.class";

export class ExeptionFilters implements IExeptionFilters {
    logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger
    }

    catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction):void {
        if (err instanceof HTTPError) {
            this.logger.err(`[${err.context}] Ошибка:${err.statusCode} : ${err.message}`)
            res.status(err.statusCode).send({ error: err.message })
        } else {
            this.logger.err(`${err.message}`)
            res.status(500).send({ error: err.message })
        }
    }
}  