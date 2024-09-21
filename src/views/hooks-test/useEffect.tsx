import { useEffect, useState } from "react";

function ComponentUseEffect() {
  const [count, setCount] = useState(0);

  const handleToggle = () => {
    setCount(() => count + 1);
  };

  // useEffect 钩子函数的三种调用方式

  // 1. 渲染时会执行，每次状态变化都会执行
  // useEffect(() => {
  //   console.log("渲染时会执行，每次状态变化都会执行");
  // });

  // 2. 只在第一次渲染时执行
  // useEffect(() => {
  //   console.log("只在第一次渲染时执行");
  // }, []);

  // // 3. 在第一次渲染和依赖更新时执行
  useEffect(() => {
    // console.log("在第一次渲染和依赖更新时执行");
  }, [count]);

  return (
    <>
      <div>
        <h2>useEffect 使用</h2>

        <div>{count}</div>
        <button onClick={handleToggle}>Toggle State</button>
      </div>
    </>
  );
}

export default ComponentUseEffect;
