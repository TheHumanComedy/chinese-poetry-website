const {
  Tang,
  Song
} = require('../models/index')
let $util = require('../helper/util')
let _ = require('lodash')

/*------------------------------api---------------------------*/

exports.pullPoetry = async (ctx, next) => {
  let options = $util.getQueryObject(ctx.request.url)
  let params = {}
  let sortParam = {}

  let limitNumber = parseInt(options.pageSize)
  let skipNumber = (parseInt(options.pageCount) - 1) * limitNumber
  try {
    return await Links.find(params)
      .sort(sortParam)
      .limit(limitNumber)
      .skip(skipNumber)
      .exec()
      .then(async result => {
        /* ----------------------@Add Default----------------------*/
        if (result.length <= 0) {
          result.push({
          })
        }
        $util.sendSuccess(ctx, result)
      })
  } catch (error) {
    $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
  }
}

exports.savePoetry = async (ctx, next) => {
  let options = ctx.request.body
  const cmodels = options.dynasty === 'tang' ? Tang : Song
  try {
    return await cmodels.create(options).then(async result => {
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
