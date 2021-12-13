const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const jwt = require('jsonwebtoken');
const cors = require('cors')
require('dotenv').config();
const PORT = 5000;
const app = express();
app.use(cors());

const users = require('./routes/users');
const tournaments = require('./routes/tournaments');
const organisers = require('./routes/organisers');
const results = require('./routes/results');
const auth = require('./auth');

app.use('/api', users);
app.use('/api', tournaments);
app.use('/api', organisers);
app.use('/api', results);
app.use('/auth', auth);


//TODO VALIDACIJA NA FRONTENDU
//TODO SAZNATI KOJE RUTE MORAJU IMATI ADMIN PREFIKS

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
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: err });
        req.user = user;
        next();
    });
}

app.get('/', authToken, (req, res) => {
    res.sendFile('homepage.html', { root: './gui' });
}); 

app.use(express.static(path.join(__dirname, 'gui')));

sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(PORT, () => {
    console.log(`Server je pokrenut: http://localhost:${PORT}`)
});

