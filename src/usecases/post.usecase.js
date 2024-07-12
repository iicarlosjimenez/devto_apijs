const slugify = require('slugify');
const createError = require('http-errors')
const usersModel = require('../models/users.model')
const postsModel = require('../models/posts.model')
const validator = require('../lib/validator')

async function index() {
   const posts = await postsModel.find().populate("user")

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


   const userFound = await usersModel.findById(data.user)

   if (!userFound)
      throw createError(400, "User is not found")

   // Generar el slug a partir del título
   const slug = slugify(data.title, {
      lower: true, // Convertir a minúsculas
      strict: true // Eliminar caracteres no permitidos
   });

   const slugExists = await postsModel.findOne({ slug });
   if (slugExists)
      throw createError(400, "Post is already exists")

   // Agregar el slug a los datos del post
   const postData = {
      ...data,
      slug
   };

   const post = await postsModel.create(postData)
   return post
}

async function show(id) {
   const post = await postsModel.findById(id)
   return post
}

async function update(id, data) {
   const post = await postsModel.findByIdAndUpdate(id, data, {
      new: true
   })
   return post
}

async function destroy(id) {
   await postsModel.findByIdAndDelete(id)
   return
}

module.exports = {
   index,
   store,
   show,
   update,
   destroy
}
