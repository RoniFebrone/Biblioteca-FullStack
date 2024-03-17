const mongoose = require('../../Mongo')
const { Schema } = mongoose;

const livrosSchema = new Schema({
    titulo: String, 
    num_paginas: Number,
    isbn: Number,
    editora: String
},
{
    timestamps: true,
});


const livrosModel = mongoose.model ( 'livros', livrosSchema);

module.exports = livrosModel;

