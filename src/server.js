const express = require('express')

const app = express()

app.use(express.json()) // Middleware

// Rutas
app.get('/', (request, response) => {
   response.json({
      message: 'DevTo APIv1'
   })
})

module.exports = app
