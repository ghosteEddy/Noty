import agent from 'superagent';
import {parseBCPxml} from '../utils/parser';

async function main(){
	const xmlData : agent.Response = await agent.get('https://www.bangchak.co.th/api/oilprice');
	const data = await parseBCPxml(xmlData.text);
    
}
