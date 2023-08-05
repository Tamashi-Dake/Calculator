import "./styles.css";
import { useReducer } from "react";
import NumButton from "./NumButton";
import OperationButton from "./OperationButton";

//Khai báo action
export const Action = {
  ADD_NUM: "addNum",
  DEL_NUM: "addNum",
  CLEAR: "clear",
  OPERATION: "operation",
  EVALUATE: "evaluate"
};

// Khai báo reducer
function reducer(state, action) {
  switch (action.type) {
    case Action.ADD_NUM: {
      if (state.overwrite === true) {
        return {
          ...state,
          currentOperand: action.button.num,
          overwrite: false
        };
      }
      if (action.button.num === "0" && state.currentOperand === "0")
        return state;
      if (action.button.num === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${action.button.num}`
      };
    }
    case Action.OPERATION:
      if (
        state.currentOperand === null ||
        state.currentOperand === action.button.operation
      )
        return state;
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: action.button.operation
        };
      }
      console.log(state.operation);
      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          operation: action.button.operation,
          currentOperand: null
        };
      }
      // console.log(state.previousOperand)
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.button.operation,
        currentOperand: null
      };

    case Action.DEL_NUM:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        };
      }
      if (state.currentOperand === null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      console.log(state.currentOperand);
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      };
    case Action.CLEAR:
      return {};
    case Action.EVALUATE:
      if (state.currentOperand == null)
        return {
          previousOperand: null,
          operation: null,
          currentOperand: state.previousOperand
        };
      if (state.operation == null || state.previousOperand == null) {
        return state;
      }
      console.log(state.operation);

      // If press operation then num

      // if (state.operation !== null && state.previousOperand == null) {
      //   if (state.operation === "-") {
      //     return {
      //       previousOperand: null,
      //       operation: null,
      //       currentOperand: 0 - state.currentOperand
      //     };
      //   }
      //   return {
      //     previousOperand: null,
      //     operation: null,
      //     currentOperand: state.previousOperand
      //   };
      // }
      return {
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      };
    default:
      return state;
  }
}
function evaluate(state) {
  const prev = parseFloat(state.previousOperand);
  const current = parseFloat(state.currentOperand);
  let computation = "";
  switch (state.operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      {
        // if(state.operation !== "-"){

        // }
        computation = prev - current;
      }
      break;
    case "x":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    default:
      return state;
  }
  return computation.toString();
}
// format every 3 digit
// const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
//   maximumFractionDigits: 0,
// })
// function formatOperand(operand) {
//   if (operand == null) return
//   const [integer, decimal] = operand.split(".")
//   if (decimal == null) return INTEGER_FORMATTER.format(integer)
//   return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
// }
export default function App() {
  // useReducer cho obj state có 3 phần tử và dispatch để cập nhật cho state
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="App">
      <h1>Calculator</h1>
      <div className="calcuWapper">
        <div id="screen">
          <div id="previousDisplay">
            {previousOperand}
            {operation}
          </div>
          <div id="display">{currentOperand}</div>
        </div>
        <div id="calPads">
          <button
            className="colspan-2 btn-danger"
            onClick={() => dispatch({ type: Action.CLEAR, button: "AC" })}
          >
            AC
          </button>
          <button
            className="btn-secondary"
            disabled
            onClick={() => dispatch({ type: Action.DEL_NUM, button: "?" })}
          >
            Del
          </button>

          <OperationButton operation="/" dispatch={dispatch} />

          <NumButton id="seven" num="7" dispatch={dispatch} />
          <NumButton num="8" dispatch={dispatch} />
          <NumButton num="9" dispatch={dispatch} />
          <OperationButton operation="x" dispatch={dispatch} />
          <NumButton num="4" dispatch={dispatch} />
          <NumButton num="5" dispatch={dispatch} />
          <NumButton num="6" dispatch={dispatch} />
          <OperationButton operation="-" dispatch={dispatch} />
          <NumButton num="1" dispatch={dispatch} />
          <NumButton num="2" dispatch={dispatch} />
          <NumButton num="3" dispatch={dispatch} />
          <OperationButton operation="+" dispatch={dispatch} />
          <NumButton num="." dispatch={dispatch} />
          <NumButton num="0" dispatch={dispatch} />
          <button
            id="equals"
            className="colspan-2 btn-info"
            onClick={() =>
              dispatch({
                type: Action.EVALUATE,
                button: "="
              })
            }
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

// const [currentValue, setcurrentValue] = useState("0");
// const [result, setResult] = useState("null");
// function handleClickButton(value) {
//   if (value === "=") {
//     calculate();
//   } else if (value === "AC") {
//     clear();
//   } else {
//     // console.log(this.event.target.value)
//     setcurrentValue(value === "0" ? currentValue : currentValue + value);
//   }
// }
// const calculate = () => {
//   setResult(eval?.(currentValue));
// };
// const clear = () => {
//   setcurrentValue("0");
//   setResult("null");
// };
