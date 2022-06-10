import axios from 'axios';
import useLogin from "../useLogin";

export default (path) => {
    const {GetToken} = useLogin();
    const token = GetToken(path);
    //const url = "https://systemszczepien.azurewebsites.net/" //zespół j
    const url = "https://vaccinationsystemteaml.azurewebsites.net" //zespół l
    //const url = `https://vaccinationsystemapi.azurewebsites.net` //nasz
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
            headers:{ authorization: "Bearer " + token,}
        });
    }

}