const usersAPI = data =>
	new Promise((resolve, reject) => {
		if (data.length) {
			resolve(data);
		} else {
			reject(new Error('not found'));
		}
	});

export default usersAPI;
