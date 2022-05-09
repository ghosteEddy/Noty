import {Gas} from '../models/gas';
import { GasPrice } from '../models/gasPrice';
import { Request, Response, NextFunction } from 'express';
import updateBCPGas from '../services/updateBCPGasPrice';

const getAllGas = async (req:Request, res:Response, next:NextFunction) => {
	try{
		const data = await new Gas().findAll();
		res.send(data);
	}
	catch(err){
		next(err);
	}
};

const getAllLatestGasPrice = async (req:Request, res:Response, next:NextFunction) => {
	try{
		const currentData = await new GasPrice().findAllLatest();
		// no data
		if (currentData.length === 0){
			await updateBCPGas.update();
			const newData = await new GasPrice().findAllLatest();
			res.send(newData);
			return;
		}
		for (let index = 0; index < currentData.length; index++) {
			const ele = currentData[index];
			// source data is not up to date
			const today = new Date();
			if(ele.source_update.getDay() !== today.getDay()){
				// prevent spamming
				if(today.getTime() - ele.updated.getTime() <= (10*60000)){
					continue;
				}
				// fetch new data to db then get data
				// TODO CODE HERE
				await updateBCPGas.update();
				const newData = await new GasPrice().findAllLatest();
				res.send(newData);
				return;
			}			
		}
		res.send(currentData);
	}
	catch(err){
		next(err);
	}
};

export default {getAllGas, getAllLatestGasPrice};