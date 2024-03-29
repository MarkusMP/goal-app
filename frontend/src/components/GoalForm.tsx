import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { createGoal } from "../features/goals/goalSlice";

const GoalForm = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createGoal({ text }));
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
