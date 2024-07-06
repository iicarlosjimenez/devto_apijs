const express = require('express')
const postCase = require('../usecases/post.usecase')
const auth = require('../middlewares/auth.middleware')

const router = express.Router()

// Index
router.get("/", async (request, response) => {
   try {
      const posts = await postCase.index()
      response.json({
         sucess: true,
         data: {
            posts
         }
      })
   } catch (error) {
      response.status(error.status || 500);
      response.json({
         success: false,
         error: error.message,
      })
   }
})

// store
router.post('/', auth, async (request, response) => {
   try {
      request.body.user = request.user.id
      const post = await postCase.store(request.body)
      response.json({
         success: true,
         data: {
            post
         }
      })
   } catch (error) {
      response.status(error.status || 500);
      response.json({
         success: false,
         error: error.message,
      })
   }
})

// show
router.get('/:id', async (request, response) => {
   try {
      const { id } = request.params
      const post = await postCase.show(id)
      response.json({
         success: true,
         data: {
            post
         }
      })
   } catch (error) {
      response.status(error.status || 500);
      response.json({
         success: false,
         error: error.message,
      })
   }
})

// update
router.patch('/:id', auth, async (request, response) => {
   try {
      const { id } = request.params
      const post = await postCase.update(id, request.body)
      response.json({
         sucess: true,
         data: {
            post
         }
      })
   } catch (error) {
      response.status(error.status || 500);
      response.json({
         success: false,
         error: error.message,
      })
   }
})

// destroy
router.delete("/:id", auth, async (request, response) => {
   try {
      const { id } = request.params
      await postCase.destroy(id)
      response.json({
         sucess: true,
         data: {

         }
      })
   } catch (error) {
      response.status(error.status || 500);
      response.json({
         success: false,
         error: error.message,
      })
   }
})


module.exports = router
