import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { LivrosService } from '../../api/LivrosService';
import { useParams } from 'react-router-dom';
import "./index.scss";

const Livro = () => {
    const { livroId } = useParams();
    const [livro, setLivro] = useState({});

    async function getLivro() {
        try {
            const { data } = await LivrosService.getLivro(livroId);
            setLivro(data);
        } catch (error) {
            console.error("Erro ao obter o livro:", error);
        }
    }

    useEffect(() => {
        getLivro();
    }, [livroId]);

    return (
        <>
            <Header />
            <SubmenuLivros />
            <div className='oneLivro'>
                <div className='oneLivro__container'>
                    <h1>{livro.titulo}</h1>
                    <div className='oneLivro__info'>
                        <div className='oneLivro__info--item'>
                            <p><strong>Número de Páginas:</strong> {livro.num_paginas}</p>
                        </div>
                        <div className='oneLivro__info--item'>
                            <p><strong>ISBN:</strong> {livro.isbn}</p>
                        </div>
                        <div className='oneLivro__info--item'>
                            <p><strong>Editora:</strong> {livro.editora}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Livro;
