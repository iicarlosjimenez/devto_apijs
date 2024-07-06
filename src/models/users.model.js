const mongoose = require('mongoose')
const modelName = 'users'
const schema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100
   },
   profilePic: {
      type: String,
      default: "https://api.dicebear.com/8.x/identicon/svg?seed=default"
   },
   email: {
      type: String,
      required: true,
      unique: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
   },
   password: {
      type: String,
      required: true
   },
   created_at: {
      type: Date,
      default: Date.now
   },
   updated_at: {
      type: Date
   }
})

module.exports = mongoose.model(modelName, schema)
