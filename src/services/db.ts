import config from '../configs/envConfig';
import knex from 'knex';

const mariaDB = knex({
	client: 'mysql',
	connection: {
		host: config.MARIA_DB_HOST,
		port: config.MARIA_DB_PORT,
		user: config.MARIA_DB_USER,
		password: config.MARIA_DB_PASSWORD,
		database: config.MARIA_DB_DATABASE
	}
});
export {mariaDB};