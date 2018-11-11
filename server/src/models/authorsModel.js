let mongoose = require('mongoose')

/* Solve Problem: (node) DeprecationWarning:
  Mongoose: mpromise (mongoose's default promise library) is deprecated
*/
mongoose.Promise = global.Promise

// 定义 LinksSchema 数据表和数据结构
const AuthorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    unique: true,
    required: true
  },
  dynasty: {
    type: String,
    enum: ['Tang', 'Song'],
    default: 'Tang'
  }
})

module.exports = mongoose.model('Authors', AuthorsSchema)
