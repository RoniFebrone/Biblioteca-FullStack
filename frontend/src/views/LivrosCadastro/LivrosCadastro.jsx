import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import "./index.scss";
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { LivrosService } from '../../api/LivrosService';
import Swal from 'sweetalert2';

const LivrosCadastro = () => {
  const navigate = useNavigate();
  const [livro, setLivro] = useState({ id: '', titulo: '', num_paginas: '', isbn: '', editora: '' });

  async function createLivro() {
    const body = {
      id: Number(livro.id),
      titulo: livro.titulo,
      num_paginas: Number(livro.num_paginas),
      isbn: livro.isbn,
      editora: livro.editora
    };

    if (
      livro.id != undefined && livro.id != '' &&
      livro.titulo != undefined && livro.titulo != '' &&
      livro.num_paginas != undefined && livro.num_paginas != '' &&
      livro.isbn != undefined && livro.isbn != '' &&
      livro.editora != undefined && livro.editora != ''
    ) {
      try {
        const response = await LivrosService.createLivro(body);
        alert(response.data + "Livro cadastrado");
        document.getElementById('formulario').reset();
        cadastrarOutroLivro();
      } catch (error) {
        alert(error.response.data);
      }
    }
  }

  const cadastrarOutroLivro = async () => {
    const confirmacao = await Swal.fire({
      title: 'Deseja cadastrar mais algum livro?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });

    if (confirmacao.isConfirmed) {
      navigate("/livros/cadastro");
    } else {
      navigate("/livros");
    }
  };

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario">
            <div className='form-group'>
              <label>Id</label>
              <input type="text" id='id' required onChange={(event) => { setLivro({ ...livro, id: event.target.value }) }} ></input>
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" id='titulo' required onChange={(event) => { setLivro({ ...livro, titulo: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" id='num' required onChange={(event) => { setLivro({ ...livro, num_paginas: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" id='isbn' required onChange={(event) => { setLivro({ ...livro, isbn: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" id='editora' required onChange={(event) => { setLivro({ ...livro, editora: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <button type="button" onClick={createLivro}> Cadastrar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LivrosCadastro;
