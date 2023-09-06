import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import AuthRouter from './Routers/AuthRouter.js'
import NoteRouter from './Routers/NotesRouter.js'
const app = express()
const PORT = process.env.PORT || 5000
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use(cors())

app.use('/api/auth/', AuthRouter)
app.use('/api/note/', NoteRouter)
    // test
app.get('/', (req, res) => {

    res.send("hello")
})

// connect to mongodb

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`site is running at ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})