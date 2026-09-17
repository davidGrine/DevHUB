import axios from 'axios'


export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
})

api.interceptors.request.use(
	config => {
		const accessToken = localStorage.getItem('accessToken')

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)