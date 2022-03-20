import { render } from "../utils/test-utils";
import Header from "../components/Header";

it("Renders correctly", () => {
  const { getByRole } = render(<Header />);

  expect(getByRole("link", { name: /goalsetter/i })).toBeInTheDocument();
});
