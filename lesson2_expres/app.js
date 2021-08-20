const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

const {PORT} = require('./config/variable')
const users = require('./db/users')

const app = express();

app.use(express.json()); // вчимо читати текст)))
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, "static"))) //дозвіл заходити в папку

app.set('view engine', '.hbs'); //двигун
app.engine('.hbs', expressHbs({
    defaultLayout: false
})) // обробником виступає expressHbs
app.set('views', path.join(__dirname, "static"));


app.get('/ping', (req, res) => {
    res.json('Pong')
}) // перевіряємо, чи апка жива

app.get('/', (req, res)=> {
    console.log(req)
    // res.end('jifh')
    // res.send('<h1>Hello</h1>')
    // res.json({name: "Olya"})
    res.status(404).end('not found')
});

// app.get('/users', (req, res) =>{
//     res.json([
//         {name: "vova"},
//         {name: 'Olya'},
//     ])
// })

app.get('/login', (req, res) => {
res.render('login', {isMale: true})
})

app.get('/users', (req, res) => {
    res.render('users', {name: 'Olya', users})
}) // вказати назву файлу без розширення

app.get('/users/:user_id', (req, res) => {
    console.log(req.params);
    const { user_id} = req.params;
    const currentUser =users[user_id]

    if(!currentUser){
        res.status(404).end('User not found');
        return;
    }
    res.json(currentUser)
})



app.post('/auth', (req, res) => {
    console.log(req.body) // виведе інфу в консоль з допомогою app.use(express.urlencoded({extended: true}))
    const {name, password} = req.body;
    res.json('login')
    // res.json('Ok') спрацьовує лише один перший раз
    // res.json('Ok')
});



app.listen(PORT, ()=> {
    console.log('App listen', PORT)
})
