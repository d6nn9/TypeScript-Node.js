export class UserEntity {
	constructor(private _password: string, private _email: string, private _name: string) {}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}
}
