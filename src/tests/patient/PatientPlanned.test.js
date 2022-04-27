import user  from '@testing-library/user-event';
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";
import React from "react";
import { render, screen, waitFor, unmountComponentAtNode } from "react-dom";
import { Router, BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import { MaterialUIControllerProvider } from "context";
import "babel-polyfill";

import PatientPlanned from "../../components/patient/PatientPlanned"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/patient/"
  })
}));

describe("Patient Planned Testing", () =>{
  let container = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    render(
      <MemoryRouter>
        <MaterialUIControllerProvider>
          <ThemeProvider theme={theme}>
            <PatientPlanned/>
          </ThemeProvider>
        </MaterialUIControllerProvider>
      </MemoryRouter>, 
      container);
  });

  it("renders patient data tags", () => {
    expect(
      container.textContent.toLowerCase()
    ).toContain(
      "pacjent"
    );
  });

  it("renders table fifth column", () => {
    expect(
      container.textContent.toLowerCase()
    ).toContain(
      "data"
    );
  });

  it("renders table fourth column", () => {
    expect(
      container.textContent.toLowerCase()
    ).toContain(
      "ulica"
    );
  });

  it("renders table second column", () => {
    expect(
      container.textContent.toLowerCase()
    ).toContain(
      "centrum szczepień"
    );
  });

  it("renders table first column", () => {
    expect(
      container.textContent.toLowerCase()
    ).toContain(
      "wirus"
    );
  });

  it("renders records on page counter", () => {
    expect(
      container.textContent.toLowerCase()
    ).toContain(
      "rekordów na stronie"
    );
  });
});