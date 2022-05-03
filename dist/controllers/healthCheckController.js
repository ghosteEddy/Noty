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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcpOilPriceCheck = exports.healthCheck = void 0;
const superagent_1 = __importDefault(require("superagent"));
const parser_1 = require("../utils/parser");
const gas_1 = require("../models/gas");
const healthCheck = (req, res) => {
    res.send('Site Available');
};
exports.healthCheck = healthCheck;
const bcpOilPriceCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlData = yield superagent_1.default.get('https://www.bangchak.co.th/api/oilprice');
    const data = yield (0, parser_1.parseBCPxml)(xmlData.text);
    const allGas = yield new gas_1.Gas().findAll();
    res.send(data);
});
exports.bcpOilPriceCheck = bcpOilPriceCheck;
//# sourceMappingURL=healthCheckController.js.map