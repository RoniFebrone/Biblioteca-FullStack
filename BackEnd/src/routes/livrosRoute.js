const express = require('express');
const router = express.Router();
const livrosController = require('../Controllers/livrosController')

router.get('/', livrosController.getLivros);

router.get('/:id', livrosController.getOneLivro);

router.post('/', livrosController.createLivro);

router.put('/:id', livrosController.updateLivro);

router.delete ('/:id', livrosController.removeLivro);


module.exports = router;