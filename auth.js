const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const PORT = 9000;
const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:5000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', (req, res) => {

    const obj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        country_of_residence: req.body.country_of_residence,
        elo_rating: req.body.elo_rating,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        admin: req.body.admin,
        moderator: req.body.moderator,
        player: req.body.player
    };

    Users.create(obj).then( rows => {
        
        const usr = {
            userId: rows.id,
            username: rows.username
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app.post('/login', (req, res ) => {

    Users.findOne({ where: { username: req.body.username } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    username: usr.username
                };

                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                res.json({ token: token });
                
            } else {
                res.status(400).json({ msg: "Uneseni kredencijali nisu validni."});
            }
        })
        .catch( err => res.status(500).json(err) );
});

sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen(PORT, () => {
    console.log(`Server je pokrenut: http://localhost:${PORT}`)
});