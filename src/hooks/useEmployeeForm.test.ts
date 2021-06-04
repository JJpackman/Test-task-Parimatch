import { renderHook, act } from "@testing-library/react-hooks";
import { defaultEmployeeFormValues } from "constants/employee";
import { EmployeeFormValues } from "models/employee";
import React from "react";
import useEmployeeForm from "./useEmployeeForm";

describe("Employee form in edit employee mode", () => {
  const editedEmployee: EmployeeFormValues = {
    age: 23,
    name: "Ivan",
    gender: "male",
    status: "active",
  };
  const hookParams = {
    onReset: jest.fn(),
    onSubmit: jest.fn(),
    editedEmployee,
  };

  beforeEach(() => {
    (global as any).FormData = jest.fn(() => Object.entries(editedEmployee));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should set form values to edited employee", () => {
    const { result } = renderHook(() => useEmployeeForm(hookParams));

    expect(result.current.values).toEqual(editedEmployee);
  });

  it("should call onSubmit with values and editedEmployee params when submit is called", () => {
    jest.spyOn(hookParams, "onSubmit");

    const { result } = renderHook(() => useEmployeeForm(hookParams));
    act(() => {
      result.current.submit({
        preventDefault: jest.fn(),
        target: {},
      } as any);
    });

    expect(hookParams.onSubmit).toHaveBeenCalledWith(editedEmployee, true);
  });

  it("should call onReset when reset is called and set form values to default", () => {
    jest.spyOn(hookParams, "onReset");
    const { result } = renderHook(() => useEmployeeForm(hookParams));
    act(() => {
      result.current.reset();
    });

    expect(hookParams.onReset).toHaveBeenCalledTimes(1);
    expect(result.current.values).toEqual(defaultEmployeeFormValues);
  });
});

describe("Employee form in create new employee mode", () => {
  it("should have default form values", () => {
    const { result } = renderHook(() =>
      useEmployeeForm({
        onReset: jest.fn(),
        onSubmit: jest.fn(),
      })
    );

    expect(result.current.values).toEqual(defaultEmployeeFormValues);
  });

  it("should handle changes of different input types", () => {
    type ChangeEvent = React.ChangeEvent<HTMLInputElement & HTMLSelectElement>;
    const checkboxFieldName = "test";
    const checkboxFieldEvent = {
      target: {
        checked: true,
        type: "checkbox",
        name: checkboxFieldName,
      },
    } as ChangeEvent;
    const inputFieldEvent = {
      target: {
        value: "Boris",
        name: "name",
      },
    } as ChangeEvent;

    const { result } = renderHook(() =>
      useEmployeeForm({
        onReset: jest.fn(),
        onSubmit: jest.fn(),
      })
    );

    act(() => {
      result.current.handleChange(checkboxFieldEvent);
    });

    expect(result.current.values).toHaveProperty(
      checkboxFieldName,
      checkboxFieldEvent.target.checked
    );

    act(() => {
      result.current.handleChange(inputFieldEvent);
    });

    expect(result.current.values.name).toBe(inputFieldEvent.target.value);
  });
});
