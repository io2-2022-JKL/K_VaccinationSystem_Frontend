import {useState} from "react";

// react-router-dom components
import {Link} from "react-router-dom";

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

function LogInComponent(props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [sendingData, setSendingData] = useState(false);
    const [fail, setFail] = useState(false);

    const conn = ApiConnection("/signin");
    const {LogIn} = useLogin();

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
                LogIn(r.data.jwt, r.data.userId, r.data.userType);
                props.history.pop();
            }
        }).finally(() => {
            setSendingData(false);
        })
    }

    return (
        <BasicLayout image={bgImage}>
            {
                sendingData ?
                    <Card> Loading </Card> :
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
                                Sign in
                            </MDTypography>
                        </MDBox>
                        <MDBox pt={4} pb={3} px={3}>
                            <MDBox component="form" role="form">
                                <MDBox mb={2}>
                                    <MDInput type="email" label="Email" onChange={e => setLogin(e.target.value)}
                                             fullWidth/>
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="password" label="Password"
                                             onChange={e => setPassword(e.target.value)} fullWidth/>
                                </MDBox>
                                <MDBox mt={4} mb={1}>
                                    <MDButton variant="gradient" color="info" onClick={SubmitLogIn} fullWidth>
                                        sign in
                                    </MDButton>
                                </MDBox>
                                <MDBox mt={3} mb={1} textAlign="center">
                                    <MDTypography variant="button" color="text">
                                        Don&apos;t have an account?{" "}
                                        <MDTypography
                                            component={Link}
                                            to="/authentication/sign-up"
                                            variant="button"
                                            color="info"
                                            fontWeight="medium"
                                            textGradient
                                        >
                                            Sign up
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
