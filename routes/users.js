const express = require('express');
const { sequelize, Users } = require('../models');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/users', (req, res) => {

    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/users', (req, res) => {
    
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

});

route.put('/users/:id', (req, res) => {
    
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

});

route.delete('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;