const ObjectId = require("mongodb").ObjectId


const getAll = (collection) => {
        return collection
                .find()
                .toArray()
}

const getOneById = (collection, id) => {
    return collection
            .find({_id:ObjectId(id)})
            .toArray()
}

const editOneById = (collection, id, patchObject) =>{
        return collection
                .updateOne({_id:ObjectId(id)}, {$set: patchObject})
}

const addToDB = (collection, objToAdd) =>{
        return collection
                .insertOne(objToAdd)
}

const deleteOneById = (collection, id) =>{
        return collection
                .deleteOne({_id:ObjectId(id)})
}


module.exports = {getAll, getOneById, editOneById, addToDB, deleteOneById}