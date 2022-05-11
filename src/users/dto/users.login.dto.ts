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

export class UserLoginDto {
	@IsEmail()
	email: string;
	@Length(8, 20)
	password: string;
}
