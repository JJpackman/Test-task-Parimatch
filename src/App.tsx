import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";
import useEmployeesCRUD from "./hooks/useEmployeesCRUD";

import "./App.css";

function App() {
  const {
    isEmployeesLoading,
    employees,
    createEmployee,
    deleteEmployee,
    editedEmployee,
    selectEditedEmployee,
    resetEditedEmployee,
    isEmployeeEditingDisabled,
  } = useEmployeesCRUD();

  return (
    <>
      <EmployeeTable
        isDataLoading={isEmployeesLoading}
        data={employees}
        handleDeleteEmployeeClick={deleteEmployee}
        handleEditEmployeeClick={selectEditedEmployee}
      />
      <EmployeeForm
        editedEmployee={editedEmployee}
        onSubmit={createEmployee}
        onReset={resetEditedEmployee}
        isSubmitBtnDisabled={isEmployeeEditingDisabled}
      />
    </>
  );
}

export default App;
