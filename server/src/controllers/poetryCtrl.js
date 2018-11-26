const {
  Tang,
  Song
} = require('../models/index')
let $util = require('../helper/util')
let _ = require('lodash')

/*------------------------------api---------------------------*/
exports.getMorePoetry = async (ctx, next) => {
  try {
    const options = ctx.request.query
    const Cmodels = options.dynasty === 'tang' ? Tang : Song
    let limitNumber = parseInt(options.size || 10)
    let skipNumber = (parseInt(options.page || 1) - 1) * limitNumber
    return await Cmodels.find({})
      .limit(limitNumber)
      .skip(skipNumber)
      .exec().then(result => {
        $util.sendSuccess(ctx, result)
      })
  } catch (error) {
    return $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.getPoetryById = async (ctx, next) => {
  try {
    const options = ctx.request.query
    const Cmodels = options.dynasty === 'tang' ? Tang : Song
    const params = { _id: options._id }
    const tangPoetry = await Cmodels.findOne(params).exec()
    if (tangPoetry) {
      return $util.sendSuccess(ctx, tangPoetry)
    }
    const songPoetry = await Cmodels.findOne(params).exec()
    return $util.sendSuccess(ctx, songPoetry)
  } catch (error) {
    return $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.getRandomPoetry = async (ctx, next) => {
  try {
    const options = ctx.request.query
    const Cmodels = options.dynasty === 'tang' ? Tang : Song
    return await Cmodels.aggregate([
      { $sample: { size: +options.size || 10 } }
    ]).then(async result => {
      $util.sendSuccess(ctx, result)
    })
  } catch (error) {
    return $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.searchPoetry = async (ctx, next) => {
  try {
    const options = ctx.request.query
    const Cmodels = options.dynasty === 'tang' ? Tang : Song
    let limitNumber = parseInt(options.size || 100)
    let skipNumber = (parseInt(options.page || 1) - 1) * limitNumber
    limitNumber = Math.min(limitNumber, 300)

    const authorList = await Cmodels.find({ author: { $regex: options.keyword } })
      .limit(limitNumber)
      .skip(skipNumber)
    if (authorList.length > 0) { return $util.sendSuccess(ctx, authorList) }

    const titleList = await Cmodels.find({ title: { $regex: options.keyword } })
      .limit(limitNumber)
      .skip(skipNumber)
    if (titleList.length > 0) { return $util.sendSuccess(ctx, titleList) }

    const paragraphsList = await Cmodels.find({ paragraphs: { $regex: options.keyword } })
      .limit(limitNumber)
      .skip(skipNumber)
    if (paragraphsList.length > 0) { return $util.sendSuccess(ctx, paragraphsList) }

    return $util.sendSuccess(ctx, [])
  } catch (error) {
    if (error.code === 11000) {
      return $util.sendFailure(ctx, 'linkHaveBeenAdded')
    }
    $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.savePoetry = async (ctx, next) => {
  try {
    const options = ctx.request.query
    const Cmodels = options.dynasty === 'tang' ? Tang : Song
    return await Cmodels.create(options).then(async result => {
      $util.sendSuccess(ctx, result)
    })
  } catch (error) {
    if (error.code === 11000) {
      return $util.sendFailure(ctx, 'linkHaveBeenAdded')
    }
    $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.getAllPoetryCount = async (ctx, next) => {
  try {
    let options = ctx.request.query
    const Cmodels = options.dynasty === 'tang' ? Tang : Song
    let count = await Cmodels.find({}).count()
    $util.sendSuccess(ctx, count)
  } catch (error) {
    $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}
