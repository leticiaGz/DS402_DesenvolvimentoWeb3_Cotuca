

import "./CrudCurso.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Main from '../Template/Main/Main';

 export default function CrudCursos() {

  const [cursos, setCursos] = useState([]);
  const [inputCodCurso, setInputCodCurso] = useState("");
  const [inputNome, setInputNome] = useState(""); 
  const [inputPeriodo, setInputPeriodo] = useState("");
  const [inputVisbility, setInputVisility] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState();
  const api = "https://localhost:7129/api/curso";

  useEffect(() => {
    getCursos(); // chamando a função do select que lista os cursos
  }, []);

  async function getCursos() {
    const response = await axios.get(api);
      setCursos(response.data);
  }

  async function deleteCurso(curso) {
   await axios.delete(`${api}/${curso.id}`);
      getCursos();
  }

  async function createCurso() {
    await axios.post(api, {
        codCurso: inputCodCurso,
        nomeCurso: inputNome,
        periodo: inputPeriodo
    });
    getCursos(); // atualiza a pagina
    setInputVisility(!inputVisbility);//sumir o input
    setInputNome("");
    setInputCodCurso("");
    setInputPeriodo("");
  }

  async function limpaInput() {
    setInputNome("");
    setInputCodCurso("");
    setInputPeriodo("");
    setInputVisility(!inputVisbility);

  }

  //faço o put
 async function editCurso() {

   await axios.put(`${api}/${selectedCurso.id}`, {
      codCurso: inputCodCurso,
      nomeCurso: inputNome,
      periodo: inputPeriodo
    });
    setSelectedCurso();
    setInputVisility(false);
    getCursos();
    setInputNome("");
    setInputCodCurso("");
    setInputPeriodo(""); //limpando input
  }


  //faz a tabela aparecer quando o botao é clicado
  async function handleWithNewButton() {
    setInputVisility(!inputVisbility);
  }

  //quando clica no botao habilita o input
  async function handleWithEditButtonClick(curso) {
    setSelectedCurso(curso);
    setInputVisility(true);
  }

  {/*Criando componente que renderiza os cursos*/}
 
  const Cursos = ({ cursos }) => {
    return (

    <div className="listagem">
      <table className="listaAlunos" id="tblListaAlunos">
        <thead>
          <tr className="cabecTabela">
            <th className="tabTituloRa">CodCurso</th>
            <th className="tabTituloNome">NomeCurso</th>
            <th className="tabTituloCurso">periodo</th>
          </tr>
        </thead>
          <tbody>
            {cursos.map((curso) =>
              <tr key={curso.id}>
                <td>{curso.codCurso}</td>
                <td>{curso.nomeCurso}</td>
                <td>{curso.periodo}</td>
                <td>
                  <button onClick={() =>{handleWithEditButtonClick(curso)}}>
                    Editar
                  </button>
                </td>
                <td>
                <button onClick={() =>{deleteCurso(curso)}}>
                  remover
                </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    )
  };

  {/*Criando componente que renderiza o Forms*/}
  const Form = () => {
  return (
    <div >
      <div>
 
        <div className="inclui-container" style={{ display: inputVisbility ? "inline-block" : "none" /*se for true mostro se nao escondo*/ }}>

        <label>Codigo do Curso:</label>
        <input value={inputCodCurso} className="form-input" placeholder="hhh" type="number"
        onChange={(event) => {setInputCodCurso(event.target.value); /* setando valor do input*/}}></input>

        <label>Nome do Curso:</label>
        <input value={inputNome} className="form-input" type="text"
        onChange={(event) => {setInputNome(event.target.value); /* setando valor do input*/}}></input>

        <label>Periodo:</label>
        <input value={inputPeriodo} className="form-input" type="text"
        onChange={(event) => {setInputPeriodo(event.target.value); /* setando valor do input*/}}></input>

       {/*Botao novo curso*/}  
       <button  className="btnSalvar"
          onClick={inputVisbility? selectedCurso ? editCurso: createCurso: handleWithNewButton}>
          Salvar
        </button>

        <button  className="btnCancelar"
          onClick={()=> {limpaInput()}}>
          cancelar
        </button>

        </div>
          {/*Se estiver selected é update se nao é put*/} 
          <button  className="btnSalvar" style={{ display: inputVisbility ? "none" : "block"}}
            onClick={inputVisbility? selectedCurso ? editCurso: createCurso: handleWithNewButton}>
            novo curso
        </button>

      </div>
    </div>
  );}

  return(
    <Main >
      <Form></Form>
      <Cursos cursos={cursos}></Cursos>
      
    </Main>
  )
}

