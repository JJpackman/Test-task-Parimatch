import * as React from "react";
import { employeeTableHeaders } from "constants/employee";
import { Employee, EditableEmployees } from "models/employee";
import EmployeeTableHead from "./components/EmployeeTableHead";
import EmployeeTableRow from "./components/EmployeeTableRow";

type EmployeeTableProps = {
  isDataLoading: boolean;
  data: Employee[];
} & EditableEmployees;

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  isDataLoading,
  data,
  handleEditEmployeeClick,
  handleDeleteEmployeeClick,
}) => {
  return isDataLoading ? (
    <>"... Loading"</>
  ) : (
    <table>
      <EmployeeTableHead headers={employeeTableHeaders} />
      <tbody>
        {data.length ? (
          data.map((employ) => {
            return (
              <EmployeeTableRow
                key={employ._id}
                employee={employ}
                handleDeleteEmployeeClick={() =>
                  handleDeleteEmployeeClick(employ._id)
                }
                handleEditEmployeeClick={() => handleEditEmployeeClick(employ)}
              />
            );
          })
        ) : (
          <tr>
            <td colSpan={employeeTableHeaders.length + 1}>No data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
