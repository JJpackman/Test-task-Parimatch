import { render, screen } from "@testing-library/react";
import InputLabel from "./InputLabel";

it("should show label text", async () => {
  const labelText = "Name:";
  const children = (
    <div>
      <input name="name" defaultValue="Test" type="text" />
    </div>
  );

  render(<InputLabel text={labelText}>{children}</InputLabel>);

  expect(screen.getByLabelText(labelText)).toBeInTheDocument();
  expect(screen.getByDisplayValue("Test")).toBeInTheDocument();
});
