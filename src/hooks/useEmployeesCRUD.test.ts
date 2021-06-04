import { renderHook, act } from "@testing-library/react-hooks";
import MockAdapter from "axios-mock-adapter";
import { BASE_URL } from "constants/requests";
import { Employee, EmployeeFormValues } from "models/employee";
import { request } from "helpers/network";
import useEmployeesCRUD from "./useEmployeesCRUD";

describe("Employees CRUD", () => {
  const employees: Employee[] = [
    {
      age: 18,
      gender: "female",
      name: "Olga",
      _id: "__1__",
      status: "inactive",
    },
    {
      age: 32,
      gender: "male",
      name: "Andrew",
      _id: "__2__",
      status: "active",
    },
  ];

  const newCreatedEmployee = {
    _id: "__3__",
    name: "Igor",
    age: 34,
    gender: "male",
    status: "inactive",
  };

  it("should load employees on initial render", async () => {
    const mock = new MockAdapter(request);
    mock.onGet(BASE_URL).reply(200, employees);

    const { result, waitForNextUpdate } = renderHook(() => useEmployeesCRUD());

    expect(result.current.employees).toEqual([]);
    expect(result.current.isEmployeeEditingDisabled).toBe(false);
    expect(result.current.isEmployeesLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.employees).toHaveLength(2);
    expect(result.current.isEmployeesLoading).toBe(false);
  });

  it("should reset loading state if load employee errors occur", async () => {
    const mock = new MockAdapter(request);
    mock.onGet(BASE_URL).networkError();

    const { result, waitForNextUpdate } = renderHook(() => useEmployeesCRUD());

    expect(result.current.employees).toEqual([]);
    expect(result.current.isEmployeeEditingDisabled).toBe(false);
    expect(result.current.isEmployeesLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.employees).toEqual([]);
    expect(result.current.isEmployeesLoading).toBe(false);
  });

  it("should delete employee by id", async () => {
    const mock = new MockAdapter(request);
    const [employee1, employee2] = employees;
    mock.onGet(BASE_URL).reply(200, employees);
    mock.onDelete(`${BASE_URL}/${employee1._id}`).reply(200);

    const { result, waitForNextUpdate } = renderHook(() => useEmployeesCRUD());

    expect(result.current.employees).toEqual([]);
    expect(result.current.isEmployeesLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.employees).toHaveLength(2);
    expect(result.current.isEmployeesLoading).toBe(false);

    mock.onGet(BASE_URL).reply(200, [employee2]);

    await act(async () => {
      await result.current.deleteEmployee(employee1._id);
    });

    expect(result.current.employees).toHaveLength(1);
    expect(result.current.isEmployeesLoading).toBe(false);
  });

  it("should create new employee", async () => {
    const mock = new MockAdapter(request);
    mock.onGet(BASE_URL).reply(200, employees);
    mock.onPost(BASE_URL).reply(200);

    const { result, waitForNextUpdate } = renderHook(() => useEmployeesCRUD());

    expect(result.current.employees).toEqual([]);
    expect(result.current.isEmployeesLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.employees).toHaveLength(2);
    expect(result.current.isEmployeesLoading).toBe(false);

    const allEmployees = [...employees, newCreatedEmployee];
    mock.onGet(BASE_URL).reply(200, allEmployees);
    const { _id, ...formValues } = newCreatedEmployee;

    await act(async () => {
      await result.current.createEmployee(formValues as EmployeeFormValues);
    });

    expect(result.current.employees).toHaveLength(allEmployees.length);
    expect(result.current.isEmployeesLoading).toBe(false);
  });

  it("should reset loading state if create employee errors occur", async () => {
    const mock = new MockAdapter(request);
    mock.onGet(BASE_URL).reply(200, employees);
    mock.onPost(BASE_URL).networkError();

    const { result, waitForNextUpdate } = renderHook(() => useEmployeesCRUD());

    expect(result.current.employees).toEqual([]);
    expect(result.current.isEmployeesLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.employees).toHaveLength(2);
    expect(result.current.isEmployeesLoading).toBe(false);

    const { _id, ...formValues } = newCreatedEmployee;

    await act(async () => {
      await result.current.createEmployee(formValues as EmployeeFormValues);
    });

    expect(result.current.employees).toHaveLength(2);
    expect(result.current.isEmployeesLoading).toBe(false);
  });

  it("should select edited employee", async () => {
    const mock = new MockAdapter(request);
    const [employee1] = employees;
    mock.onGet(BASE_URL).reply(200, employees);

    const { result, waitForNextUpdate } = renderHook(() => useEmployeesCRUD());

    expect(result.current.employees).toEqual([]);
    expect(result.current.editedEmployee).toBeUndefined();

    await waitForNextUpdate();

    expect(result.current.employees).toHaveLength(2);

    act(() => {
      result.current.selectEditedEmployee(employee1);
    });

    expect(result.current.editedEmployee).toEqual(employee1);
  });

  it("should reset edited employee after save edited employee", async () => {
    const mock = new MockAdapter(request);
    const [employee1] = employees;
    mock.onGet(BASE_URL).reply(200, employees);

    const { result, waitForNextUpdate } = renderHook(() => useEmployeesCRUD());

    expect(result.current.employees).toEqual([]);
    expect(result.current.editedEmployee).toBeUndefined();

    await waitForNextUpdate();

    expect(result.current.employees).toHaveLength(2);

    act(() => {
      result.current.selectEditedEmployee(employee1);
    });

    expect(result.current.editedEmployee).toEqual(employee1);

    mock.onPut(BASE_URL).reply(200);

    await act(async () => {
      await result.current.createEmployee(employee1, true);
    });

    expect(result.current.editedEmployee).toBeUndefined();
  });
});
