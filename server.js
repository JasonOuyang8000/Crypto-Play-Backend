const express = require('express');
const rowdyLogger = require('rowdy-logger');
const app = express();
const port = process.env.PORT || 3001;
const userRouter = require('./routers/UserRouter');
require('dotenv').config()

require('./models');

const rowdyReporter = rowdyLogger.begin(app);

app.use(express.json());
app.use(require('cors')());
app.use('/user', userRouter);

app.listen(port, () => {

    rowdyReporter.print();
});