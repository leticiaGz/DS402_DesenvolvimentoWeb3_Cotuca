
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CrudCurso() {

const [curso, setCurso] = useState();

const api = "https://localhost:7129/api/curso"

useEffect(() => {
    axios.get(api)
    .then(response => {
        setCurso(response.data)
    })
}, []);

function deletar(id){

    axios.delete(`${api}/${id}`)
   .then(window.location.reload(false))
}



  return (
    <>
       

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
                        {curso && curso.map(
                            (curso) =>

                                <tr key={curso.id}>
                                    <td>{curso.codCurso}</td>
                                    <td>{curso.nomeCurso}</td>
                                    <td>{curso.periodo}</td>
                                    <td>
                                        <button onClick={()=> {console.log(`${api}/${curso.id}`)}} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => deletar(curso.id)} >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="inclui-container">
                <label> RA: </label>
                <input
                    type="text"
                    id="ra"
                    placeholder="RA do aluno"
                    className="form-input"
                    name="ra"

                   // value={this.state.aluno.ra}

                    onChange={console.log('lala')}
                />
                <label> Nome: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome do aluno"
                    className="form-input"
                    name="nome"

                   // value={this.state.aluno.nome}

                    onChange={console.log('lala')}
                />
                <label> Código do Curso: </label>
                <input
                    type="number"
                    id="codCurso"
                    placeholder="0"


                    className="form-input"
                    name="codCurso"

                   // value={}
                    onChange={console.log('lala')}
                />
                <button className="btnSalvar"
                    onClick={console.log('lala')} >
                    Salvar
                </button>
                <button className="btnCancelar"
                    onClick={console.log('lala')} >
                    Cancelar
                </button>
            </div>
            </>
        );
    }
