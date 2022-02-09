const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const history = require('connect-history-api-fallback');
const PORT = 8200;

const app = express();

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

// app.get('/auth_register', (req, res) => {
//     res.sendFile('register.html', { root: './gui' });
// });

// app.get('/auth_login', (req, res) => {
//     res.sendFile('login.html', { root: './gui' });
// });

//app.use((_, res) => res.redirect("/"));

// app.get('/', authToken, (req, res) => {
//     res.sendFile('homepage.html', { root: './gui' });
// });

//app.use(express.static(path.join(__dirname, 'gui')));

const staticMdl = express.static(path.join(__dirname, 'dist'));
app.use(staticMdl);
app.use(history({ index: '/index.html' }));
app.use(staticMdl);

sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(PORT, () => {
    console.log(`Aplikacioni servis je pokrenut: http://127.0.0.1:${PORT}`)
});

