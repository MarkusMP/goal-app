import { render, fireEvent } from "../utils/test-utils";
import GoalForm from "../components/GoalForm";

it("Renders correctly", () => {
  const { getByRole } = render(<GoalForm />);

  expect(getByRole("textbox", { name: /goal/i })).toBeInTheDocument();
  expect(getByRole("button", { name: /add goal/i })).toBeInTheDocument();
});

describe("Input value", () => {
  it("Updates goal input on change", () => {
    const { getByRole } = render(<GoalForm />);
    const goalInput = getByRole("textbox", {
      name: /goal/i,
    }) as HTMLInputElement;

    fireEvent.change(goalInput, { target: { value: "test" } });

    expect(goalInput.value).toBe("test");
  });
});
