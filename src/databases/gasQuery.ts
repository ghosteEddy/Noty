import {mariaDB} from '../services/db';
import {IGas} from '../models/gas';

async function findOne(id: number): Promise<IGas>{
	const result = await mariaDB.select(
		'id',
		'name',
		'display_name',
		'img_url')
		.from('gases')
		.where({
			id: id,
			status: 1})
		.limit(1);
	return result[0];
}

async function findByName(name: string): Promise<IGas>{
	const result = await mariaDB.select(
		'id',
		'name',
		'display_name',
		'img_url')
		.from('gases')
		.where({
			name: name,
			status: 1})
		.limit(1);
	return result[0];
}

async function findAll(): Promise<IGas[]>{
	const result = await mariaDB.select(
		'id',
		'name',
		'display_name',
		'img_url')
		.from('gases')
		.where({
			status: 1});
	return result;
}

export default {findOne, findAll, findByName};