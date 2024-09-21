import ComponentUseState from "@/views/hooks-test/useState";
import ComponentUseEffect from "@/views/hooks-test/useEffect";
import ComponentUseEffect2 from "@/views/hooks-test/useEffect-2";

function App() {
  return (
    <>
      <h1>Hello World!</h1>
      <hr />

      <ComponentUseState />

      <hr />
      <ComponentUseEffect />
      <ComponentUseEffect2 />
    </>
  );
}

export default App;
