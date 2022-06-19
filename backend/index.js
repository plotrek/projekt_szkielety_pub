require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const pokeRoutes = require("./routes/poke")
const moveRoutes = require("./routes/moves")

const connection = require('./db')
connection(process.env.DB)

app.use(express.json())
app.use(cors())
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))
// routes
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/poke", pokeRoutes)
app.use("/api/move", moveRoutes)



