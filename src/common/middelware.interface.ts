import { NextFunction, Request, Response } from 'express';

export interface IMiddlelware {
	init: (request: Request, response: Response, next: NextFunction) => void;
}
