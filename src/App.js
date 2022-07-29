import { useEffect, useState } from "react";


function App() {
  //const [ todoList, setTodoList ] = useState(null);
  const [ cherry, setCherry ] = useState(null);

  // 첫 렌더링시에만 데이터를 한번만 가져오도록 
  // useEffect 는 새로고침 눌러야 데이터 가져오나? 아니면 서버에서 data를 가져오기 전에 화면이 랜더링 돼서 그런가? 
  useEffect(() => {
    // 1. fetch 사용
    fetch('http://localhost:4000/api/todo')
    .then((res) => res.json()) // 데이터 한번 정제해 줘야 함
    .then((data) => {
      console.log('get서버에서 받은 데이터(뷰)==', data);
      console.log('get지갑 주소(뷰)==', data.data);
      //setCherry(data)
      //console.log('후==', todoList);
    });

  }, [])

  useEffect(() => {
    // 1. fetch 사용
    fetch('http://localhost:4000/api/todo/post', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => res.json()) // 데이터 한번 정제해 줘야 함
    .then((data) => {

      if(data != 'undefined' && data != null){ // 랜더링 시 undefined 나오는거 해결 위함?

        console.log('post/stringify서버에서 받은 데이터(뷰)==', JSON.stringify(data));
        console.log('post서버에서 받은 데이터(뷰)==', data);
        console.log('post지갑 주소(뷰)==', data.data);
        setCherry(data);
        //console.log('후==', todoList);
      }
    });
    console.log('cherry==', cherry); // null 이 찍힘. 화면 랜더링시에 맞춰서 데이터를 불러오지 않기 때문
    //새로고침하면 잘 나옴 
  }, [])



  return (
    <div className="App">
      <div>체리에서 가져온 지갑주소</div>
      {/*
      Cannot read properties of null (reading 'data') 에러가 발생할 수 있기 때문에 화면에 표시시 유의
      랜더링시 데이터 결과를 가져오는 속도와 랜더링 속도가 일치하지 않아서 그럼
      데이터 값보다 렌더링이 먼저돼서 그럼
      cherry.data값을 보여주기 위해 cherry && 붙임
      */}
      <div>{cherry && cherry.data}</div>
      {/* {cherry && cherry.map((data) => (
        <div key={data.data}>
          <div>{data.data}</div>
          <div>{data.result ? 'true': 'false'}</div>
        </div>
      ))} */}
    </div>
  );
}

export default App;
