const express = require('express');
const { sequelize, Organisers } = require('../models');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/organisers', (req, res) => {

    Organisers.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/organisers/:id', (req, res) => {

    Organisers.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/organisers', (req, res) => {
    
    Organisers.create({ 
        name: req.body.name,
        formation_date: req.body.formation_date,
        president: req.body.president,
        country: req.body.country,
        website: req.body.website,
    })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/organisers/:id', (req, res) => {
    
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

});

route.delete('/organisers/:id', (req, res) => {

    Organisers.findOne({ where: { id: req.params.id } })
        .then( org => {
            org.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;