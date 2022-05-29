const useLogin = () => {

    const LoginRules = [
        {rule: /patient/, token:"patientToken"},
        {rule: /patient/, token:"doctorToken"},
        {rule: /doctor/, token:"doctorToken"},
        {rule: /admin/, token:"adminToken"}
    ]

    const isLoggedIn = (targetPath) => {
        for (let i = 0; i < LoginRules.length; i++)
        {
            if (targetPath.match(LoginRules[i].rule) && localStorage.getItem(LoginRules[i].token))
                return localStorage.getItem(LoginRules[i].token);
        }
        return null;
    }

    const LogIn = (token, id, role) => {
        console.log(token, role);
        localStorage.setItem(role + "Token", token);
        localStorage.setItem("id", id);
    }

    const GetId = () => {
        return localStorage.getItem("id");
    }

    const LogOut = () => {
        localStorage.clear();
    }

    const GetToken = (APIPath) => {
        for (let i = 0; i < LoginRules.length; i++)
        {
            if (APIPath.match(LoginRules[i].rule) && localStorage.getItem(LoginRules[i].token))
            {
                console.log(localStorage.getItem(LoginRules[i].token))
                return localStorage.getItem(LoginRules[i].token);
            }

        }
        return null;
    }

    const isAnyoneLogged = () => {
        const rolesList = ["patient", "doctor", "admin"]
        for(let role in rolesList)
        {
            if (localStorage.getItem(role + "Token"))
            {
                return true;
            }
        }
        return false;
    }

    return {isLoggedIn, LogIn, LogOut, GetToken, GetId, isAnyoneLogged};
}

export default useLogin;