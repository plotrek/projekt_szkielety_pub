const mongoose = require("mongoose")
const Joi = require("joi")

const pokeSchema = new mongoose.Schema({
    pokeName: { type: String, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    stamina: { type: Number, required: true },
})
const Pokes = mongoose.model("pokemons", pokeSchema)

const validate = (data) => {
    const schema = Joi.object({
        pokeName: Joi.string().required().label("Pokemon Name"),
        attack: Joi.number().required().label("Attack"),
        defense: Joi.number().required().label("Defense"),
        stamina: Joi.number().required().label("Stamina"),
    })
    return schema.validate(data)
}
module.exports = { Pokes, validate }