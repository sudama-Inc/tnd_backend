'use strict';

import { Sequelize } from 'sequelize';
import { DATABASE, DIALECT } from '../../settings/consts';

let sequelize = null;

const getSequelize = () => {
	if (!sequelize) {
		sequelize = new Sequelize(DATABASE.NAME, DATABASE.USER, DATABASE.PASS, {
			host: DATABASE.HOST,
			dialect: DIALECT
		});
		try {
			sequelize.authenticate();
			return sequelize;
		} catch (error) {
			console.log('Unable to connect to the database:', error);
			throw error;
		}
	}
	return sequelize;
};

getSequelize();

export {
	sequelize,
};
