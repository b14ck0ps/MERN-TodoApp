import cors from 'cors'
import dotenv from 'dotenv'
import express, { json, urlencoded } from "express"
import { connect } from "mongoose"
import taskRoutes from "./Routes/Task.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))


const port = process.env.PORT || 3000
const connString = process.env.CONNECTION_STRING

// Database Connection
try {
    connect(connString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DATABASE
    })
    console.log("DB Connected");
} catch (error) {
    console.log(error);
}

//Routes
app.use('/api/todo', taskRoutes)

//Server
app.listen(port, () => console.log(`server running at ${port}`))