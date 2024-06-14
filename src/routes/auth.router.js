const express = require('express')
const authCase = require('../usecases/auth.usecase.js')

const router = express.Router();

// Login
router.post('/login', async (request, response) => {
   try {
      const { email, password } = request.body
   
      const token = await authCase.login(email, password)
   
      response.json({
         status: true,
         data: {
            token
         }
      })
   } catch (error) {
      response.status(error.status || 500)
      response.json({
         error: error.message
      })
   }
})

module.exports = router