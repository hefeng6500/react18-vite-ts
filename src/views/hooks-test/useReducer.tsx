import { useReducer } from "react";

function ComponentUseReducer() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_AGE":
        return { ...state, age: action.payload };
      default:
        throw new Error("Unhandled action type");
    }
  };

  const handleClickSetting = () => {
    dispatch({ type: "SET_AGE", payload: 25 });
  };

  const [state, dispatch] = useReducer(reducer, { age: 42 });

  return (
    <>
      <h1>useReducer</h1>
      <br />
      <div>{state.age}</div>
      <button onClick={handleClickSetting}>设置年龄</button>
    </>
  );
}

export default ComponentUseReducer;
