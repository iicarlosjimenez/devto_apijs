const createError = require('http-errors')
const Users = require('../models/users.model')
const { encrypt } = require('../lib/encrypt')
const validator = require('../lib/validator')

async function index() {
   const users = await Users.find({}, {password:0})

   return users
}

async function store(data) {
   const rules = {
      'name': ['required', 'string'],
      'email': ['required', 'string', 'email'],
      'password': ['required', 'string']
   }
   const validate = validator(rules, data)

   if (!validate.validated)
      throw createError(400, JSON.stringify(validate.messages))


   const userFound = await Users.findOne({ email: data.email })

   if (userFound)
      throw createError(400, "Email already in use")

   data.password = await encrypt(data.password)
   if (!data.profilePic)
   {
      const profileName = data.name.toLowerCase().replace(" ", '_')
      data.profilePic = `https://api.dicebear.com/8.x/identicon/svg?seed=${profileName}`
   }

   const koder = await Users.create(data)
   return koder
}

async function show(id) {
   const koder = await Users.findById(id, { password: 0 })
   return koder
}

async function update(id, data) {
   data.updated_at = new Date()
   if (data.password) 
      data.password = await encrypt(data.password)

   const koder = await Users.findByIdAndUpdate(id, data, {
      new: true
   })
   return koder
}

async function destroy(id) {
   await Users.findByIdAndDelete(id)
   return
}

module.exports = {
   index,
   store,
   show,
   update,
   destroy
}
