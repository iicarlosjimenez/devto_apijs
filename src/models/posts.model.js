const mongoose = require('mongoose')
const modelName = 'posts'
const schema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100
   },
   image: {
      type: String
   },
   body: {
      type: String,
      required: true
   },
   user: {
      type: mongoose.Types.ObjectId,
      ref: "users"
   },
   tags: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: "tags"
   }],
   created_at: {
      type: Date,
      default: Date.now
   },
   updated_at: {
      type: Date
   }
})

module.exports = mongoose.model(modelName, schema)
