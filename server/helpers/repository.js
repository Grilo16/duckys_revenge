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

const editOneById = (collection, id) =>{
    return collection
            .find()
            .toArray()
}


module.exports = {getAll, getOneById, editOneById}