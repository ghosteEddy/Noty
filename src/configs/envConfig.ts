import dotenv from 'dotenv';
dotenv.config();

interface ENV {
	MARIA_DB_HOST: string | undefined,
	MARIA_DB_PORT: number | undefined,
	MARIA_DB_USER: string | undefined,
	MARIA_DB_PASSWORD: string | undefined,
	MARIA_DB_DATABASE: string | undefined
}

interface Config {
	MARIA_DB_HOST: string 
	MARIA_DB_PORT: number
	MARIA_DB_USER: string
	MARIA_DB_PASSWORD: string
	MARIA_DB_DATABASE: string 
}

const env : ENV  = {
	MARIA_DB_HOST: process.env.MARIA_DB_HOST,
	MARIA_DB_PORT: process.env.MARIA_DB_PORT ? Number(process.env.MARIA_DB_PORT) : undefined,
	MARIA_DB_USER: process.env.MARIA_DB_USER,
	MARIA_DB_PASSWORD: process.env.MARIA_DB_PASSWORD,
	MARIA_DB_DATABASE: process.env.MARIA_DB_DATABASE
};

const getConfig = (env: ENV): Config => {
	for (const[key, value] of Object.entries(env)){
		if (value === undefined){
			throw new Error (`Config Missing : missing ${key} in .env`);
		}
	}
	return env as Config;
};

const config = getConfig(env);

export default config;