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
exports.parseBCPxml = exports.parseXML = void 0;
const xml2js_1 = __importDefault(require("xml2js"));
function parseXML(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const parser = new xml2js_1.default.Parser();
        const parsed = yield parser.parseStringPromise(text)
            .then((result) => {
            return result;
        });
        return parsed;
    });
}
exports.parseXML = parseXML;
function parseDateTime(text, format, bhuddhist = false) {
    // format require DD MM YY/YYYY HH MM SS  example: 'DD/MM/YYYY   HH:MM:SS'
    // get format position
    const markerPositions = [];
    const keys = ['D', 'M', 'Y', 'h', 'm', 's'];
    let cursor = 0;
    while (keys.length > 0 && cursor < format.length) {
        const target = format[cursor];
        if (keys.includes(target)) {
            // check matched target lenght .. should be 2
            if (target === format[cursor + 1]) {
                // special case for year which could be either 2 or 4 chars
                if (target === 'Y' && format[cursor + 1] === format[cursor + 2] && format[cursor + 2] === format[cursor + 3]) {
                    const position = {
                        marker: format[cursor],
                        start: cursor,
                        end: cursor + 4
                    };
                    markerPositions.push(position);
                    keys.splice(keys.indexOf(target), 1);
                    cursor = cursor + 4;
                    continue;
                }
                // surely it has lenght of 2 chars 
                const position = {
                    marker: format[cursor],
                    start: cursor,
                    end: cursor + 1
                };
                markerPositions.push(position);
                keys.splice(keys.indexOf(target), 1);
                cursor = cursor + 2;
            }
            else {
                // missing or invalid format
                throw new Error('wrong date time format');
            }
        }
        else {
            cursor++;
        }
    }
    const data = [];
    let shift = 0;
    markerPositions.forEach(ele => {
        const value = Number(text.substring(ele.start - shift, ele.end - shift + 1));
        if (isNaN(value)) {
            // digit difference detect
            // Note : Only Day, Month and Hour are allow
            if (['D', 'M', 'H'].includes(ele.marker)) {
                const tmp = Number(text.substring(ele.start - shift, ele.end - shift));
                if (!isNaN(tmp)) {
                    shift = shift + 1;
                    const buffer = { marker: ele.marker, value: tmp };
                    data.push(buffer);
                }
                else {
                    throw new Error('Fail parse datetime');
                }
            }
        }
        else {
            const buffer = { marker: ele.marker, value: value };
            data.push(buffer);
        }
    });
    const getData = (dataArray, marker) => {
        for (let index = 0; index < dataArray.length; index++) {
            const ele = dataArray[index];
            if (ele.marker === marker) {
                return ele.value;
            }
        }
        return -1;
    };
    let year = getData(data, 'Y');
    if (bhuddhist === true) {
        year = year - 543;
    }
    const month = getData(data, 'M') - 1; // js datetime month count from 0
    const day = getData(data, 'D');
    const hour = getData(data, 'h');
    const minute = getData(data, 'm');
    const second = getData(data, 's');
    const dateTime = new Date(year, month, day, hour, minute, second);
    return dateTime;
}
const parseBCPxml = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = yield parseXML(text);
    const dateString = obj.header.update_date[0];
    // date example : '26/4/2565 15:41:06'
    const update_date = parseDateTime(dateString, 'DD/MM/YYYY hh:mm:ss', true);
    const effective_date = new Date(update_date);
    effective_date.setDate(effective_date.getDate() + 1);
    const oilPrices = [];
    const items = obj.header.item;
    items.forEach(element => {
        oilPrices.push({
            name: element.type[0],
            todayPrice: element.today[0],
            tomorrowPrice: element.tomorrow[0]
        });
    });
    return {
        update_date: update_date,
        effective_date: effective_date,
        remark_en: obj.header.remark_en[0],
        remark_th: obj.header.remark_th[0],
        copyright: obj.header.copyright[0],
        oilPrices: oilPrices
    };
});
exports.parseBCPxml = parseBCPxml;
//# sourceMappingURL=parser.js.map