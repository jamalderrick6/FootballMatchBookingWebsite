import API from './api.js';

export const fetchUsers = async () => {
	const { data: res } = await API.get('/users');
	return res;
};
export const fetchDeleteUser = async (id) => {
	const { data: res } = await API.delete(`/users/${id}/delete`);
	return res;
};

export const fetchAddStadium = async (stadium) => {
	let data = new FormData();
	data.append('name', stadium.name);
	data.append('description', stadium.description);
	data.append('width', stadium.width);
	data.append('height', stadium.height);
	data.append('image', stadium.image);

	const { data: res } = await API.post('/stadiums', data, {
		'Content-Type': 'application/json',
	});
	return res;
};
export const fetchAddMatch = async (match) => {
	const { data: res } = await API.post('/matches', match);
	return res;
};
export const fetchEditMatch = async (id, match) => {
	const { data: res } = await API.patch(`/matches/${id}`, match);
	return res;
};
export const fetchReservations = async (id) => {
	const { data: res } = await API.get(`/matches/${id}/reservations`);
	return res;
};
