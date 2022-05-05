import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use((req) => {
	req.headers = {
		...req.headers,
		'Authorization': localStorage && localStorage.getItem('access_token')
			? 'Bearer ' + localStorage.getItem('access_token')
			: null,
	};

	return req;
});

instance.interceptors.response.use(null, (error) => {
	if(error.response.status === 401)
		localStorage.removeItem('access_token');

	return Promise.reject(error);
});

export default instance;
