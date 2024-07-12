const mongoose = require('mongoose')
const modelName = 'tags'
const schema = new mongoose.Schema({
   tag: {
      type: String,
      required: true
   },
   color: {
      type: String,
      required: true
   }
})

module.exports = mongoose.model(modelName, schema)
