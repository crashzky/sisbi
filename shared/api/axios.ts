import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use((req) => {
	if(req.url.includes('employer') && localStorage && localStorage.getItem('user_type') === 'employer') {
		req.headers = {
			...req.headers,
			'Authorization': localStorage && localStorage.getItem('access_token')
				? 'Bearer ' + localStorage.getItem('access_token')
				: null,
		};
	}
	else if((req.url.includes('user') && localStorage && localStorage.getItem('user_type') === 'user')
		|| req.url.includes('responses') || req.url.includes('chats')) {
		req.headers = {
			...req.headers,
			'Authorization': localStorage && localStorage.getItem('access_token')
				? 'Bearer ' + localStorage.getItem('access_token')
				: null,
		};
	}

	return req;
});

instance.interceptors.response.use(null, (error) => {
	if(error.response.status === 401 && error.request.headers.Authorization)
		localStorage.removeItem('access_token');

	return Promise.reject(error);
});

export default instance;
