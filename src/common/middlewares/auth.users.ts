import { NextFunction, Request, Response } from 'express';
import { IMiddlelware } from '../middelware.interface';
import { verify } from 'jsonwebtoken';
import { ConfigDotEnv } from '../../config/config';

export class AuthMidlware implements IMiddlelware {
	constructor(private config: ConfigDotEnv) {}
	init(request: Request, response: Response, next: NextFunction): void {
		if (request.headers.authorization) {
			const jwt = request.headers.authorization.split(' ')[1];
			verify(jwt, this.config.get('SECRET_KEY'), (err, payload) => {
				if (err) {
					console.log(err);
					return next();
				}
				request.user = payload as string;
				console.log(payload);
				return next();
			});
		} else {
			next();
		}
	}
}
