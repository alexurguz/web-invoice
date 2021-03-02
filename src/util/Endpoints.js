import React from 'react';
import axios from 'axios';
import Constants from './Constants';

class Endpoints {
	host = Constants.BASE_URL;

	async getCustomerByName(name) {
		console.log('entra', name);
		const data = await axios.get(`${this.host}GetUserByName`, { params: { name } }).then((result) => {
			return result;
		});
		console.log('retorna', data);
		return data;
	}
}

export default new Endpoints();
