const { generatePassword, checkPassword, generateUserToken } = require('../helpers/helperFunctions');
const { user } = require('../models/user');



const userController = {};

userController.create = async (req, res) => {
    try {
        const { username, email, balance, password } = req.body;

        if (!checkPassword(password)) return res.status(400).res.json({error: {
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
        res.status(400).json({
            error
        });
    }

}

module.exports = userController;