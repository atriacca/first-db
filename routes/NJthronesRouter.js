const express = require('express')
const throneRouter = express.Router()
const Character = require('../models/character.js')


// GET All -
throneRouter.get("/", (req, res, next) => {
    Character.find((err, characters) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(characters)
    })
})


// POST One
throneRouter.post("/", (req, res, next) => {
    req.body.house = req.body.house.toLowerCase()
    const newCharacter = new Character(req.body)
    newCharacter.save((err, newSavedCharacter) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newSavedCharacter)
    })
})  


module.exports = throneRouter