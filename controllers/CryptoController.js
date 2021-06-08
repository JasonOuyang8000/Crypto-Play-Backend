const axios = require("axios");
const models = require('../models/');
const cryptoController = {};


cryptoController.searchCrypto = async (req,res) => {
    try {
        const response = await axios.get(`https://api.coinranking.com/v2/search-suggestions?query=${req.query.search}`, {
            headers: {
                'x-access-token': process.env.API_KEY
            }
        });
        return res.json({results: response.data});
    }

    catch(error) {
        return res.status(400).json({
            error
        })
    }
}


cryptoController.getCryptoHistory = async (req, res) => {
    try {
        if (!req.query.uuid || !req.query.time ) {
            return res.status(400).json({
                error: 'One or more parameters are missing'
            });
        }


        const response = await axios.get(`https://api.coinranking.com/v2/coin/${req.query.uuid}/history?timePeriod=${req.query.time}`, {
            headers: {
                'x-access-token': process.env.API_KEY
            }
        });

        return res.json({results: response.data});
    }

    catch(error) {
        return res.status(400).json({
            error
        })
    }
}

cryptoController.watchlist = async (req,res) => {
    try {   
        
    }
    catch(error) {
        return res.status(400).json({
            error
        })
    }
}

cryptoController.updateWatchlist = async (req,res) => {
    try {
        const [crypto, created] = await models.crypto.findoCreate({
            where: {
                uuid: req.body.uuid
            }
        });
    }
    catch(error) {
        return res.status(400).json({
            error
        })
    }
}




module.exports = cryptoController;