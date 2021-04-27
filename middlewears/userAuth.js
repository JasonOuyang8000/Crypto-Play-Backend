const models = require('../models');
const { verifyUserToken } = require('../helpers/helperFunctions');


const findUser = async (req, res, next) => {
    try {
      if (req.headers.authorization) {

        const token = req.headers.authorization.split(' ')[1];
      

        const id = verifyUserToken(token, process.env.SECRET);
        
        const user = await models.user.findOne({
          where: {
            id
          }
        });

       
    
        req.userFind = user;

      } else {
        req.userFind = null;
      }
  
      next();
    } catch (error) {

      res.status(400).json({error})
    }
}


module.exports = { findUser };