import { NextFunction, Request, Response } from 'express';
import { ControllerRouter } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { IUsersController } from './users.controller.inteface';
import { UserRegisterDto } from './dto/users.register.dto';
import { IUsersService } from './users.service.interface';
import { Validate } from '../common/middlewares/validate.users';
import { sign } from 'jsonwebtoken';
import { ConfigDotEnv } from '../config/config';
import { AuthGuard } from '../common/middlewares/auth.guar';
import { UserEntity } from './user.entity';

export class UsersController extends ControllerRouter implements IUsersController {
	constructor(logger: ILogger, private UsersService: IUsersService, private config: ConfigDotEnv) {
		super(logger);
		this.bindRout([
			{ method: 'post', path: '/login', middleware: [new Validate()], func: this.login },
			{
				method: 'post',
				path: '/registration',
				middleware: [new Validate()],
				func: this.registration,
			},
			{
				method: 'get',
				path: '/info',
				middleware: [new AuthGuard(this.config)],
				func: this.info,
			},
		]);
	}

	public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (req.user) {
			this.ok(res, 'Your alredy login');
			this.logger.log('User alredy login');
			return;
		}
		const result = await this.UsersService.loginUser(req.body);
		if (result) {
			const jwt = await this.setToken(result, this.config.get('SECRET_KEY'));
			this.ok(res, { jwt });
			this.logger.log('login');
			return;
		}
		this.send(res, 401, 'User is not found');
		this.logger.log('login lost');
	}

	public async registration(
		req: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.UsersService.createUser(req.body);
		this.logger.log('registration');
		this.ok(res, result);
	}

	public async info(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.UsersService.getInfoUser(req);
		this.logger.log('registration');
		this.ok(res, result);
	}

	private async setToken(payload: UserEntity, secure: string): Promise<string> {
		return new Promise((response, reject) => {
			sign(
				{
					email: payload.email,
					name: payload.name,
					iat: Math.floor(Date.now() / 1000),
				},
				secure,
				{ expiresIn: '1h' },
				(err, token) => {
					if (err) reject(err);
					console.log(token);
					response(token as string);
				},
			);
		});
	}
}
