const createError = require('http-errors')
const Users = require('../models/users.model')
const Posts = require('../models/posts.model')
const validator = require('../lib/validator')

async function index() {
   const posts = await Posts.find().populate("user")

   return posts
}

async function store(data) {
   const rules = {
      'title': ['required', 'string'],
      'body': ['required', 'string'],
      'user': ['required', 'string']
   }
   const validate = validator(rules, data)

   if (!validate.validated)
      throw createError(400, JSON.stringify(validate.messages))


   const userFound = await Users.findById(data.user)

   if (!userFound)
      throw createError(400, "User is not found")

   const post = await Posts.create(data)
   return post
}

async function show(id) {
   const post = await Posts.findById(id)
   return post
}

async function update(id, data) {
   const post = await Posts.findByIdAndUpdate(id, data, {
      new: true
   })
   return post
}

async function destroy(id) {
   await Posts.findByIdAndDelete(id)
   return
}

module.exports = {
   index,
   store,
   show,
   update,
   destroy
}
