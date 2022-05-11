import { ILogger } from '../logger/logger.interface';

import { config, DotenvParseOutput } from 'dotenv';

export class ConfigDotEnv {
	private config: DotenvParseOutput;
	constructor(private Logger: ILogger) {
		console.log('HELLO DOTENV');
		const result = config();
		if (result.error) {
			Logger.err(result.error);
			return;
		}
		if (result.parsed) {
			this.config = result.parsed;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
