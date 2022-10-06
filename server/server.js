const express = require("express")
const app = express()
const cors = require("cors")
const MongoClient = require("mongodb").MongoClient
const createRouter = require("./helpers/createRouter.js")

app.use(express.json())
app.use(cors())

MongoClient.connect("mongodb://localhost:27017", {useUnifiedTopology: true})
.then((client)=>{
    const db = client.db("exploration")
    const collection = db.collection("users")
    const router = createRouter(collection)
    app.use("/", router)
})

app.listen(9000, ()=>{
    console.log("listening on 9000")
})