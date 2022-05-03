"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../services/db");
function findOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.mariaDB.select('id', 'name', 'display_name', 'img_url')
            .from('gases')
            .where({
            id: id,
            status: 1
        })
            .limit(1);
        return result[0];
    });
}
function findIdByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.mariaDB.select('id', 'name', 'display_name', 'img_url')
            .from('gases')
            .where({
            name: name,
            status: 1
        })
            .limit(1);
        return result[0];
    });
}
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.mariaDB.select('id', 'name', 'display_name', 'img_url')
            .from('gases')
            .where({
            status: 1
        });
        return result;
    });
}
exports.default = { findOne, findAll };
//# sourceMappingURL=gasQuery.js.map