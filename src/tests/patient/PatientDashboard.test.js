import user  from '@testing-library/user-event';
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";
import React from "react";
import { render, screen, waitFor, unmountComponentAtNode } from "react-dom";
import { Router, BrowserRouter, MemoryRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import { MaterialUIControllerProvider } from "context";
import "babel-polyfill";

import PatientDashboard from "../../components/patient/PatientDashboard"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/patient/"
  })
}));

describe("PatientDashboardTesting", () =>{
  let container = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    render(
      <MemoryRouter>
        <MaterialUIControllerProvider>
          <ThemeProvider theme={theme}>
            <PatientDashboard/>
          </ThemeProvider>
        </MaterialUIControllerProvider>
      </MemoryRouter>, 
      container);
  });

  it("renders patient data tags", () => {
    expect(
      container.textContent.toLowerCase()
    ).toContain(
      "informacje o pacjencie"
    );
  });

  it("renders table first column", () => {
    expect(
      container.textContent.toLowerCase()
    ).toContain(
      "nazwa szczepionki"
    );
  });

  it("renders table second column", () => {
    expect(
      container.textContent.toLowerCase()
    ).toContain(
      "data"
    );
  });

  it("renders table third column", () => {
    expect(
      container.textContent.toLowerCase()
    ).toContain(
      "godzina"
    );
  });

  it("renders records on page counter", () => {
    expect(
      container.textContent.toLowerCase()
    ).toContain(
      "rekordów na stronie"
    );
  });

  it("renders number of records text", () => {
    expect(
      container.textContent.toLowerCase()
    ).toContain(
      "rekordów na stronie"
    );
  });
});