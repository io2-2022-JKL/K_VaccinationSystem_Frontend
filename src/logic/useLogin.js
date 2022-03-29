const useLogin = () => {

    const LoginRules = [
        {rule: /patient/, token:"patientToken"},
        {rule: /patient/, token:"doctorToken"},
        {rule: /doctor/, token:"doctorToken"},
        {rule: /admin/, token:"adminToken"}
    ]

    const isLoggedIn = (targetPath) => {
        for (let rule in LoginRules)
            if (rule.rule.match(targetPath) && localStorage.getItem(rule.token))
                return localStorage.getItem(rule.token);
        return null;
    }

    const LogIn = (token, role) => {
        localStorage.setItem(role + "Token", token);
    }

    const LogOut = () => {
        localStorage.clear();
    }
}

export default useLogin();