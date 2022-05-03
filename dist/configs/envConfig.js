"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = {
    MARIA_DB_HOST: process.env.MARIA_DB_HOST,
    MARIA_DB_PORT: process.env.MARIA_DB_PORT ? Number(process.env.MARIA_DB_PORT) : undefined,
    MARIA_DB_USER: process.env.MARIA_DB_USER,
    MARIA_DB_PASSWORD: process.env.MARIA_DB_PASSWORD,
    MARIA_DB_DATABASE: process.env.MARIA_DB_DATABASE
};
const getConfig = (env) => {
    for (const [key, value] of Object.entries(env)) {
        if (value === undefined) {
            throw new Error(`Config Missing : missing ${key} in .env`);
        }
    }
    return env;
};
const config = getConfig(env);
exports.default = config;
//# sourceMappingURL=envConfig.js.map