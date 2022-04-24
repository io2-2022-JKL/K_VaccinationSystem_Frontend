import axios from 'axios';
import useLogin from "../useLogin";

export default (path) => {
    const {GetToken} = useLogin();
    const token = GetToken(path);

    if(token === null)
    {
        return axios.create({
            baseURL: `https://vaccinationsystemapi.azurewebsites.net`,
        });
    }
    else
    {
        return axios.create({
            baseURL: `https://vaccinationsystemapi.azurewebsites.net`,
            authorization: "Bearer " + token,
        });
    }

}