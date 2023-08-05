import { Action } from "./App";

export default function NumButton({ dispatch, num }) {
  return (
    <button onClick={() => dispatch({ type: Action.ADD_NUM, button: { num } })}>
      {num}
    </button>
  );
}
