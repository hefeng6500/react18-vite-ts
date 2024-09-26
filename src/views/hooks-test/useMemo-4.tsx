import { memo, useMemo, useState, useTransition } from "react";

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

function filterTodos(todo: TODO[], filterValue: string): TODO[] {
  const startTime = performance.now();

  // 耗时任务
  while (performance.now() - startTime < 500) {}

  return todo.filter((todo) => {
    return todo.text.toLowerCase().includes(filterValue.toLowerCase());
  });
}

const MemoList = memo(List);
function List({ todos, query }: { todos: TODO[]; query: string }) {
  console.log("List render");

  const filteredTodo = useMemo(() => filterTodos(todos, query), [todos, query]);

  return (
    <>
      <ul>
        {filteredTodo.map((todo) => (
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

const ComponentUseMemo4 = () => {
  const [theme, setTheme] = useState("light");
  const [inputValue, selInputValue] = useState("");

  // useTransition 用于处理低优先级的状态更新
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");

  // 此时切换主题，很丝滑，因为 todos 和 inputValue 都没变，使用了 useMemo，即使 List 重渲染也不会导致 filteredTodo 重新计算
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    selInputValue(newValue);

    startTransition(() => {
      setQuery(newValue);
    });
  };

  return (
    <>
      <h1>useMemo</h1>
      Theme: {theme} <button onClick={toggleTheme}>切换主题</button>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {isPending ? <h2>Loading...</h2> : null}
      <MemoList todos={todos} query={query} />
    </>
  );
};

export default ComponentUseMemo4;
