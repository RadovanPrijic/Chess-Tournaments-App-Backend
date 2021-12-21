const express = require('express');
const { sequelize, Users } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema, userSchema } = require('../backend_validation.js');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: err });
        req.user = user;
        next();
    });
}

route.use(authToken);

route.get('/users', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            Users.findAll()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) ); */
    
});

route.get('/users/:id', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            Users.findOne({ where: { id: req.params.id } })
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Users.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) ); */

});

route.post('/users', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                const result = userSchema.validate(req.body);
                if(result.error){
                    res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message })
                }
                else{
                    Users.create({ 
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        birth_date: req.body.birth_date,
                        country_of_residence: req.body.country_of_residence,
                        elo_rating: req.body.elo_rating,
                        username: req.body.username,
                        password: req.body.password,
                        admin: req.body.admin,
                        moderator: req.body.moderator,
                        player: req.body.player
                    })
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json(err) );
                }
                
            } else {
                res.status(403).json({ msg: "Nemate pravo na ovu akciju."});
            }
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Users.create({ 
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        country_of_residence: req.body.country_of_residence,
        elo_rating: req.body.elo_rating,
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin,
        moderator: req.body.moderator,
        player: req.body.player
    })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) ); */

});

route.put('/users/:id', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                Users.findOne({ where: { id: req.params.id } })
                    .then( usr => {
                        usr.first_name = req.body.first_name;
                        usr.last_name = req.body.last_name;
                        usr.birth_date = req.body.birth_date;
                        usr.country_of_residence = req.body.country_of_residence;
                        usr.elo_rating = req.body.elo_rating;
                        usr.username = req.body.username;
                        usr.password = req.body.password;
                        usr.admin = req.body.admin;
                        usr.moderator = req.body.moderator;
                        usr.player = req.body.player;

                        usr.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    })
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Nemate pravo na ovu akciju."});
            }
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.first_name = req.body.first_name;
            usr.last_name = req.body.last_name;
            usr.birth_date = req.body.birth_date;
            usr.country_of_residence = req.body.country_of_residence;
            usr.elo_rating = req.body.elo_rating;
            usr.username = req.body.username;
            usr.password = req.body.password;
            usr.admin = req.body.admin;
            usr.moderator = req.body.moderator;
            usr.player = req.body.player;

            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) ); */

});

route.delete('/users/:id', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                Users.findOne({ where: { id: req.params.id } })
                    .then( usr => {
                        usr.destroy()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    })
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Nemate pravo na ovu akciju."});
            }
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) ); */
});

module.exports = route;