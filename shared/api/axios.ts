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
		|| req.url.includes('responses') || req.url.includes('chats') || req.url.includes('messages')
		|| req.url.includes('invites') || req.url.includes('favorite_vacancies') || req.url.includes('vacancies')) {
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
	if(error.response.status === 401 && error.config.headers.Authorization) {
		localStorage.removeItem('access_token');
		localStorage.removeItem('user_type');
	}

	return Promise.reject(error);
});

export default instance;
