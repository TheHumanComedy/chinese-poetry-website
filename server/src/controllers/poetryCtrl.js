const {
  Tang,
  Song
} = require('../models/index')
let $util = require('../helper/util')
let _ = require('lodash')

/*------------------------------api---------------------------*/
exports.getRandomPoetry = async (ctx, next) => {
  try {
    const options = ctx.request.body
    const Cmodels = options.dynasty === 'tang' ? Tang : Song
    return await Cmodels.aggregate([
      // { $match: { active: true } },
      { $sample: { size: options.size || 10 } }
    ]).then(async result => {
      console.log(result)
      $util.sendSuccess(ctx, result)
    })
  } catch (error) {
    return  $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.savePoetry = async (ctx, next) => {
  try {
    const options = ctx.request.body
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
    const cmodels = options.dynasty === 'tang' ? Tang : Song
    let count = await cmodels.find({}).count()
    $util.sendSuccess(ctx, count)
  } catch (error) {
    $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}
