const express = require('express');
const { sequelize, Organisers, Users } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema, orgSchema } = require('../backend_validation.js');
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

route.get('/organisers', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            Organisers.findAll()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Organisers.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) ); */
    
});

route.get('/organisers/:id', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            Organisers.findOne({ where: { id: req.params.id } })
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Organisers.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) ); */

});

route.post('/organisers', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                Organisers.create({ 
                    name: req.body.name,
                    formation_date: req.body.formation_date,
                    president: req.body.president,
                    country: req.body.country,
                    website: req.body.website,
                })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Nemate pravo na ovu akciju."});
            }
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Organisers.create({ 
        name: req.body.name,
        formation_date: req.body.formation_date,
        president: req.body.president,
        country: req.body.country,
        website: req.body.website,
    })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) ); */

});

route.put('/organisers/:id', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                Organisers.findOne({ where: { id: req.params.id } })
                    .then( org => {
                        org.name = req.body.name;
                        org.formation_date = req.body.formation_date;
                        org.president = req.body.president;
                        org.country = req.body.country;
                        org.website = req.body.website;

                        org.save()
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
    Organisers.findOne({ where: { id: req.params.id } })
        .then( org => {
            org.name = req.body.name;
            org.formation_date = req.body.formation_date;
            org.president = req.body.president;
            org.country = req.body.country;
            org.website = req.body.website;

            org.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) ); */

});

route.delete('/organisers/:id', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                Organisers.findOne({ where: { id: req.params.id } })
                    .then( org => {
                        org.destroy()
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
    Organisers.findOne({ where: { id: req.params.id } })
        .then( org => {
            org.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) ); */
});

module.exports = route;