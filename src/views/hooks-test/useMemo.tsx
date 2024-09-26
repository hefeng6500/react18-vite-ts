import { useState } from "react";

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

function List({ todos, filterValue }: { todos: TODO[]; filterValue: string }) {
  const filteredTodo = filterTodos(todos, filterValue);

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

const ComponentUseMemo = () => {
  const [theme, setTheme] = useState("light");
  const [inputValue, selInputValue] = useState("");
  const todos = createTodos();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selInputValue(e.target.value);
  };

  return (
    <>
      <h1>useMemo</h1>
      Theme: {theme} <button onClick={toggleTheme}>切换主题</button>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <List todos={todos} filterValue={inputValue} />
    </>
  );
};

export default ComponentUseMemo;
