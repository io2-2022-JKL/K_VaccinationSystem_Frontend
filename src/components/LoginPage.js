import {useState} from "react";

// react-router-dom components
import {Link, useNavigate} from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// @mui icons

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import ApiConnection from "../logic/api/ApiConnection";
import useLogin from "../logic/useLogin";

import Loader from "react-loader";

function LogInComponent(props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [sendingData, setSendingData] = useState(false);
    const [fail, setFail] = useState(false);

    const conn = ApiConnection("/signin");
    const {LogIn} = useLogin();
    const navigate = useNavigate();
    const SubmitLogIn = () => {
        setSendingData(true);
        conn.post(
            "/signin",
            {
                mail: login,
                password: password,
            }).then(r => {
            if (r.status !== 200) {
                setFail(true);
            } else {
                LogIn(r.headers.authorization, r.data.userId, r.data.userType.toLowerCase());
                navigate("/" + r.data.userType.toLowerCase())
            }
        }).finally(() => {
            setSendingData(false);
        })
    }

    return (
        <BasicLayout>
            {
                sendingData ?
                    <Loader /> :
                    <Card>
                        <MDBox
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
                            mx={2}
                            mt={-3}
                            p={2}
                            mb={1}
                            textAlign="center"
                        >
                            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                Logowanie
                            </MDTypography>
                        </MDBox>
                        <MDBox pt={4} pb={3} px={3}>
                            <MDBox component="form" role="form">
                                <MDBox mb={2}>
                                    <MDInput type="email" label="Email" onChange={e => setLogin(e.target.value)}
                                             fullWidth/>
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="password" label="Hasło"
                                             onChange={e => setPassword(e.target.value)} fullWidth/>
                                </MDBox>
                                <MDBox mt={4} mb={1}>
                                    <MDButton name="submit" variant="gradient" color="info" onClick={SubmitLogIn} fullWidth>
                                        Zaloguj się
                                    </MDButton>
                                </MDBox>
                                <MDBox mt={3} mb={1} textAlign="center">
                                    <MDTypography variant="button" color="text">
                                        Nie masz konta?{" "}
                                        <MDTypography
                                            component={Link}
                                            to="/register"
                                            variant="button"
                                            color="info"
                                            fontWeight="medium"
                                            textGradient
                                        >
                                            Zarejestruj się
                                        </MDTypography>
                                    </MDTypography>
                                </MDBox>
                            </MDBox>
                        </MDBox>
                    </Card>
            }
        </BasicLayout>
    );
}

export default LogInComponent;
