import { render } from "@testing-library/react";
import { EmployeeFormBase } from "models/employee";
import { defaultEmployeeFormValues } from "constants/employee";
import EmployeeForm from "./EmployeeForm";

describe("UI render of employee form", () => {
  const props: EmployeeFormBase = {
    onSubmit: jest.fn(),
    onReset: jest.fn(),
    editedEmployee: {
      age: 45,
      name: "Denis",
      gender: "male",
      status: "active",
    },
  };

  const setup = (props: EmployeeFormBase) => {
    const utils = render(<EmployeeForm {...props} />);
    const nameInput = utils.getByLabelText("name-input") as HTMLInputElement;
    const ageInput = utils.getByLabelText("age-input") as HTMLInputElement;
    const genderRadios = utils.getAllByLabelText(
      "gender-radio"
    ) as HTMLInputElement[];
    const statusSelect = utils.getByLabelText(
      "status-select"
    ) as HTMLSelectElement;

    return {
      nameInput,
      ageInput,
      genderRadios,
      statusSelect,
      ...utils,
    };
  };

  it("should correctly render form btn label and fill input values in edit mode", () => {
    const { nameInput, ageInput, genderRadios, statusSelect, ...utils } =
      setup(props);

    expect(nameInput.value).toBe(props.editedEmployee?.name);
    expect(ageInput.value).toBe(String(props.editedEmployee?.age));
    expect(statusSelect.value).toBe(props.editedEmployee?.status);
    expect(
      genderRadios.some(
        (radio) => radio.checked && radio.value === props.editedEmployee?.gender
      )
    ).toBe(true);
    expect(statusSelect.value).toBe(props.editedEmployee?.status);
    expect(utils.getByText("Edit employee")).toBeInTheDocument();
  });

  it("should correctly render form btn label and inputs with default values", () => {
    const { editedEmployee, ...rest } = props;
    const { nameInput, ageInput, genderRadios, statusSelect, ...utils } =
      setup(rest);

    expect(nameInput.value).toBe(defaultEmployeeFormValues.name);
    expect(ageInput.value).toBe(String(defaultEmployeeFormValues.age));
    expect(statusSelect.value).toBe(defaultEmployeeFormValues.status);
    expect(
      genderRadios.some(
        (radio) =>
          radio.checked && radio.value === defaultEmployeeFormValues.gender
      )
    ).toBe(true);
    expect(statusSelect.value).toBe(defaultEmployeeFormValues.status);
    expect(utils.getByText("Create employee")).toBeInTheDocument();
  });
});
