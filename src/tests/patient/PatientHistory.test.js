import user  from '@testing-library/user-event';
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";
import React from "react";
import { render, screen, waitFor, unmountComponentAtNode } from "react-dom";
import { Router, BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import { MaterialUIControllerProvider } from "context";
import "babel-polyfill";

import PatientHistory from "../../components/patient/PatientHistory"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/patient/history"
  })
}));

describe("Patient History Testing", () =>{
  let container = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    render(
      <MemoryRouter>
        <MaterialUIControllerProvider>
          <ThemeProvider theme={theme}>
            <PatientHistory/>
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

  it("renders table third column", () => {
    expect(container.textContent.toLowerCase()).toContain("data");
  });

  it("renders table second column", () => {
    expect(container.textContent.toLowerCase()).toContain("wirus");
  });

  it("renders table first column", () => {
    expect(container.textContent.toLowerCase()).toContain("nazwa szczepionki");
  });
});