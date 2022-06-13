import axios from 'axios';
import useLogin from "../useLogin";

export default (path) => {
    const {GetToken} = useLogin();
    const token = GetToken(path);
const backends = {
        "k": `https://vaccinationsystemapi.azurewebsites.net`,
        "j": "https://systemszczepien.azurewebsites.net/",
        "l": "https://vaccinationsystemteaml.azurewebsites.net"
    }
    // let id = localStorage.getItem("backend");
    // if(id === null)
    //     localStorage.setItem("backend", "");
    // const url = backends[localStorage.getItem("backend")];
    const url = "https://systemszczepien.azurewebsites.net/";
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