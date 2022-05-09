import QgasPrice from '../databases/gasPriceQuery';

type TGasPrice = {
	id : number | null,
	gasId: number | null
    name : string | null,
    todayPrice : number | null,
    tomorrowPrice : number | null,
    source: string | null,
	sourceUpdate: Date | null
}

const prototype: TGasPrice = {
	id: null,
	gasId: null,
	name : null,
	todayPrice : null,
	tomorrowPrice : null,
	source: null,
	sourceUpdate: null
};

class GasPrice{
	id: number | null;
	gasId: number | null;
	name : string | null;
	todayPrice : number | null;
	tomorrowPrice : number | null;
	source: string | null;
	sourceUpdate: Date | null;
	constructor (params: TGasPrice = prototype){
		this.id = params.id;
		this.gasId = params.gasId;
		this.name = params.name;
		this.todayPrice = params.todayPrice;
		this.tomorrowPrice = params.tomorrowPrice;
		this.source = params.source;
		this.sourceUpdate = params.sourceUpdate;
	}

	async findAllLatest(){
		const result = await QgasPrice.findDistinctLatest();
		return result;
	}

	async update(): Promise<void>{
		await QgasPrice.save(this);
	}
}

export {TGasPrice, GasPrice};