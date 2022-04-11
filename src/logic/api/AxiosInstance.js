import axios from 'axios'
import useUserSession from '../composable/useUserSession'

const AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 10000,
    maxBodyLength: 5000,
    maxContentLength: 5000,
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})

AxiosInstance.interceptors.request.use(
    (request) => {
        const userSession = useUserSession()
        request.headers.Authorization = `Bearer ${userSession.token}`
        return request
    },
    (error) => {
        console.log(error.response?.status, error.response?.data)
        throw error
    }
)

const setResponseInterceptors = (axiosInstance) => {
    return axiosInstance.interceptors.response.use(
        ({ data: { data } }) => data,
        (error) => {
            (new ErrorService()).handle(error.response?.status, error.response?.data)
            throw error
        }
    )
}

const responseInterceptor = setResponseInterceptors(AxiosInstance);

export default {
    AxiosInstance,
    responseInterceptor,
    setResponseInterceptors
}
