const {getAll, getOneById, editOneById, addToDB, deleteOneById} = require("./repository.js")
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
    
    router.post("/add", (req, res) =>{
        addToDB(collection, req.body)
        .then(()=>{
            getAll(collection)
            .then(result => res.json(result))
        })
    })

    router.patch("/edit/:id", (req, res)=>{
        const id = req.params.id
        editOneById(collection, id, req.body)
        .then(()=>{
            getAll(collection)
            .then(result => res.json(result))
        })
    })
    
    router.delete("/delete/:id", (req, res) => {
        const id = req.params.id
        deleteOneById(collection, id)
        .then(()=>{
            getAll(collection)
            .then(result => res.json(result))
        })
        
    })


    return router


};

module.exports = createRouter