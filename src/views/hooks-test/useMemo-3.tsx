import { memo, useMemo, useState } from "react";

interface TODO {
  id: number;
  text: string;
  completed: boolean;
}

function createTodos() {
  const todos = [];
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: "Todo " + (i + 1),
      completed: Math.random() > 0.5,
    });
  }
  return todos;
}

// 此时 input 的输入很卡顿，原因是因为 List 组件的耗时任务阻塞浏览器渲染
function filterTodos(todo: TODO[], filterValue: string): TODO[] {
  const startTime = performance.now();

  // 耗时任务
  while (performance.now() - startTime < 500) {}

  return todo.filter((todo) => {
    return todo.text.toLowerCase().includes(filterValue.toLowerCase());
  });
}

const MemoList = memo(List);
function List({ todos }: { todos: TODO[] }) {
  console.log("List render");
  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}

// 放置在外部不会在重渲染时再次计算
const todos = createTodos();

const ComponentUseMemo3 = () => {
  const [theme, setTheme] = useState("light");
  const [inputValue, selInputValue] = useState("");

  // 此时切换主题，很丝滑，因为 todos 和 inputValue 都没变，使用了 useMemo，即使 List 重渲染也不会导致 filteredTodo 重新计算
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selInputValue(e.target.value);
  };

  const filteredTodo = useMemo(
    () => filterTodos(todos, inputValue),
    [todos, inputValue]
  );

  return (
    <>
      <h1>useMemo demo3 跳过组件重新渲染</h1>
      Theme: {theme} <button onClick={toggleTheme}>切换主题</button>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <MemoList todos={filteredTodo} />
    </>
  );
};

export default ComponentUseMemo3;
