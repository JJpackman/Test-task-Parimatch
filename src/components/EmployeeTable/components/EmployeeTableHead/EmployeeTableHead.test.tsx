import React from "react";
import { render, screen, within } from "@testing-library/react";
import EmployeeTableHead from "./EmployeeTableHead";

const headers = ["Column1", "Column2"];

it("should render headers correctly if not empty headers passed", () => {
  render(
    <table>
      <EmployeeTableHead headers={headers} />
    </table>
  );

  headers.forEach((text) => {
    const row = screen.getByText(text).closest("tr");
    const rowUtils = within(row);
    expect(rowUtils.getByText(text)).toBeInTheDocument();
  });
});
