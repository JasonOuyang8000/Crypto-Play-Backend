const cryptoController = require('../controllers/CryptoController');

const cryptoRouter = require('express').Router();


cryptoRouter.get('/', cryptoController.searchCrypto);
cryptoRouter.get('/history',cryptoController.getCryptoHistory);



module.exports = cryptoRouter;