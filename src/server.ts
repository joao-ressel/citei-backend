import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { AppDataSource } from './database/data-source'
import routers from './app/routes/routes'
import errorHandler from './app/Errors/ErrorHandle'

const app = express() // iniciliazando o express
app.use(cors()) // habilitando o cors
app.use(express.json()) // habilitando o express para receber json
app.use(routers) // habilitando as rotas

// inicializando o banco de dados
AppDataSource.initialize().then(() => {
    // inicializando o servidor
    app.listen(3000, () => {
        console.log('Server is running on port 3333')
    })
}).catch((error) => {
    console.log('Error on initialize database', error)
})
