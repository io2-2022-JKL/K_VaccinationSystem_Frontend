// @mui icons
import LogInComponent from "./components/LoginPage";
import RegisterComponent from "./components/RegisterComponent";

const routes = [
    {
        name: "Zaloguj",
        key: "logIn",
        route: "/login",
        component: <LogInComponent />,
    },
    {
        name: "Zarejestruj",
        key: "register",
        route: "/register",
        component: <RegisterComponent />,
    },

];

export default routes;
