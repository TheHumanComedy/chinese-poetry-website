let mongoose = require('mongoose')

/* Solve Problem: (node) DeprecationWarning:
  Mongoose: mpromise (mongoose's default promise library) is deprecated
*/
mongoose.Promise = global.Promise

// 定义 LinksSchema 数据表和数据结构
const TangShiSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  paragraphs: {
    type: Array,
    unique: true,
    default: []
  }
})

module.exports = mongoose.model('TangShi', TangShiSchema)
