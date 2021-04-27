const { generatePassword, checkPassword, generateUserToken, validatePassword } = require('../helpers/helperFunctions');
const { user } = require('../models/');

const userController = {};

userController.create = async (req, res) => {
    try {
     
        const { username, email, balance, password } = req.body;
        
        if (!validatePassword(password)) return res.status(400).json({error: {
            message: 'Password is too short or too long.'
        }});

        const hashedPassword = generatePassword(password);
     
        const createdUser = await user.create({
            username,
            email,
            password: hashedPassword,
            balance
        });

    
        const userToken = generateUserToken(createdUser.id, process.env.SECRET);

        res.status(201).json({
            userToken
        });
    }
    catch(error) {
        console.log(error);
        res.status(400).json({
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

        res.status(200).json({});
    }
    catch (error) {

    }
}


module.exports = userController;