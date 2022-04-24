// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import {TextField} from "@mui/material";
import {useState} from "react";
import ApiConnection from "../logic/api/ApiConnection";
import useLogin from "../logic/useLogin";

function RegisterComponent(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [pesel, setPesel] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [sendingData, setSendingData] = useState(false);


  const conn = ApiConnection("/register");
  const {LogIn} = useLogin();

  const SubmitData = () => {
    setSendingData(true);
    conn.post(
        "/register",
        {
          pesel: pesel,
          mail: email,
          password: password,
          firstName: name,
          lastName: surname,
          dateOfBirth: birthday,
          phoneNumber: phone,
        }).then(r => {
      if (r.status === 200) {
        props.history.push("/signin");
      }
    }).finally(() => {
      setSendingData(false);
    })
  }
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography display="block" variant="button" color="white" my={1}>
            Wprowadź swoje dane aby się zarejestrować
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="PESEL" variant="standard" onChange={e => setPesel(e.target.value)} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Imie" variant="standard" onChange={e => setName(e.target.value)} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Nazwisko" variant="standard" onChange={e => setSurname(e.target.value)} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <TextField
                  id="date"
                  label="Data urodzenia"
                  type="date"
                  defaultValue="2000-05-09"
                  onChange={e => setBirthDay(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" onChange={e => setEmail(e.target.value)} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="phone" label="Numer telefonu" variant="standard" onChange={e => setPhone(e.target.value)} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" onChange={e => setPassword(e.target.value)} fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={SubmitData} fullWidth>
                Zarejestruj
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Masz już konto?{" "}
                <MDTypography
                  component={Link}
                  to="/signin"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Zaloguj się
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default RegisterComponent;
