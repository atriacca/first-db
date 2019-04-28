const express = require('express')
const throneRouter = express.Router()
// Import the model(s) these routes will interact with
const Character = require('../models/character.js')

// GET All -
// throneRouter.get("/", (req, res, next) => {
//     // .find() is a get All method, 
//     // returns an array of the collection
//     Character.find((err, characters) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(characters)
//     })
    
// })

// GET ALL - with async - await
throneRouter.get("/", async (req, res, next) => {
    try {
        const characters = await Character.find()
        return res.status(200).send(characters)
    }
    catch(err){
        res.status(500)
        return next(err)
    }
})


// POST One
throneRouter.post("/", (req, res, next) => {
    // create new Object using the character Schema
    const newCharacter = new Character(req.body)
    // .save() saves a new object to the DB collection
    newCharacter.save((err, newSavedCharacter) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newSavedCharacter)
    })
})  

// GET ONE
throneRouter.get("/:_id", (req, res, next) => {
    Character.findOne({_id: req.params._id}, (err, character) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(character)
    })
})

// DELETE ONE - DELETE
throneRouter.delete("/:_id", (req, res, next) => {
    Character.findOneAndRemove({_id: req.params._id}, (err, deletedCharacter) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(202).send(deletedCharacter)
    })
})

// UPDATE ONE - PUT
throneRouter.put("/:_id", (req, res, next) => {
    Character.findOneAndUpdate(
        {_id: req.params._id},   // Find character by _id
        req.body,                // Update character with this object
        {new: true},             // Send back the new character after update
        (err, updatedCharacter) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedCharacter)
    })
})


module.exports = throneRouter