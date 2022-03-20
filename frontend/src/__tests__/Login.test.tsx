import { render, fireEvent } from "../utils/test-utils";
import Login from "../pages/Login";

it("Renders correctly", () => {
  const { getByRole, getByText, getByLabelText } = render(<Login />);

  expect(getByRole("heading", { name: /login/i })).toBeInTheDocument();
  expect(getByText(/login and start setting goals/i)).toBeInTheDocument();
  expect(getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  expect(getByLabelText(/password/i)).toBeInTheDocument();
  expect(getByRole("button", { name: /submit/i })).toBeInTheDocument();
});

describe("Input value", () => {
  it("Updates email input on change", () => {
    const { getByRole } = render(<Login />);
    const emailInput = getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test" } });

    expect(emailInput.value).toBe("test");
  });
  it("Updates password input on change", () => {
    const { getByPlaceholderText } = render(<Login />);

    const input = getByPlaceholderText(/Enter password/i) as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: "test" },
    });

    expect(input.value).toBe("test");
  });
});
