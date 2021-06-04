import React from "react";
import { EmployeeFormBase } from "models/employee";
import useEmployeeForm from "hooks/useEmployeeForm";
import InputLabel from "../InputLabel";

type EmployeeFormProps = {
  isSubmitBtnDisabled?: boolean;
} & EmployeeFormBase;

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onSubmit,
  editedEmployee,
  isSubmitBtnDisabled,
  onReset,
}) => {
  const { values, handleChange, submit, reset } = useEmployeeForm({
    onReset,
    onSubmit,
    editedEmployee,
  });

  return (
    <form onSubmit={submit}>
      <div>
        <InputLabel text="Name: ">
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            aria-label="name-input"
            required
          />
        </InputLabel>
      </div>
      <div>
        <InputLabel text="Age: ">
          <input
            name="age"
            type="number"
            value={values.age}
            onChange={handleChange}
            aria-label="age-input"
            required
          />
        </InputLabel>
      </div>
      <div>
        <InputLabel text="Male: ">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={values.gender === "male"}
            onChange={handleChange}
            aria-label="gender-radio"
            required
          />
        </InputLabel>
      </div>
      <div>
        <InputLabel text="Female: ">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={values.gender === "female"}
            onChange={handleChange}
            aria-label="gender-radio"
            required
          />
        </InputLabel>
      </div>
      <div>
        <InputLabel text="Status: ">
          <select
            name="status"
            value={values.status}
            required
            onChange={handleChange}
            aria-label="status-select"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </InputLabel>
      </div>
      <button type="submit" disabled={isSubmitBtnDisabled}>
        {editedEmployee ? "Edit employee" : "Create employee"}
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
};

export default EmployeeForm;
