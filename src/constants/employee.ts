import { EditedEmployee } from "models/employee";

export const defaultEmployeeFormValues: EditedEmployee = {
  age: 0,
  status: "active",
  name: "",
  gender: "female",
};

export const employeeTableHeaders = ["Name", "Gender", "Age", "Status"];
