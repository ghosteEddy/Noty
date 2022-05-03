import {Gas} from '../models/gas';
import { GasPrice } from '../models/gasPrice';
import { Request, Response, NextFunction } from 'express';

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
		const data = await new GasPrice().findAllLatest();
		res.send(data);
	}
	catch(err){
		next(err);
	}
};

export default {getAllGas, getAllLatestGasPrice};