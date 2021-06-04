export type Gender = "female" | "male";

export type Employee = {
  _id: string;
  name: string;
  age: number;
  gender: Gender;
  status: string;
};

export type EmployeeFormValues = Omit<Employee, "_id">;

export type EditedEmployee = Partial<EmployeeFormValues>;
export type EditableEmployees = {
  handleEditEmployeeClick: (editedEmployee: Employee) => void;
  handleDeleteEmployeeClick: (id: string) => void;
};
export type EmployeeFormBase = {
  onSubmit: (values: EmployeeFormValues, isEdited?: boolean) => void;
  editedEmployee?: EmployeeFormValues;
  onReset: Function;
};
