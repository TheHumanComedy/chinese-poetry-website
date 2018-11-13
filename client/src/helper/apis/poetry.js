import $ajax from '@helper/ajax'

function requestUrl(path) {
  return `/api/${path}`
}

export default {
  getRandomPoetry(data) {
    return $ajax.get(requestUrl('getRandomPoetry'), data)
  }
}