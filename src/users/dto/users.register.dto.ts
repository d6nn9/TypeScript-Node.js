import {
	validate,
	validateOrReject,
	Contains,
	IsInt,
	IsEmail,
	Length,
	IsDate,
	Min,
	Max,
} from 'class-validator';

export class UserRegisterDto {
	@IsEmail()
	email: string;
	@Length(4, 20)
	name: string;
	@Length(8, 20)
	password: string;
}
