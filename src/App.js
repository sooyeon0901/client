import { useEffect, useState } from "react";


function App() {
  const [ todoList, setTodoList ] = useState(null);

  // 첫 렌더링시에만 데이터를 한번만 가져오도록 
  useEffect(() => {
    // 1. fetch 사용
    fetch('http://localhost:4000/api/todo')
    .then((res) => res.json()) // 데이터 한번 정제해 줘야 함
    .then((data) => {
      //console.log(todoList);
      setTodoList(data)
      //console.log('후==', todoList);
    });

  }, [])



  return (
    <div className="App">
      <div>todo list</div>
      {todoList && todoList.map((todo) => (
        <div key={todo.id}>
          <div>{todo.id}</div>
          <div>{todo.text}</div>
          <div>{todo.done ? 'true': 'false'}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
