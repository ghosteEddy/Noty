import agent from 'superagent';
import {parseBCPxml} from '../utils/parser';
import QgasPrice from '../databases/gasPriceQuery';
import {bcpGasAlias} from '../configs/gasAliasConfig';
import Qgas from '../databases/gasQuery';

function getGasFromAlias(alias: string){
	const result = Object.keys(bcpGasAlias).find(key => bcpGasAlias[key] === alias);
	if (result !== undefined){
		return result;
	} else {
		throw new Error('No match gas alias check xml and config');
	}
}

async function update(){
	const xmlData : agent.Response = await agent.get('https://www.bangchak.co.th/api/oilprice');
	const newData = await parseBCPxml(xmlData.text);
	const newDataDate: Date = newData.update_date;

	// compare new data to current data in database
	const currentData =  await QgasPrice.findDistinctLatest();
	for (let i1 = 0; i1 < newData.gasPrices.length; i1++) {
		const newPrice = newData.gasPrices[i1];
		let isUpdated = false;
		for (let i2 = 0; i2 < currentData.length; i2++) {
			const currentPrice = currentData[i2];

			// find matching pair
			if (getGasFromAlias(String(newPrice.name)) === currentPrice.name){
				// check if new data is new one
				if (currentPrice.source_update.getTime() !== newDataDate.getTime()){
					newPrice.gasId = currentPrice.gas_id;
					await newPrice.update();
					isUpdated = true;
					break;
				} 
				else {
					// update the last updated time only
					await QgasPrice.updateCheckedDate(currentPrice.id);
					isUpdated = true;
					break;
				}
			}
		}
		// no match , possibly new type
		if (!isUpdated && getGasFromAlias(String(newPrice.name))){
			const gas = await Qgas.findByName(getGasFromAlias(String(newPrice.name)));
			newPrice.gasId = gas.id;
			await newPrice.update();
		}
	}
}

export default {update};