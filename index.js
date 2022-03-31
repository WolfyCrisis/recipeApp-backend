import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import mongooseDB from './src/config/db.js'

import {
    userRoutes,
    recipeRoutes
} from './src/routes/index.js'

dotenv.config()

mongooseDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/recipe', recipeRoutes)


const server = app.listen(process.env.PORT, function () {
    const host = server.address().address
    const port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })