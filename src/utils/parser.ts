import xml2js from 'xml2js';
import {oilPrice} from '../models/oilPrice';

async function parseXML(text :string){
	const parser = new xml2js.Parser();
	const parsed = await parser.parseStringPromise(text)
		.then((result) => {
			return result;
		});	
	return parsed;
}

type stringMarkupPosition ={
	marker: string,
	start: number,
	end: number
}

function parseDateTime(text :string, format :string, bhuddhist = false): Date{
	// format require DD MM YY/YYYY HH MM SS  example: 'DD/MM/YYYY   HH:MM:SS'
	// get format position
	const markerPositions: stringMarkupPosition[] = [];
	const keys: string[] = ['D', 'M', 'Y', 'h', 'm', 's'];
	let cursor = 0;
	while (keys.length > 0 && cursor < format.length){
		const target = format[cursor];
		if (keys.includes(target)){
			// check matched target lenght .. should be 2
			if (target === format[cursor + 1]){
				// special case for year which could be either 2 or 4 chars
				if (target === 'Y' && format[cursor + 1] === format[cursor + 2] && format[cursor + 2] === format[cursor + 3]){
					const position: stringMarkupPosition = {
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
				const position: stringMarkupPosition = {
					marker: format[cursor],
					start: cursor,
					end: cursor + 1
				};
				markerPositions.push(position);
				keys.splice(keys.indexOf(target), 1);
				cursor = cursor + 2;
			} else {
				// missing or invalid format
				throw new Error('wrong date time format');
			}
		} else{
			cursor++;
		}
	}

	type dateTimeData = {
		marker : string,
		value: number
	}
	const data: dateTimeData[] = [];
	let shift = 0;
	markerPositions.forEach(ele => {
		const value = Number(text.substring(ele.start - shift, ele.end - shift + 1));
		if (isNaN(value)){
			// digit difference detect
			// Note : Only Day, Month and Hour are allow
			if (['D', 'M', 'H'].includes(ele.marker)){
				const tmp = Number(text.substring(ele.start - shift, ele.end - shift));
				if (!isNaN(tmp)){
					shift = shift + 1;
					const buffer = {marker: ele.marker, value: tmp};
					data.push(buffer);
				} else {
					throw new Error('Fail parse datetime');
				}
			}
		} else {
			const buffer = {marker: ele.marker, value: value};
			data.push(buffer);
		}
	});

	const getData = (dataArray: dateTimeData[], marker: string): number => {
		for (let index = 0; index < dataArray.length; index++) {
			const ele = dataArray[index];
			if(ele.marker === marker)
			{return ele.value;}
			
		}
		return -1;
	};

	let year = getData(data, 'Y');
	if (bhuddhist === true){
		year = year - 543;
	}
	const month = getData(data, 'M') - 1; // js datetime month count from 0
	const day = getData(data, 'D');
	const hour = getData(data, 'h');
	const minute = getData(data, 'm');
	const second = getData(data, 's');
	const dateTime: Date = new Date(year, month, day, hour, minute, second);
	return dateTime;
}

const parseBCPxml = async (text :string) =>{
	const obj = await parseXML(text);

	const dateString: string = obj.header.update_date[0];
	// date example : '26/4/2565 15:41:06'
	const update_date = parseDateTime(dateString, 'DD/MM/YYYY hh:mm:ss', true);
	const effective_date = new Date(update_date);
	effective_date.setDate(effective_date.getDate() + 1);

	const oilPrices: oilPrice[] = [];
	const items = obj.header.item;
	items.forEach(element => {
		oilPrices.push({
			name: element.type[0],
			todayPrice: element.today[0],
			tomorrowPrice: element.tomorrow[0]
		});
	});
	return {
		update_date : update_date,
		effective_date: effective_date,
		remark_en: obj.header.remark_en[0],
		remark_th: obj.header.remark_th[0],
		copyright: obj.header.copyright[0],
		oilPrices : oilPrices
	};
};

export {parseXML, parseBCPxml};