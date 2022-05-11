import { IMiddlelware } from '../middelware.interface';
import { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { UserRegisterDto } from '../../users/dto/users.register.dto';
import { validate } from 'class-validator';
import { HTTPError } from '../../errors/http-error.class';
import { UserLoginDto } from '../../users/dto/users.login.dto';

export class Validate implements IMiddlelware {
	init({ body }: Request, response: Response, next: NextFunction): void {
		let reqForValid: UserRegisterDto | UserLoginDto;
		if (body.name) {
			reqForValid = plainToClass(UserRegisterDto, body);
		} else {
			reqForValid = plainToClass(UserLoginDto, body);
		}
		console.log({ reqForValid });
		const reg = new UserRegisterDto();
		validate(reqForValid, { validationError: { target: false } }).then((errors) => {
			if (errors.length > 0) {
				const container: string[] = [];
				for (const err of errors) {
					if (err.constraints) {
						const key: string[] = Object.keys(err.constraints);
						const mkey: string = key.join('');
						container.push(err.constraints[mkey]);
					} else {
						container.push('Заглушка');
					}
				}
				const message = container.join(', ');
				next(new HTTPError(400, message));
			} else {
				console.log('validation succeed');
				next();
			}
		});
	}
}
