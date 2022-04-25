import axios from 'axios';
import useLogin from "../useLogin";

export default (path) => {
    const {GetToken} = useLogin();
    const token = GetToken(path);
    //const url = "https://systemszczepien.azurewebsites.net/"
    const url = "https://vaccinationsystemapi.azurewebsites.net"
    if(token === null)
    {
        return axios.create({
            baseURL: url,
        });
    }
    else
    {
        return axios.create({
            baseURL: url,
            authorization: "Bearer " + token,
        });
    }

}