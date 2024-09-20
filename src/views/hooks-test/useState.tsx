import { produce } from "immer";
import { useState } from "react";

interface UserInfo {
  name: string;
  age: number;
}

function Component() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // 1. 只会执行一次。因为 react 组件的状态是一个快照状态，在一次渲染中，count 的值恒定不变
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);

    // 2. setCount 使用回调函数设置值可以实现再一次事件多次修改状态
    setCount((count) => count + 1);
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  };

  console.log("重新渲染");

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "hefeng6500",
    age: 18,
  });

  const handleClickUpdateAge = () => {
    // 1. 直接设置 age，不会触发更新
    // userInfo.age = 100

    // Notice：
    // 把所有存放在 state 中的 JavaScript 对象都视为只读的
    // React 底层会直接通过更新前后的对象的指针指向来判断 state 状态是否变化

    // 2. 使用不可变数据的理念，创建一个新对象设置 state
    setUserInfo({
      ...userInfo,
      age: 100,
    });
  };

  const [baseState, setBaseState] = useState<
    {
      title: string;
      done?: boolean;
    }[]
  >([
    {
      title: "React",
      done: false,
    },
    {
      title: "Vue",
      done: false,
    },
    {
      title: "Angular",
      done: false,
    },
  ]);

  const handleClickUpdateDetails = () => {
    // 不生效
    // baseState.push({ title: "Tweet about it" })

    const nextState = baseState.slice(); // shallow clone the array
    nextState[1] = {
      // replace element 1...
      ...nextState[1], // with a shallow clone of element 1
      done: true, // ...combined with the desired update
    };
    // since nextState was freshly cloned, using push is safe here,
    // but doing the same thing at any arbitrary time in the future would
    // violate the immutability principles and introduce a bug!
    nextState.push({ title: "Tweet about it" });

    setBaseState(nextState);
  };

  interface Todo {
    id: string;
    title: string;
    done: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "React",
      title: "Learn React",
      done: true,
    },
    {
      id: "Immer",
      title: "Try Immer",
      done: false,
    },
  ]);

  const handleAdd = () => {
    const nextState = produce((draft) => {
      draft.push({
        id: "todo_" + Math.random(),
        title: "A new todo",
        done: false,
      });
    });

    setTodos(nextState);
  };

  const handleToggle = (id: Todo["id"]) => {
    setTodos(
      produce((draft) => {
        const todo = draft.find((todo) => todo.id === id)!;

        todo.done = !todo.done;
      })
    );
  };

  return (
    <>
      <h2>useState 使用</h2>
      <hr />

      <button onClick={handleClick}>设置 Count</button>
      <div>{count}</div>

      <br />

      <div>
        <h3>user info</h3>
        <div>name: {userInfo.name}</div>
        <div>age: {userInfo.age}</div>

        <button onClick={handleClickUpdateAge}>修改 user info age</button>
      </div>

      <br />
      <div>
        使用 Immer 库：Create the next immutable state by mutating the current
        one

        <div>
        <a target="_blank" href="https://github.com/immerjs/immer">https://github.com/immerjs/immer</a>

        </div>
        <div>
          <h3>未使用 Immer</h3>
          <div>
            {baseState.map((state, index) => {
              return (
                <div key={index}>
                  <div>
                    {state.title}, done: {state.done ? "done" : "doing"}
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={handleClickUpdateDetails}>修改 state</button>
        </div>
        <br />
        <div>
          <h3>使用 Immer 库</h3>
          <div>
            <div>
              {todos.map((state, index) => {
                return (
                  <div key={index}>
                    <div>
                      {state.title}, done: {state.done ? "done" : "doing"}
                      <button onClick={() => handleToggle(state.id)}>
                        toggle
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={handleAdd}>新增 state</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Component;
