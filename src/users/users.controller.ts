import { NextFunction, Request, Response } from 'express';
import { ControllerRouter } from '../common/base.controller'
import { ILogger } from '../logger/logger.interface';
import { LoggerService } from '../logger/logger.service'



export class UsersController extends ControllerRouter {

    constructor(logger: ILogger) {
        super(logger);
        this.bindRout([
            { method: 'get', path: '/login', func: this.login },
            { method: 'post', path: '/registration', func: this.registration }
        ])
    }

    public login(req: Request, res: Response, next: NextFunction): void {
        this.ok(res, 'You are login')
        this.logger.log('login')
    }

    public registration(req: Request, res: Response, next: NextFunction): void {
        console.log(req.body)
        this.logger.log('registration')
        this.ok(res, 'register')
    }

}