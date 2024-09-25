import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

function ComponentUseEffect() {
  const ref = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => {
    ref.current!.focus();
  };

  // 在修改 count 时重复渲染组件，使用 useRef 可以保持 timerRef 值不变
  const timerRef = useRef<number | null>(null);

  const [count, setCount] = useState(0);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => {
      clearInterval(timerRef.current!);
    };
  });

  const componentRef = useRef(null);
  const handleClickChild = () => {
    componentRef.current!.sayHello!();

    componentRef.current.focus();
  };

  return (
    <>
      <h2>useRef 使用</h2>

      <input ref={ref} type="text" />

      <button onClick={handleFocus}>Focus</button>

      <br />
      <div>{count}</div>

      <br />

      <button onClick={handleClickChild}>Child</button>
      <Child ref={componentRef} />
    </>
  );
}

const Child = forwardRef((props, ref) => {
  const childRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    sayHello() {
      console.log("Hello!");
    },
    focus() {
      childRef.current!.focus();
    },
  }));

  return <input type="text" ref={childRef} />;
});

export default ComponentUseEffect;
