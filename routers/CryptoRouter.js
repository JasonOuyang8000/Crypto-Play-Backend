const cryptoController = require('../controllers/CryptoController');

const cryptoRouter = require('express').Router();


cryptoRouter.get('/', cryptoController.searchCrypto);


module.exports = cryptoRouter;