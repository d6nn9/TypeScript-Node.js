import { Pool } from 'pg';

const db = new Pool({
	user: 'dbuser',
	host: 'localhost',
	database: 'mydb',
	password: 'secretpassword',
	port: 5432,
});

export { db };
