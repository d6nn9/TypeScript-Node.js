import { NextFunction, Request, Response, Router } from 'express';
import { IMiddlelware } from './middelware.interface';

export interface IRoteController {
	method: keyof Pick<Router, 'post' | 'get' | 'put' | 'delete'>;
	path: string;
	middleware?: IMiddlelware[];
	func: (request: Request, response: Response, next: NextFunction) => void;
}
