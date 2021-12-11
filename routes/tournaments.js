const express = require('express');
const { sequelize, Tournaments, Users } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
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

route.get('/tournaments', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            Tournaments.findAll({ include: ['organiser'] })
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Tournaments.findAll({ include: ['organiser'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) ); */
    
});

route.get('/tournaments/:id', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            Tournaments.findOne({ where: { id: req.params.id }, include: ['organiser'] })
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Tournaments.findOne({ where: { id: req.params.id }, include: ['organiser'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) ); */

});

route.post('/tournaments', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                Tournaments.create({
                    name: req.body.name,
                    city: req.body.city,
                    country: req.body.country,
                    start_date: req.body.start_date,
                    end_date: req.body.end_date,
                    format: req.body.format,
                    organiserId: req.body.organiserId
                })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Uneseni kredencijali nisu validni."});
            }
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Tournaments.create({
        name: req.body.name,
        city: req.body.city,
        country: req.body.country,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        format: req.body.format,
        organiserId: req.body.organiserId
    })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) ); */

});

route.put('/tournaments/:id', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                Tournaments.findOne({ where: { id: req.params.id }, include: ['organiser'] })
                    .then( trnmt => {
                        trnmt.name = req.body.name;
                        trnmt.city = req.body.city;
                        trnmt.country = req.body.country;
                        trnmt.start_date = req.body.start_date;
                        trnmt.end_date = req.body.end_date;
                        trnmt.format = req.body.format;

                        trnmt.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    })
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Uneseni kredencijali nisu validni."});
            }
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Tournaments.findOne({ where: { id: req.params.id }, include: ['organiser'] })
        .then( trnmt => {
            trnmt.name = req.body.name;
            trnmt.city = req.body.city;
            trnmt.country = req.body.country;
            trnmt.start_date = req.body.start_date;
            trnmt.end_date = req.body.end_date;
            trnmt.format = req.body.format;

            trnmt.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) ); */

});

route.delete('/tournaments/:id', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                Tournaments.findOne({ where: { id: req.params.id }, include: ['organiser'] })
                    .then( trnmt => {
                        trnmt.destroy()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    })
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Uneseni kredencijali nisu validni."});
            }
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Tournaments.findOne({ where: { id: req.params.id }, include: ['organiser'] })
        .then( trnmt => {
            trnmt.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) ); */
});

module.exports = route;