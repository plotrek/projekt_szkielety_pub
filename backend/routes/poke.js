const router = require("express").Router()
const {Pokes, validate} = require("../models/poke")
const {Moves} = require("../models/move");

router.post("/add", async (req, res) => {
    try {
        const {error} = validate(req.body)
        if (error) {
            return res.status(400).send({message: error.details[0].message})
        }
        const poke = await Pokes.findOne({pokeName: req.body.pokeName})
        if (poke) {
            return res
                .status(409)
                .send({message: "Taki pokemon juz istnieje!"})
        }
        await new Pokes({...req.body}).save()
        res.status(201).send({message: "Dodano pokemona"})
    } catch (error) {
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
        console.log((error))
    }
})
router.post("/delete", async (req, res) => {
    try {
        const poke = await Pokes.findOne({pokeName: req.body.pokeName})
        if (!poke) {
            return res
                .status(409)
                .send({message: "Taki pokemon juz nie istnieje!"})
        }
        poke.deleteOne()
        res.status(201).send({message: "Usunieto pokemona"})
    } catch (error) {
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
        console.log((error))
    }
})

router.post("/modify/:name", async (req, res) => {
    try {
        const poke = await Pokes.findOne({pokeName: req.params.name})
        if (!poke) {
            return res
                .status(409)
                .send({message: "Taki pokemon nie istnieje!"})
        }
        poke.updateOne({$set: req.body}, {runValidators: true}).catch(
            error => {
                console.log(error);
            })
        res.status(201).send({message: "Zmieniono dane pokemona"})
    } catch (error) {
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
        console.log((error))
    }
})

router.get("/details/:name", async (req, res) => {
    try {
        const pokes = await Pokes.findOne({pokeName: req.params.name})
        if (!pokes) {
            return res
                .status(409)
                .send({message: "Taki atak nie istnieje!"})
        }
        res.status(201).send(pokes)

    } catch (error) {
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
        console.log((error))
    }
})

router.get("/", async (req, res) => {
    try {
        const poke = await Pokes.find({}, "pokeName")
        if (poke.length === 0) {
            return res
                .status(409)
                .send({message: "Brak pokemonow w bazie"})
        }
        res.status(201).send(poke)

    } catch (error) {
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
        console.log((error))
    }
})
module.exports = router