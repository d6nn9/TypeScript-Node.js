import { Response, Router } from 'express';
import { ILogger } from '../logger/logger.interface';
import { IRoteController } from './route.interface';

export class ControllerRouter {
	private readonly _router: Router;

	constructor(protected logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<Type>(res: Response, status: number, message: Type): Response {
		res.type('application/json');
		return res.status(status).json(message);
	}

	public ok<Type>(res: Response, message: Type): Response {
		return this.send<Type>(res, 200, message);
	}

	public created(res: Response): void {
		res.sendStatus(201);
	}

	protected bindRout(router: IRoteController[]): void {
		for (const route of router) {
			this.logger.log(`${route.method}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
