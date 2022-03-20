import { render } from "../utils/test-utils";
import Dashboard from "../pages/Dashboard";

it("Renders correctly", () => {
  const { getByText, getByRole } = render(<Dashboard />);

  expect(getByText(/goals dashboard/i)).toBeInTheDocument();
  expect(getByRole("heading", { name: /welcome/i })).toBeInTheDocument();
});
