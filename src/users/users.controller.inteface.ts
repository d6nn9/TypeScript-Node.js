import { NextFunction, Request, Response } from 'express';
import { ControllerRouter } from '../common/base.controller';

export interface IUsersController extends ControllerRouter {
	login: (req: Request, res: Response, next: NextFunction) => void;

	registration: (req: Request, res: Response, next: NextFunction) => void;

	info: (req: Request, res: Response, next: NextFunction) => void;
}
