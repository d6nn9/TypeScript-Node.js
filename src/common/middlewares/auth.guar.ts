import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { ConfigDotEnv } from '../../config/config';
import { IMiddlelware } from '../middelware.interface';

export class AuthGuard implements IMiddlelware {
	constructor(private config: ConfigDotEnv) {}
	init(request: Request, response: Response, next: NextFunction): void {
		if (request.headers.user) {
			const jwt = request.headers.user as string;
			console.log(1);
			console.log(jwt);
			verify(jwt, this.config.get('SECRET_KEY'), (err, payload) => {
				if (err) {
					response.status(401).send({ error: 'You are not login' });
				}
				request.user = payload;
				console.log(payload);
				return next();
			});
		} else {
			response.status(401).send({ error: 'You are not login' });
		}
	}
}
