require('dotenv').config()

const express = require('express')
const {connectToDb, getDb} = require('./db')
//init app & middleware
const app = express()

//db connection
let db

connectToDb(process.env.DB_projekt,(err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})

// routes

app.get('/pokes', (req, res) => {
    let pokemons = []
    db.collection('pokemon')
        .find()
        .forEach(pokemon => pokemons.push(pokemon))
        .then(() => {
            res.status(200).json(pokemons)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch the documents'})

        })
})
