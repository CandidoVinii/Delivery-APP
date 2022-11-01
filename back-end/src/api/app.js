const express = require('express');
const cors = require('cors');
const errorMiddleware = require('../middlewares/error');
const loginRouter = require('../routes/loginRouter');
const userRouter = require('../routes/userRouter');
const productRouter = require('../routes/productRouter');
const salesRouter = require('../routes/salesRouter');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/sales', salesRouter);

app.use(errorMiddleware);

module.exports = app;
