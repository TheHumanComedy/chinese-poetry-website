const fs = require('fs')
const glob = require('glob')
const {
  Authors,
  Tang,
  Song
} = require('./../server/src/models')

const songAuthors = require('../poetry/json/authors.song.json')
const tangAuthors = require('../poetry/json/authors.tang.json')

/**
 * @desc 保存某个朝代的作者列表
 * @param {Array<Author>} authors - 作者列表
 * @param {String} dynasty - 朝代
 */
function saveAuthors (authors, dynasty) {
  authors.forEach(author => {
    new Authors({
      desc: author.desc || 'N/A',
      name: author.name || 'N/A',
      dynasty
    }).save(err => {
      if (err) {
        console.log('Failed at', author.name, err);
      } else {
        console.log('Author Saved', author.name);
      }
    })
  })
}

saveAuthors(songAuthors, 'Song')
saveAuthors(tangAuthors, 'Tang')

/**
 * @desc 保存某个朝代的作品列表
 */
const jsonList = glob.sync('../poetry/json/*+(song|tang)*.json')
jsonList.forEach(jsonfile => {
  const poetries = JSON.parse(fs.readFileSync(jsonfile, 'utf-8'))
  const dynasty = jsonfile.split('.')[1]
  poetries.forEach(poetry => {
    if (poetry.title && poetry.author && poetry.paragraphs) {
      const params = {
        title: poetry.title,
        author: poetry.author,
        paragraphs: poetry.paragraphs
      }
      let Poetry = dynasty === 'tang' ? Tang : Song
      new Poetry(params).save(err => {
        if (err) {
          console.log('Failed at', poetry.title, err);
        } else {
          console.log('Poetry Saved', poetry.title);
        }
      })
    }
  })
})
