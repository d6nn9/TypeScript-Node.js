import { UserEntity } from './user.entity';
import { UserRegisterDto } from './dto/users.register.dto';
import { UserLoginDto } from './dto/users.login.dto';
import { IUsersService } from './users.service.interface';
import { hash } from 'bcryptjs';

export class UsersService implements IUsersService {
	async createUser(req: UserRegisterDto): Promise<UserEntity | null> {
		if (req?.password) {
			const password = await hash(req?.password, 10);
			const user = new UserEntity(password, req?.email, req?.name);
			return user;
		}
		return null;
	}
	async valideateUser(req: UserLoginDto): Promise<boolean> {
		return false;
	}
}
