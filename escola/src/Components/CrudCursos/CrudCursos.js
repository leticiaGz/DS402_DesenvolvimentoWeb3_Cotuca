

import "./CrudCursos.css";
import { useEffect, useState } from "react";
import axios from "axios";

 export default function CrudCursos() {

 
  
  {/*Criando componente*/}
  const Cursos = ({ cursos }) => {
    return (

      //fazendo o map das todos
      <div className="todos">
        {todos.map((curso) => {
          return (
            <div className="todo">

              <p>{curso.codCurso}</p>
              <button onClick={() =>{} /*handleWithEditButtonClick(todo)*/}>
                remover
              </button>
              <button onClick={() =>{} /*deleteTodo(todo)*/}>
                editar
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const [todos, setTodos] = useState([]); //onde lista meus cursos
  const [inputValue, setInputValue] = useState(""); // pegando o valor do meu input
  const [inputVisbility, setInputVisility] = useState(false); // estado da visibilidade dos inputs
  const [selectedTodo, setSelectedTodo] = useState(); // utilizada no update, para ativar o input
  const api = "https://localhost:7129/api/curso";

  useEffect(() => {
    getTodos(); // chamando a função do select que lista os cursos
  }, []);

//faz meu input aparecer quando o botao é clicado
  /*async function handleWithNewButton() {
    console.log("fasfas");
    setInputVisility(!inputVisbility);
  }*/

  //quando clica no botao habilita o input
 /* async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisility(true);
  }*/

  //faço get cursos *****
  async function getTodos() {
    const response = await axios.get(api);
    setTodos(response.data);
    //console.log(response.data);
  }
//faço o put
 /*async function editTodo() {
    const response = await axios.put("http://localhost:3333/todos", {
      id: selectedTodo.id,
      name: inputValue,
    });
    setSelectedTodo();
    setInputVisility(false);
    getTodos();
    setInputValue(""); // linpando o input
  }*/
// delete
 /* async function deleteTodo(todo) {
    const response = await axios.delete(
      `http://localhost:3333/todos/${todo.id}`
    );
    getTodos();
  }*/



  /*async function createTodo() {
    const response = await axios.post("http://localhost:3333/todos", {
      name: inputValue,
    });
    getTodos(); // atualiza a pagina
    setInputVisility(!inputVisbility);//sumir o input
    setInputValue("");
  }*/



  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Dont be lazzy</h1>
        </div>

        {/* chamando a const todos e passando suas props*/}
        <Cursos cursos={curso}></Cursos>

      {/*Deixanndo o input visivel ou não, alterando o display atraves da variavel*/}

        <input
          value={inputValue}
          style={{ display: inputVisbility ? "block" : "none" /*se for true mostro se nao escondo*/ }}
          onChange={(event) => {
            setInputValue(event.target.value); // setando valor do input
          }}
          className="inputName"
        ></input>

       {/*Botao novo curso*/}  

       {/*Se estiver selected é update se nao é put*/} 
        <button
          onClick={inputVisbility? selectedTodo ? editTodo: createTodo: handleWithNewButton}
          className="newTaskButton"
        >
          {inputVisbility ? "Confirm" : "+ New task" /* se a visibilidade for true retorno confirm se nao new task*/ }
        </button>
      </header>
    </div>
  );
}

