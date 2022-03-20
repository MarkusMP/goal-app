import { render, fireEvent } from "../utils/test-utils";
import Register from "../pages/Register";

it("Renders correctly", () => {
  const { getByRole, getByText, getByPlaceholderText } = render(<Register />);

  expect(getByRole("heading", { name: /register/i })).toBeInTheDocument();
  expect(getByText(/please create an account/i)).toBeInTheDocument();
  expect(
    getByRole("textbox", {
      name: /email/i,
    })
  ).toBeInTheDocument();
  expect(getByRole("textbox", { name: /name/i })).toBeInTheDocument();
  expect(getByPlaceholderText(/Enter password/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
  expect(getByRole("button", { name: /submit/i })).toBeInTheDocument();
});

describe("Input value", () => {
  it("Updates email input on change", () => {
    const { getByRole } = render(<Register />);

    const input = getByRole("textbox", {
      name: /email/i,
    }) as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: "test@test.com" },
    });

    expect(input.value).toBe("test@test.com");
  });
  it("Updates name input on change", () => {
    const { getByRole } = render(<Register />);

    const input = getByRole("textbox", { name: /name/i }) as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: "test" },
    });

    expect(input.value).toBe("test");
  });
  it("Updates password input on change", () => {
    const { getByPlaceholderText } = render(<Register />);

    const input = getByPlaceholderText(/Enter password/i) as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: "test" },
    });

    expect(input.value).toBe("test");
  });
  it("Updates confirm password input on change", () => {
    const { getByPlaceholderText } = render(<Register />);

    const input = getByPlaceholderText(/confirm password/i) as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: "test" },
    });

    expect(input.value).toBe("test");
  });
});
