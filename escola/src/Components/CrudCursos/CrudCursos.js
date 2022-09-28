

import "./CrudCurso.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Main from '../Template/Main/Main';

 export default function CrudCursos() {

  {/*Criando componente que renderiza os cursos*/}
  const Cursos = ({ cursos }) => {
    return (

    <div className="listagem">
      <table className="listaCursos" id="tblListaCursos">
        <thead>
          <tr className="cabecTabela">
            <th className="tabTituloCod">CodCurso</th>
            <th className="tabTituloNome">NomeCurso</th>
            <th className="tabTituloPeriodo">periodo</th>
          </tr>
        </thead>
          <tbody>
            {cursos.map((curso) =>
              <tr key={curso.id}>
                <td>{curso.codCurso}</td>
                <td>{curso.nomeCurso}</td>
                <td>{curso.periodo}</td>
                <td>
                  <button onClick={() =>{btnEdit(curso)}} className="btnAlterar">
                    Editar
                  </button>
                </td>
                <td>
                <button onClick={() =>{deleteCurso(curso)}} className="btnRemover">
                  Remover
                </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  };

  /*funçoes e states*/
  const [cursos, setCursos] = useState([]);

  const [inputCodCurso, setInputCodCurso] = useState(0);
  const [inputNome, setInputNome] = useState(""); 
  const [inputPeriodo, setInputPeriodo] = useState("");

  const [tableVisility, setTableVisility] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState();
  
  const api = "https://localhost:7129/api/curso";

  useEffect(() => {
    getCursos(); 
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
    getCursos();
    limpaInput();
  }

 async function editCurso() {

  await axios.put(`${api}/${selectedCurso.id}`, {
     codCurso: inputCodCurso,
     nomeCurso: inputNome,
     periodo: inputPeriodo
   });
   setSelectedCurso();
   getCursos();
   limpaInput();
 }

   function limpaInput() {
    setInputNome("");
    setInputCodCurso("");
    setInputPeriodo("");
    setTableVisility(!tableVisility);

  }

  //faz a tabela aparecer quando o botao é clicado
  async function mostraForm() {
    setTableVisility(!tableVisility);
  }

  //Atualiza o state do selected curso, mostrando para meu botao posteriormente que desejo fazer um put e nao um post
  async function btnEdit(curso) {
    setSelectedCurso(curso);
    setTableVisility(true);
  }

  return(
    <Main title = {"Cadastro de cursos"} >
      <div className="container-principal">
          <div className="inclui-container" style={{ display: tableVisility ? "block" : "none"}}>

          <label>Codigo do Curso:</label>
          <input 
           value={inputCodCurso} 
           className="form-input"  type="number"
           onChange={(event) => {setInputCodCurso(event.target.value);}}
          />

          <label>Nome do Curso:</label>
          <input 
            value={inputNome} 
            className="form-input" type="text" 
            onChange={(event) => {setInputNome(event.target.value);}} 
          />

          <label>Periodo:</label>
          <input 
            value={inputPeriodo} 
            className="form-input" 
            type="text"
            onChange={(event) => {setInputPeriodo(event.target.value);}}
          />

          <button 
              className="btnSalvar"
              onClick={selectedCurso ? editCurso: createCurso}>
              Salvar
          </button>

          <button  
              className="btnCancelar"
              onClick={()=> {limpaInput()}}>
              cancelar
          </button>

      </div>

          <button  
            className="btnNovoCurso" 
            style={{ display: tableVisility ? "none" : "block"}}
            onClick={mostraForm}>
            novo curso
         </button>

        <Cursos cursos={cursos}/>
    </div>
</Main>
  )
}

