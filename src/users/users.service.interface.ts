import { UserEntity } from './user.entity';
import { UserRegisterDto } from './dto/users.register.dto';
import { UserLoginDto } from './dto/users.login.dto';

export interface IUsersService {
	createUser: (req: UserRegisterDto) => Promise<UserEntity | null>;
	loginUser: (req: UserLoginDto) => Promise<UserEntity | null>;
}
