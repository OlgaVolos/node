const express = require('express');

const {PORT} = require('./config/variable');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {userRouter, authRouter} = require('./router');

app.use('/login', authRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log("App listen", PORT)
})

