const express = require('express');
const { sequelize, Results } = require('../models');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/results', (req, res) => {

    Results.findAll({ include: ['user','tournament'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/results/:id', (req, res) => {

    Results.findOne({ where: { id: req.params.id }, include: ['user','tournament'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/results', (req, res) => {

    Results.create({
        ranking: req.body.ranking,
        prize: req.body.prize,
        country_represented: req.body.country_represented,
        elo_change: req.body.elo_change,
        coach: req.body.coach,
        userId: req.body.userId,
        tournamentId: req.body.tournamentId
    })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/results/:id', (req, res) => {
    
    Results.findOne({ where: { id: req.params.id }, include: ['user','tournament'] })
        .then( result => {
            result.ranking = req.body.ranking;
            result.prize = req.body.prize;
            result.country_represented = req.body.country_represented;
            result.elo_change = req.body.elo_change;
            result.coach = req.body.coach;
            result.userId = req.body.userId;
            result.tournamentId = req.body.tournamentId;

            result.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/results/:id', (req, res) => {

    Results.findOne({ where: { id: req.params.id }, include: ['user','tournament'] })
        .then( result => {
            result.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;