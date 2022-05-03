import gasQuery from '../databases/gasQuery';

interface IGas {
	id: number | null;
	name: string | null;
	display_name: string | null;
	img_url :string | null;
	// status: boolean;
}

const prototype: IGas = {
	id: null,
	name: null,
	display_name: null,
	img_url : null
};

class Gas {
	id: number | null = null;
	name: string | null = null;
	display_name: string | null = null;
	img_url :string | null = null;
	// status: boolean | null = null;

	constructor(params: IGas = prototype){
		if (params !== prototype){
			this.id = params.id;
			this.name = params.name;
			this.display_name = params.display_name;
			this.img_url = params.img_url;
		}
	}

	async findAll(): Promise<Gas[]>{
		const Qresult = await gasQuery.findAll();
		const result: Gas[] = [];
		for (let index = 0; index < Qresult.length; index++) {
			const buffer: Gas = new Gas(Qresult[index]);
			result.push(buffer);
		}
		return result;
	}
	async findeOne(id: number): Promise<Gas>{
		const result: IGas = await gasQuery.findOne(id);
		this.id = result.id;
		this.name = result.name;
		this.display_name = result.display_name;
		this.img_url = result.img_url;
		return this;
	}
}
new Gas();
export {IGas, Gas};