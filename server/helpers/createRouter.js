const {getAll, getOneById, editOneById} = require("./repository.js")
const express = require("express")


const createRouter = (collection) => {

    const router = express.Router()

    router.get("/all", (req, res)=>{
        getAll(collection)
        .then(result => res.json(result))

    })

    router.get("/:id", (req, res)=>{
        getOneById(collection, req.params)
        .then(result => res.json(result))
        
    })

    router.get("/edit/:id", (req, res)=>{
        editOneById(collection)
        .then(result => res.json(result))
        
    })

    return router


};

module.exports = createRouter