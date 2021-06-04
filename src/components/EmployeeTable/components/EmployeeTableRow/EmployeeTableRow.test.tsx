import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditableEmployees, Employee } from "models/employee";
import EmployeeTableRow from "./EmployeeTableRow";

describe("Table row with data and action btns", () => {
  type EmployeeTableRowProps = {
    employee: Employee;
  } & EditableEmployees;

  const props: EmployeeTableRowProps = {
    employee: {
      age: 19,
      _id: "__5__",
      name: "Oksana",
      gender: "female",
      status: "active",
    },
    handleDeleteEmployeeClick: jest.fn(),
    handleEditEmployeeClick: jest.fn(),
  };

  it("should render table row correctly", () => {
    render(
      <table>
        <tbody>
          <EmployeeTableRow {...props} />
        </tbody>
      </table>
    );

    const row = screen.getByText(props.employee.name).closest("tr");
    const rowUtils = within(row as HTMLTableRowElement);

    expect(rowUtils.getByText(props.employee.age)).toBeInTheDocument();
    expect(rowUtils.getByText(props.employee.status)).toBeInTheDocument();
    expect(rowUtils.getByText(props.employee.gender)).toBeInTheDocument();
  });

  it("should call correct handlers if click edit or delete button", () => {
    render(
      <table>
        <tbody>
          <EmployeeTableRow {...props} />
        </tbody>
      </table>
    );

    const row = screen.getByText(props.employee.name).closest("tr");
    const rowUtils = within(row as HTMLTableRowElement);

    const deleteBtn = rowUtils.getByText("Delete");
    const editBtn = rowUtils.getByText("Edit");

    expect(props.handleDeleteEmployeeClick).not.toHaveBeenCalled();

    userEvent.click(deleteBtn);

    expect(props.handleDeleteEmployeeClick).toHaveBeenCalledWith(
      props.employee._id
    );
    expect(props.handleEditEmployeeClick).not.toHaveBeenCalled();

    userEvent.click(editBtn);

    expect(props.handleEditEmployeeClick).toHaveBeenCalledWith(props.employee);
  });
});
