const express = require('express');
const rowdyLogger = require('rowdy-logger');
const { findUser } = require('./middlewears/userAuth');
const cryptoRouter = require('./routers/CryptoRouter');
const app = express();
const port = process.env.PORT || 3001;
const userRouter = require('./routers/UserRouter');
require('dotenv').config()

require('./models');

const rowdyReporter = rowdyLogger.begin(app);

app.use(express.json());
app.use(require('cors')());
app.use(findUser);

app.use('/user', userRouter);
app.use('/crypto',cryptoRouter);

app.listen(port, () => {
    
    rowdyReporter.print();
});