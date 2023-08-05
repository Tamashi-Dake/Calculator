import { Action } from "./App";

export default function OperationButton({ dispatch, operation }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: Action.OPERATION, button: { operation } })
      }
    >
      {operation}
    </button>
  );
}
