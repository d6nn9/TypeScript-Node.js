import { NextFunction, Request, Response } from 'express';

export interface IRoteController {
	method: 'post' | 'get' | 'put' | 'delete';
	path: string;
	func: (request: Request, response: Response, next: NextFunction) => void;
}
