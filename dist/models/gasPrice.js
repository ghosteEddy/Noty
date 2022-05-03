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
exports.GasPrice = void 0;
const gasPriceQuery_1 = __importDefault(require("../databases/gasPriceQuery"));
const prototype = {
    id: null,
    name: null,
    todayPrice: null,
    tomorrowPrice: null,
    source: null,
    sourceUpdate: null
};
class GasPrice {
    constructor(params = prototype) {
        this.id = params.id;
        this.name = params.name;
        this.todayPrice = params.todayPrice;
        this.tomorrowPrice = params.tomorrowPrice;
        this.source = params.source;
        this.sourceUpdate = params.sourceUpdate;
    }
    findAllLatest() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield gasPriceQuery_1.default.findDistinctLatest();
            return result;
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield gasPriceQuery_1.default.save(this);
        });
    }
}
exports.GasPrice = GasPrice;
//# sourceMappingURL=gasPrice.js.map