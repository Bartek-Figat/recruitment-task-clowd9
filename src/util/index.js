import data from '../db/mock.json';

const fetchAPI = new Promise((resolve, reject) => {
	if (data.length) {
		resolve(data);
	} else {
		reject(new Error('not found'));
	}
});

export default fetchAPI;
