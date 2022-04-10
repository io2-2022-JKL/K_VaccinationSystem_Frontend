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

    const LogIn = (token, role) => {
        console.log(token, role);
        localStorage.setItem(role + "Token", token);
    }

    const LogOut = () => {
        localStorage.clear();
    }

    return {isLoggedIn, LogIn, LogOut};
}

export default useLogin;