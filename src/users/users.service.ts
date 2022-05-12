import { UserEntity } from './user.entity';
import { UserRegisterDto } from './dto/users.register.dto';
import { UserLoginDto } from './dto/users.login.dto';
import { IUsersService } from './users.service.interface';
import { hash, compare } from 'bcryptjs';
import { ConfigDotEnv } from '../config/config';
import { Request } from 'express';

import { db } from '../db/db';

export class UsersService implements IUsersService {
	constructor(private config: ConfigDotEnv) {}

	async createUser(req: UserRegisterDto): Promise<UserEntity | null> {
		if (req.password) {
			const password = await hash(req.password, Number(this.config.get('SALT')));
			const user = new UserEntity(password, req.email, req.name);
			const client = await db.connect();
			const result = await client.query(
				`INSERT INTO OurUsers (password, email, name)
                VALUES ($1, $2, $3) RETURNING *`,
				[password, req.email, req.name],
			);
			console.log(result);
			client.release();
			return user;
		}
		return null;
	}

	async loginUser(req: UserLoginDto): Promise<UserEntity | null> {
		if (req.password) {
			const client = await db.connect();
			const { rows } = await client.query(`SELECT * FROM OurUsers WHERE email = $1`, [req.email]);
			client.release();

			if (rows.length == 0) return null;

			const records: UserEntity = rows[0];
			const equalPassword = await compare(req.password, records.password);

			if (!equalPassword) return null;

			const user = new UserEntity(records.password, req.email, records.name);
			return user;
		}
		return null;
	}

	async getInfoUser({ user }: Request): Promise<UserEntity | null> {
		const client = await db.connect();
		console.log('dwdwdiwbdywevfbuewrbfijewrnfurvj////////////////////////////////////');
		const { rows } = await client.query(`SELECT * from ourusers where email = $1 AND name = $2`, [
			user.email,
			user.name,
		]);
		client.release();

		if (rows.length == 0) return null;
		console.log(rows);
		const result = Object.assign({}, rows[0]);
		return result;
	}
}
