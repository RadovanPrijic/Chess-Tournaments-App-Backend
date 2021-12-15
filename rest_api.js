const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const PORT = 5000;
const app = express();

const users = require('./routes/users');
const tournaments = require('./routes/tournaments');
const organisers = require('./routes/organisers');
const results = require('./routes/results');

app.use('/admin', users);
app.use('/admin', tournaments);
app.use('/admin', organisers);
app.use('/admin', results);

//TODO Dovrsiti GUI osnove - pravljenje HTML stranica i dodavanje funkcionalnosti
//TODO U rutama kod pravljenja rezultata i turnira dodati provere za relevantne ID-jeve (da li postoje)
//     Kod rezultata su to ID korisnika i turnira, a kod turnira je to ID organizatora
//TODO Validacija na front-endu
//TODO Na front-endu neka se ispisuju poruke o greskama
//TODO Provaliti zasto register i login ne funkcionisu kako treba

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.redirect(301, '/login');
        req.user = user;
        next();
    });
}

app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './gui' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './gui' });
});

//app.use((_, res) => res.redirect("/"));

app.get('/', authToken, (req, res) => {
    res.sendFile('homepage.html', { root: './gui' });
}); 

app.use(express.static(path.join(__dirname, 'gui')));

sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(PORT, () => {
    console.log(`Server je pokrenut: http://127.0.0.1:${PORT}`)
});

