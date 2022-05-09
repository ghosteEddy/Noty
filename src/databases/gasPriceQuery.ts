import {mariaDB} from '../services/db';
import {GasPrice} from '../models/gasPrice';

async function save(gasPrice: GasPrice){
	const result = await mariaDB('gas_prices')
		.insert({
			gas_id: gasPrice.gasId,
			today_price: gasPrice.todayPrice,
			tomorrow_price: gasPrice.tomorrowPrice,
			source: gasPrice.source,
			source_update: gasPrice.sourceUpdate
		});
	return result;
}

interface ILatestPrice{
    id: number,
    gas_id: number,
    today_price: number,
    tomorrow_price: number,
    source: string,
    source_update: Date,
    updated: Date,
    name: string,
    display_name: string,
    url: string
}

async function updateCheckedDate(PriceId: number){
	const now = new Date();
	const result = await mariaDB('gas_prices')
		.where({ id: PriceId})
		.update({
			updated: now
		});
}

async function findDistinctLatest(): Promise<ILatestPrice[]>{
	const result = await mariaDB.raw('SELECT gp.*, g.name, g.display_name, g.img_url  FROM gas_prices gp JOIN gases g ON gp.gas_id = g.id WHERE gp.id IN (SELECT MAX(id) FROM gas_prices WHERE gas_id IN (SELECT id FROM gases WHERE status = 1) GROUP BY gas_id)');
	return result[0];
}

export default {save, findDistinctLatest, updateCheckedDate};