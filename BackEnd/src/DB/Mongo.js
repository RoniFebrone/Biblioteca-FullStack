const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/local');

mongoose.connection.on('connected', () => {
    console.log('Conectado ao MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Erro na conexão com o MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Desconectado do MongoDB');
});


module.exports = mongoose;