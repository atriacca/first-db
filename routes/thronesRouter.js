const express = require('express')
const throneRouter = express.Router()
const Character = require('../models/character.js')


// GET All
throneRouter.get("/", (req, res, next) => {
    Character.find((err, chars) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(chars)
    })
})
//throneRouter.get("/", (req, res, next) => {
    // res.status(200)
    // next(characters)
//})

// POST one
throneRouter.post("/", (req, res, next) => {
    // req.body.house = req.body.house.toLowerCase()
        const newCharacter = new Character(req.body)
    newCharacter.save((err, newSavedCharacter) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newSavedCharacter)
    })
})
//throneRouter.post("/", (req, res, next) => {
    // const newCharacter = res.body
    // newCharacter._id = "2"
    // characters.push(newCharacter)
    // res.status(201)
    // next(newCharacter)
//})
// GET ONE
throneRouter.get("/:_id", (req, res, next) => {
    Character.findOne({_id: req.params._id}, (err, char) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(char)
    })
})

// Delete ONE - DELETE
throneRouter.delete("/:_id", (req, res, next) => {
    Character.findOneAndRemove({_id: req.params._id}, (err, deletedChar) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(deletedChar)
    })
})

// Update ONE - PUT
throneRouter.delete("/:_id", (req, res, next) => {
    Character.findOneAndUpdate(
        {_id: req.params._id}, // Find character by ID
        req.body,              // Update character with this object
        {new: true},           // Send back the new character after update
        (err, updatedChar) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(updatedChar)
    })
})

// GET All - with async
throneRouter.get("/", async (req, res, next) => {
    try {
        const chars = await Character.find()
        const houses = await House.find()
        return res.status(200).send(chars, houses)
    }
    catch(err){
        res.status(500)
        return next(err)
    }
})

module.exports = throneRouter