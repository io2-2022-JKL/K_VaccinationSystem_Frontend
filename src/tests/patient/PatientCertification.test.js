import user  from '@testing-library/user-event';
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";
import React from "react";
import { render, screen, waitFor, unmountComponentAtNode } from "react-dom";
import { Router, BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import { MaterialUIControllerProvider } from "context";
import "babel-polyfill";

import PatientCertifications from "../../components/patient/PatientCertifications"

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useLocation: () => ({
//     pathname: "localhost:3000/patient/certifications"
//   })
// }));

describe("Patient Certification Testing", () =>{
  let container = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    render(
      <MemoryRouter>
        <MaterialUIControllerProvider>
          <ThemeProvider theme={theme}>
            <PatientCertifications/>
          </ThemeProvider>
        </MaterialUIControllerProvider>
      </MemoryRouter>, 
      container);
  });

  it("renders number of records text", () => {
    expect(container.textContent.toLowerCase()).toContain("rekordów na stronie");
  });

  it("renders patient data", () => {
    expect(container.textContent.toLowerCase()).toContain("pacjent");
  });

  it("renders table first column", () => {
    expect(container.textContent.toLowerCase()).toContain("szczepionka");
  });

  it("renders table second column", () => {
    expect(container.textContent.toLowerCase()).toContain("od");
  });

  it("renders table third column", () => {
    expect(container.textContent.toLowerCase()).toContain("do");
  });

  it("renders button in table", () => {
    expect(container.textContent.toLowerCase()).toContain("pobierz");
  });
});