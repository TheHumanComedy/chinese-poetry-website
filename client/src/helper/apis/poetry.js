/** @format */

import $ajax from '@helper/ajax'
import Vue from 'vue'

/* @desc: 统一组装 HTTP 请求的 Url 地址 */
function composeApiPath(api) {
  const BASE_URL = Vue.config.isProduction ? 'http://poem.lovejade.cn:8888' : ''
  return `${BASE_URL}/api/${api}`
}

export default {
  getMorePoetry(data) {
    return $ajax.get(composeApiPath('getMorePoetry'), data)
  },
  getPoetryById(data) {
    return $ajax.get(composeApiPath('getPoetryById'), data)
  },
  getRandomPoetry(data) {
    return $ajax.get(composeApiPath('getRandomPoetry'), data)
  }
}
