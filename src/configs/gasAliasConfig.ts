type gasAliasMap = {
    DIESEL_PRIMIUM_B7 : string | null,
    DIESEL_B7: string | null,
    DIESEL_B10 : string | null,
    DIESEL_B20 : string | null,
    BENZENE_GAS_E85 : string | null,
    BENZENE_GAS_E20 : string | null,
    BENZENE_GAS_91: string | null,
    BENZENE_GAS_95: string | null
}

const bcpGasAlias: gasAliasMap = {
	DIESEL_PRIMIUM_B7 : 'Hi Premium Diesel S B7',
	DIESEL_B7: 'Diesel S B7',
	DIESEL_B10 : 'HI DIESEL S',
	DIESEL_B20 : 'HI DIESEL B20 S',
	BENZENE_GAS_E85 : 'Gasohol E85 S EVO',
	BENZENE_GAS_E20 : 'Gasohol E20 S EVO',
	BENZENE_GAS_91: 'Gasohol 91 S EVO',
	BENZENE_GAS_95: 'Gasohol 95 S EVO'

};

export {bcpGasAlias};