const express = require('express');
const router = express.Router();
const Player = require('../models').Player;
const Pokemon = require('../models').Pokemon;
const Team = require('../models').Team;


router.get('/signup', (req, res) => {
    Pokemon.findAll().then((pokemon) => {
        Team.findAll().then((teams) => {
            res.render('players/signup.ejs', {
                pokemon: pokemon,
                teams: teams
            });
        });
    });
});

router.post('/signup', (req, res) => {
    Player.create(req.body).then((newPlayer) => {
        res.redirect(`/players/profile/${newPlayer.id}`);
    });
});

router.get('/login', (req, res) => {
    res.render('players/login.ejs');
});

router.post('/login', (req, res) => {
    Player.findOne({
        where: {
            name: req.body.name
        }
    }).then(foundPlayer => {
        res.redirect(`/players/profile/${foundPlayer.id}`); //
    })
    .catch(err => {
        res.redirect('/players/login');
    })
});

router.get('/profile/:id', (req, res) => {
    Player.findByPk(req.params.id, {
        include: [{ model: Team }, { model: Pokemon }],     //add Team and Pokemon data for this player to player.dataValues
    }).then((player) => {
        Pokemon.findAll().then((pokemon) => {
            Team.findAll().then((teams) => {
                // console.log(player.dataValues);
                res.render('players/profile.ejs', {
                    player: player,
                    pokemon: pokemon,
                    teams: teams
                });
            });
        });
    });
});

router.put('/profile/:id', (req, res) => {    
    Player.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    }).then((updatedPlayer) => {
        Pokemon.findOne({ where: { name: req.body.pokemon } }).then(foundPokemon => {
            Player.findByPk(req.params.id).then(foundPlayer => {
                foundPlayer.addPokemon(foundPokemon);
                res.redirect(`/players/profile/${req.params.id}`);
            });
        });
    });
});

router.delete('/profile/:id', (req, res) => {
    Player.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect('/');
    });
});

module.exports = router;