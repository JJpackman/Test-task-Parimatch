import React from "react";
import { Employee, EditableEmployees } from "models/employee";

type EmployeeTableRowProps = {
  employee: Employee;
} & EditableEmployees;

const EmployeeTableRow: React.FC<EmployeeTableRowProps> = ({
  employee,
  handleEditEmployeeClick,
  handleDeleteEmployeeClick,
}) => {
  return (
    <tr>
      <td>{employee.name}</td>
      <td>{employee.gender}</td>
      <td>{employee.age}</td>
      <td>{employee.status}</td>
      <td>
        <button type="button" onClick={() => handleEditEmployeeClick(employee)}>
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={() => handleDeleteEmployeeClick(employee._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeeTableRow;
