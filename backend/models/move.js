const mongoose = require("mongoose")
const Joi = require("joi")

const movesSchema = new mongoose.Schema({
    moveName: { type: String, required: true },
    type: { type: String, required: true },
    power: { type: Number, required: true },
})
const Moves = mongoose.model("poke_moves", movesSchema)

const validate = (data) => {
    const schema = Joi.object({
        moveName: Joi.string().required().label("Move Name"),
        type: Joi.string().required().label("Type"),
        power: Joi.number().required().label("Power")
    })
    return schema.validate(data)
}
module.exports = { Moves, validate}