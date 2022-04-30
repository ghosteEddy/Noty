import { Request, Response } from 'express';
import agent from 'superagent';
import {parseBCPxml} from '../utils/parser';

const healthCheck = (req: Request, res:Response) => {
	res.send('Site Available');
};

const bcpOilPriceCheck = async (req:Request, res:Response) => {
	const xmlData : agent.Response = await agent.get('https://www.bangchak.co.th/api/oilprice');
	const data = await parseBCPxml(xmlData.text);
	res.send(data);
};
	
export {healthCheck, bcpOilPriceCheck};