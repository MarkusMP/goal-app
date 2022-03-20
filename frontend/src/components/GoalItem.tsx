import { useAppDispatch } from "../app/hooks";
import { deleteGoal } from "../features/goals/goalSlice";

interface GoalItemProps {
  goal: {
    id: string;
    text: string;
    created_at: string;
  };
}

const GoalItem = ({ goal }: GoalItemProps) => {
  const dispatch = useAppDispatch();
  const { id, text, created_at } = goal;
  return (
    <div className="goal">
      <div>
        {new Date(created_at).toLocaleDateString("en-US")}
        <h2>{text}</h2>
        <button className="close" onClick={() => dispatch(deleteGoal(id))}>
          X
        </button>
      </div>
    </div>
  );
};

export default GoalItem;
