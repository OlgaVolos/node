const express = require('express');
const expressHbs = require('express-handlebars');

const path = require('path');
const fs = require('fs');

const {PORT} = require('./config/variables');
const users = require('./db/users');

const pathStatic = path.join(__dirname, 'static')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(pathStatic));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}))
// app.set('views', path.join(__dirname, 'static')) //можна винести, бо повторюється
app.set('views', pathStatic);

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/login', (req, res) => {
    res.render('login')
});
app.get('/register', (req, res) => {
    res.render('register')
});
app.get('/users', (req, res) => {
    res.render('users', {users})
});

app.get('/users/:user_id', (req, res) => {
    console.log(req.params);
    let {user_id} = req.params;
    const currentUser = users[user_id]
    if (!currentUser) {
        res.status(404).end('User not found');
        return;
    }
    res.render('user', {currentUser})

})

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
        res.status(400).end('Bad Request');
        return;
    }
    const isRegister = users.some(value => value.email === email);
    if (isRegister) {
        res.status(400).end('Already exist');
        return;
    }
    users.push({name, email, password});
    const usersPath = path.join(__dirname, 'db', 'users.js');
    fs.writeFile(usersPath, `module.exports = \n${JSON.stringify(users)}`, err => {
        if (err) {
            console.log(err);
        }
    })
    res.redirect('/login');
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;

    const userIndex = users.findIndex(value => value.email === email && value.password === password);
    if (!userIndex && userIndex === -1) {
        res.status(404).end('Wrong login or password')

        return;
    }
    res.redirect(`users/${userIndex}`);

})

app.listen(PORT, () => {
    console.log("app listen", PORT)
})
