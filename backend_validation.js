const Joi = require('joi');

const idSchema = Joi.object({
    id: Joi.number().integer().min(1).required()
});

const userSchema = Joi.object({
    first_name: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    last_name: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    birth_date: Joi.date().less('now').required(),
    country_of_residence: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    elo_rating: Joi.number().integer().min(100).max(3000),
    username: Joi.string().trim().alphanum().min(6).max(20).required(),
    password: Joi.string().trim().alphanum().min(6).max(20).required(),
    admin: Joi.boolean(),
    moderator: Joi.boolean(),
    player: Joi.boolean()
});

const trnmtSchema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    city: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    country: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().min(Joi.ref('start_date')).required(),
    format: Joi.string().valid('round-robin','Swiss system', 'elimination', 'Scheveningen system').trim().required(),
    organiserId: Joi.number().integer().min(1).required()
});

const orgSchema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    formation_date: Joi.date().max('now').required(),
    president: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    country: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim().required(),
    website: Joi.string().uri().trim().required(),
});

const resultSchema = Joi.object({
    userId: Joi.number().integer().min(1).required(),
    tournamentId: Joi.number().integer().min(1).required(),
    ranking: Joi.number().integer().min(1).required(),
    prize:  Joi.number().precision(2).positive().required(),
    country_represented: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim(),
    elo_change:  Joi.number().integer().min(-100).max(100).required(),
    coach: Joi.string().pattern(/^[a-zA-Z\s]*$/i).trim()
});

const loginSchema = Joi.object({
    username: Joi.string().trim().alphanum().min(6).max(20).required(),
    password: Joi.string().trim().alphanum().min(6).max(20).required()
});

module.exports = {
    idSchema,
    userSchema,
    trnmtSchema,
    orgSchema,
    resultSchema,
    loginSchema
};