import { request } from "../helpers/network";
import { BASE_URL } from "../constants/requests";
import { Employee, EmployeeFormValues } from "../models/employee";

export const getEmployees = () => {
  return request.get<Employee[]>(BASE_URL);
};

export const deleteEmployee = (id: string) => {
  return request.delete(`${BASE_URL}/${id}`);
};

export const createEmployee = (newEmployee: EmployeeFormValues) => {
  return request.post(BASE_URL, newEmployee);
};

export const editEmployee = (editedEmployee: EmployeeFormValues) => {
  return request.put(BASE_URL, editedEmployee);
};
