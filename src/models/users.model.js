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
      default: "https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F516166%2F079ac96c-702d-46b5-b1b5-8aada22dbc4e.png"
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
