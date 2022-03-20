import { render, fireEvent } from "../utils/test-utils";
import GoalItem from "../components/GoalItem";

const goalProp = {
  id: "1",
  text: "test",
  created_at: "2020-04-20T13:00:00.000Z",
};

it("Renders correctly when props are passed", () => {
  const { getByRole, getByText } = render(<GoalItem goal={goalProp} />);

  expect(getByRole("heading", { name: /test/i })).toBeInTheDocument();
  expect(getByText(/4\/20\/2020/i)).toBeInTheDocument();
});
