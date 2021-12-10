const express = require('express');
const { sequelize, Tournaments } = require('../models');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/tournaments', (req, res) => {

    Tournaments.findAll({ include: ['organiser'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/tournaments/:id', (req, res) => {

    Tournaments.findOne({ where: { id: req.params.id }, include: ['organiser'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/tournaments', (req, res) => {

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

});

route.put('/tournaments/:id', (req, res) => {
    
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

});

route.delete('/tournaments/:id', (req, res) => {

    Tournaments.findOne({ where: { id: req.params.id }, include: ['organiser'] })
        .then( trnmt => {
            trnmt.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;