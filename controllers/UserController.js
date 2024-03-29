const {checkPassword, generateUserToken } = require('../helpers/helperFunctions');
const { user } = require('../models/');

const userController = {};

userController.create = async (req, res) => {
    try {
     
        const { username, balance, password, defaultval } = req.body;
    
        const createdUser = await user.create({
            username,
            email,
            password,
            balance,
            defaultval
        });

    
        const userToken = generateUserToken(createdUser.id, process.env.SECRET);

        return res.status(201).json({
            userToken
        });
    }
    catch(error) {
        console.log(error);
        return res.status(400).json({
            error
        });
    }

}

userController.login = async (req,res) => {
    const { username, password} = req.body;
    try {
        const findUser = await user.findOne({
            where: {
                username
            }
        });

        if (findUser === null) {
            return res.status(400).json({
                error: {
                    message: 'User Does Not Exist'
                }
            });
        }

    
        if (checkPassword(password, findUser.password)) {
            const userToken = generateUserToken(findUser.id, process.env.SECRET);
            res.json({
                userToken
            });
        }

        else {
            return res.status(401).json({error: {
                message: "Password is incorrect"
            }});
        }
    
    }
    catch (error) {
        res.status({error});
    } 
}

userController.verify = (req, res) => {
    try {
        const { userFind } = req;

        res.status(200).json({
            user: {
                id: userFind.id,
                name: userFind.name,
                balance: userFind.balance,
            }
        });
    }
    catch (error) {

    }
}


module.exports = userController;