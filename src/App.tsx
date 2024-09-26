import ComponentUseState from "@/views/hooks-test/useState";
import ComponentUseEffect from "@/views/hooks-test/useEffect";
import ComponentUseEffect2 from "@/views/hooks-test/useEffect-2";
import ComponentUseRef from "@/views/hooks-test/useRef";
import ComponentUseReducer from "./views/hooks-test/useReducer";
import ComponentUseMemo from "./views/hooks-test/useMemo";
import ComponentUseMemo2 from "./views/hooks-test/useMemo-2";
import ComponentUseMemo3 from "./views/hooks-test/useMemo-3";
import ComponentUseMemo4 from "./views/hooks-test/useMemo-4";

function App() {
  return (
    <>
      <h1>Hello World!</h1>
      <hr />

      <ComponentUseState />

      <hr />
      <ComponentUseEffect />
      <ComponentUseEffect2 />

      <hr />
      <ComponentUseRef />

      <hr />
      <ComponentUseReducer />

      <hr />
      <ComponentUseMemo />
      <ComponentUseMemo2 />
      <ComponentUseMemo3 />
      <ComponentUseMemo4 />
    </>
  );
}

export default App;
