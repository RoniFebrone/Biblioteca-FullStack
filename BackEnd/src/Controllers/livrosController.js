const livrosModel = require('../DB/module/livros/livros.model');

getLivros = async (__, res) => {
    try {
        const livros = await livrosModel.find();
        res.status(200).json(livros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

getOneLivro= async (req, res) => {
    try {
        const id = req.params.id;
        const livro = await livrosModel.findById(id);
        if (livro) {
            res.status(200).json(livro);
        } else {
            res.status(404).send("Nao foi encontrado um livro com esse ID");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

createLivro = async (req, res) => {

    if (!req.body.titulo) {
        return res.status(400).json({message:'O campo titulo e obrigatorio'})
    }
    if (!req.body.num_paginas) {
        return res.status(400).json({message:'O campo pages e obrigatorio'})
    }
    if (!req.body.isbn) {
        return res.status(400).json({message:'O campo isbn e obrigatorio'})
    }
    if (!req.body.editora) {
        return res.status(400).json({message:'O campo da editora e obrigatorio'})
    }

    try {
        const newlivro = await livrosModel.create(req.body);
        res.status(201).json(newlivro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

updateLivro = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedLivro = await livrosModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedLivro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

removeLivro = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedLivro = await livrosModel.findOneAndDelete({ _id: id });
        if (deletedLivro) {
            res.status(200).send(`O livro de ID ${id} foi removido.`);
        } else {
            res.status(404).send(`O livro de ID ${id} não foi encontrado.`);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { getLivros, getOneLivro, createLivro, updateLivro, removeLivro };
