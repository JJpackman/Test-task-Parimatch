import { useEffect, useState, useCallback } from "react";
import * as API from "api";
import { Employee, EmployeeFormValues } from "models/employee";

export default function useEmployeesCRUD() {
  const [isEmployeesLoading, setIsEmployeesLoading] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editedEmployee, setEditedEmployee] = useState<EmployeeFormValues>();
  const [isEmployeeEditingDisabled, setIsEmployeeEditingDisabled] =
    useState(false);

  const fetchEmployees = useCallback(() => {
    setIsEmployeesLoading(true);
    API.getEmployees()
      .then((result) => setEmployees(result.data))
      .catch((error) => {})
      .finally(() => setIsEmployeesLoading(false));
  }, []);

  const resetEditedEmployee = useCallback(
    () => setEditedEmployee(undefined),
    []
  );

  const createEmployee = useCallback(
    (employee: EmployeeFormValues, isEdited?: boolean) => {
      setIsEmployeeEditingDisabled(true);
      if (isEdited) {
        API.editEmployee(employee)
          .then(() => fetchEmployees())
          .catch((error) => {})
          .finally(() => {
            resetEditedEmployee();
            setIsEmployeeEditingDisabled(false);
          });
      } else {
        API.createEmployee(employee)
          .then(() => fetchEmployees())
          .catch((error) => {})
          .finally(() => {
            setIsEmployeeEditingDisabled(false);
          });
      }
    },
    [fetchEmployees, resetEditedEmployee]
  );

  const deleteEmployee = useCallback(
    (id: string) => {
      API.deleteEmployee(id)
        .then(() => fetchEmployees())
        .catch((error) => {});
    },
    [fetchEmployees]
  );

  const selectEditedEmployee = useCallback((editedEmployee: Employee) => {
    setEditedEmployee(editedEmployee);
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return {
    isEmployeesLoading,
    employees,
    createEmployee,
    deleteEmployee,
    editedEmployee,
    selectEditedEmployee,
    resetEditedEmployee,
    isEmployeeEditingDisabled,
  };
}
