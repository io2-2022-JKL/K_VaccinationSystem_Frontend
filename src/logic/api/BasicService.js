import AxiosInstanceData from './AxiosInstance'

export default class BasicService {
    axios = AxiosInstanceData.AxiosInstance
    axiosResponseInterceptor = AxiosInstanceData.responseInterceptor;
}