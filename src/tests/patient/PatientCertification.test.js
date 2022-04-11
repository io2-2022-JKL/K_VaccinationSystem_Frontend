import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import PatientCertifications from "../../components/patient/PatientCertifications";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders page", () => {
  act(() => {
    render(<PatientCertifications />, container);
  });
  expect(container.textContent).toContain("Certyfikat");

});