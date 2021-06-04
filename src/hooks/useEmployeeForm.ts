import { useState, useEffect, useCallback } from "react";
import {
  EmployeeFormBase,
  EmployeeFormValues,
  EditedEmployee,
} from "models/employee";
import { defaultEmployeeFormValues } from "constants/employee";

export default function useEmployeeForm({
  onReset,
  onSubmit,
  editedEmployee,
}: EmployeeFormBase) {
  const [values, setFormValues] = useState<EditedEmployee>(
    defaultEmployeeFormValues
  );

  useEffect(() => {
    if (editedEmployee) {
      setFormValues(editedEmployee);
    }
  }, [editedEmployee]);

  const submit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      const values = Object.fromEntries(
        new FormData(event.target as HTMLFormElement)
      ) as unknown as EmployeeFormValues;
      onSubmit(values, editedEmployee !== undefined);
    },
    [onSubmit, editedEmployee]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [event.target.name]: value,
      }));
    },
    []
  );

  const reset = useCallback(() => {
    setFormValues(defaultEmployeeFormValues);
    onReset();
  }, [onReset]);

  return { values, handleChange, submit, reset };
}
