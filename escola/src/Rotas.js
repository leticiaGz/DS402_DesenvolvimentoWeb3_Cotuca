import React from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './Components/Template/Main/Main';
import CrudAluno from './Components/CrudAluno/CrudAluno';
import CrudCursos from './Components/CrudCursos/CrudCursos';
import Carometro from './Components/Carometro/Carometro';

export default function Rotas() {
    return (
    <Routes>

        <Route exact path='/'
            element={
                <Main title="Bem Vindo!">
                    <div>Cadastro de alunos, cursos e carômetro</div>
                </Main> }
        />
        <Route path='/alunos' element={<CrudAluno />} />

        <Route path='/cursos' element={<CrudCursos />} />

        <Route path='/carometro' element={<Carometro />} />

        <Route path='*' element={
            <Main title="Bem Vindo!">
                <div>Página não encontrada</div>
            </Main>} />

    </Routes>
    )
}