import { NextFunction, Request, Response } from 'express';
import { ControllerRouter } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { IUsersController } from './users.controller.inteface';
import { UserRegisterDto } from './dto/users.register.dto';
import { IUsersService } from './users.service.interface';

export class UsersController extends ControllerRouter implements IUsersController {
	constructor(logger: ILogger, private UsersService: IUsersService) {
		super(logger);
		this.bindRout([
			{ method: 'get', path: '/login', func: this.login },
			{ method: 'post', path: '/registration', func: this.registration },
		]);
	}

	public login(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'You are login');
		this.logger.log('login');
	}

	public async registration(
		req: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		// console.log(req.body pr UserRegisterDto);
		const result = await this.UsersService.createUser(req.body);
		console.log(result);
		this.logger.log('registration');
		this.ok(res, result);
	}
}
