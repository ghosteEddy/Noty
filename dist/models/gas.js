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
exports.Gas = void 0;
const gasQuery_1 = __importDefault(require("../databases/gasQuery"));
const prototype = {
    id: null,
    name: null,
    display_name: null,
    img_url: null
};
class Gas {
    // status: boolean | null = null;
    constructor(params = prototype) {
        this.id = null;
        this.name = null;
        this.display_name = null;
        this.img_url = null;
        if (params !== prototype) {
            this.id = params.id;
            this.name = params.name;
            this.display_name = params.display_name;
            this.img_url = params.img_url;
        }
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const Qresult = yield gasQuery_1.default.findAll();
            const result = [];
            for (let index = 0; index < Qresult.length; index++) {
                const buffer = new Gas(Qresult[index]);
                result.push(buffer);
            }
            return result;
        });
    }
    findeOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield gasQuery_1.default.findOne(id);
            this.id = result.id;
            this.name = result.name;
            this.display_name = result.display_name;
            this.img_url = result.img_url;
            return this;
        });
    }
}
exports.Gas = Gas;
new Gas();
//# sourceMappingURL=gas.js.map