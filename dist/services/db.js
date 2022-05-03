"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mariaDB = void 0;
const envConfig_1 = __importDefault(require("../configs/envConfig"));
const knex_1 = __importDefault(require("knex"));
const mariaDB = (0, knex_1.default)({
    client: 'mysql',
    connection: {
        host: envConfig_1.default.MARIA_DB_HOST,
        port: envConfig_1.default.MARIA_DB_PORT,
        user: envConfig_1.default.MARIA_DB_USER,
        password: envConfig_1.default.MARIA_DB_PASSWORD,
        database: envConfig_1.default.MARIA_DB_DATABASE
    }
});
exports.mariaDB = mariaDB;
//# sourceMappingURL=db.js.map