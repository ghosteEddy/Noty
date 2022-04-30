import {Request, Response, NextFunction} from 'express';

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
	console.log(err);        
};

export default errorHandler;