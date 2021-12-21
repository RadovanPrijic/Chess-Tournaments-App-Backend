const express = require('express');
const { sequelize, Results, Users } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { idSchema, resultSchema } = require('../backend_validation.js');
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

route.get('/results', (req, res) => {
        
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            Results.findAll({ include: ['user','tournament'] })
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

    /*
    Results.findAll({ include: ['user','tournament'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) ); */
    
});

route.get('/results/:id', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            const result = idSchema.validate(req.params);
            if(result.error){
                res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
            } else {
                Results.findOne({ where: { id: req.params.id }, include: ['user','tournament'] })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) ); 
            }
        })
        .catch( err => res.status(500).json(err) );

    /*
    Results.findOne({ where: { id: req.params.id }, include: ['user','tournament'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) ); */

});

route.post('/results', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                const result = resultSchema.validate(req.body);
                if(result.error){
                    res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
                } else {
                    Results.create({
                        userId: req.body.userId,
                        tournamentId: req.body.tournamentId,
                        ranking: req.body.ranking,
                        prize: req.body.prize,
                        country_represented: req.body.country_represented,
                        elo_change: req.body.elo_change,
                        coach: req.body.coach
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
    Results.create({
        userId: req.body.userId,
        tournamentId: req.body.tournamentId,
        ranking: req.body.ranking,
        prize: req.body.prize,
        country_represented: req.body.country_represented,
        elo_change: req.body.elo_change,
        coach: req.body.coach
    })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) ); */

});

route.put('/results/:id', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                const idResult = idSchema.validate(req.params);
                const result = resultSchema.validate(req.body);

                if(result.error){
                    res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message});
                } else if(idResult.error){
                    res.status(422).json({ msg: 'Greška u validaciji: ' + idResult.error.message});
                } else {
                    Results.findOne({ where: { id: req.params.id }, include: ['user','tournament'] })
                    .then( result => {
                        result.userId = req.body.userId;
                        result.tournamentId = req.body.tournamentId;
                        result.ranking = req.body.ranking;
                        result.prize = req.body.prize;
                        result.country_represented = req.body.country_represented;
                        result.elo_change = req.body.elo_change;
                        result.coach = req.body.coach;

                        result.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    })
                    .catch( err => res.status(500).json(err) );
                }
            } else {
                res.status(403).json({ msg: "Nemate pravo na ovu akciju."});
            }
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Results.findOne({ where: { id: req.params.id }, include: ['user','tournament'] })
        .then( result => {
            result.userId = req.body.userId;
            result.tournamentId = req.body.tournamentId;
            result.ranking = req.body.ranking;
            result.prize = req.body.prize;
            result.country_represented = req.body.country_represented;
            result.elo_change = req.body.elo_change;
            result.coach = req.body.coach;

            result.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) ); */

});

route.delete('/results/:id', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                const result = idSchema.validate(req.params);
                if(result.error){
                    res.status(422).json({ msg: 'Greška u validaciji: ' + result.error.message });
                } else {
                    Results.findOne({ where: { id: req.params.id }, include: ['user','tournament'] })
                    .then( result => {
                        result.destroy()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    })
                    .catch( err => res.status(500).json(err) );
                }
            } else {
                res.status(403).json({ msg: "Nemate pravo na ovu akciju."});
            }
        })
        .catch( err => res.status(500).json(err) );
    
    /*
    Results.findOne({ where: { id: req.params.id }, include: ['user','tournament'] })
        .then( result => {
            result.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) ); */
});

module.exports = route;