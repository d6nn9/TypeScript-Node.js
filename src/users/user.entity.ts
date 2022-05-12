export class UserEntity {
	city?: string;
	age?: string;
	constructor(
		private _password: string,
		private _email: string,
		private _name: string,
		city?: string,
		age?: string,
	) {
		this.city = city;
		this.age = age;
	}
	get password(): string {
		return this._password;
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}
}
