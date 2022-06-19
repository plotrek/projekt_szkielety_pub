const router = require("express").Router()
const {Moves, validate} = require("../models/move")

router.post("/add", async (req, res) => {
    try {
        const {error} = validate(req.body)
        if (error) {
            return res.status(400).send({message: error.details[0].message})
        }
        const moves = await Moves.findOne({moveName: req.body.moveName})
        if (moves) {
            return res
                .status(409)
                .send({message: "Taki atak juz istnieje!"})
        }
        console.log(req.body)
        await new Moves({...req.body}).save()
        res.status(201).send({message: "Dodano atak"})
    } catch (error) {
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
        console.log((error))
    }
})
router.post("/delete", async (req, res) => {
    try {
        const moves = await Moves.findOne({moveName: req.body.moveName})
        if (!moves) {
            return res
                .status(409)
                .send({message: "Taki atak juz nie istnieje!"})
        }
        moves.deleteOne()
        res.status(201).send({message: "Usunieto atak"})
    } catch (error) {
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
        console.log((error))
    }
})


router.post("/modify/:name", async (req, res) => {
    try {

        const moves = await Moves.findOne({moveName: req.params.name})
        if (!moves) {
            return res
                .status(409)
                .send({message: "Taki atak nie istnieje!"})
        }
        console.log(req.body)
        moves.updateOne({$set: req.body}, {runValidators: true}).catch(
            error => {
                console.log(error);
            })
        res.status(201).send({message: "Zmieniono dane ataku"})
    } catch (error) {
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
        console.log((error))
    }
})

router.get("/details/:name", async (req, res) => {
    try {
        const moves = await Moves.findOne({moveName: req.params.name})
        if (!moves) {
            return res
                .status(409)
                .send({message: "Taki atak nie istnieje!"})
        }
        res.status(201).send(moves)

    } catch (error) {
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
        console.log((error))
    }
})
router.get("/detail/:name", async (req, res) => {
    try {
        const moves = await Moves.find({type: req.params.name})
        if (!moves) {
            return res
                .status(409)
                .send({message: "Taki atak nie istnieje!"})
        }
        res.status(201).send(moves)

    } catch (error) {
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
        console.log((error))
    }
})

router.get("/", async (req, res) => {
    try {
        const moves = await Moves.find({}, "moveName")
        if (moves.length === 0) {
            return res
                .status(409)
                .send({message: "Brak atakow w bazie"})
        }
        res.status(201).send(moves)

    } catch (error) {
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
        console.log((error))
    }
})
module.exports = router