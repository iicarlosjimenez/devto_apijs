const express = require('express')

const app = express()

const authRouter = require('./routes/auth.router.js')
const usersRouter = require('./routes/users.router')

app.use(express.json()) // Middleware

app.use('/auth', authRouter)
app.use('/users', usersRouter)

// Rutas
app.get('/', (request, response) => {
   response.json({
      message: 'DevTo APIv1'
   })
})

module.exports = app
