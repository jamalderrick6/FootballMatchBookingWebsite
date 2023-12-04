import axios from 'axios';
const baseURL = 'http://localhost:8000/v1';
// const baseURL = 'https://world-cup-9w7p.onrender.com';

const API = axios.create({
	baseURL,
	headers: {
		// 'Content-Type': 'multipart/form-data',
		'Content-Type': 'application/json',
	},
	transformRequest: [
		function (data, headers) {
			if (data instanceof FormData) {
				headers['Content-Type'] = 'multipart/form-data';
			} else {
				headers['Content-Type'] = 'application/json';
			}
			if (localStorage.getItem('access-token'))
				headers['authorization'] = `Token ${localStorage.getItem('access-token')}`;
			// Do not change data
			if (data instanceof FormData) {
				return data;
			}
			return JSON.stringify(data);
		},
	],
});

export default API;
