const fs = require('fs')
const glob = require('glob')

const Author = require('../server/src/models/authorModel')
const Tang = require('../server/src/models/tangModel')
const Song = require('../server/src/models/songModel')

const songAuthors = require('../poetry/json/authors.song.json')
const tangAuthors = require('../poetry/json/tang.song.json')

/**
 * 保存某个朝代的作者列表
 *
 * @param {Array<Author>} authors - 作者列表
 * @param {String} dynasty - 朝代
 */
function save (authors, dynasty) {
  authors.forEach(author => {
    new Author({
      ...author,
      dynasty
    }).save(err => {
      if (err) {
        console.log('Failed at', data.name, err);
      } else {
        console.log('Saved', data.name);
      }
    })
  })
}

save(songAuthors, 'song')
save(tangAuthors, 'tang')

const jsonList = glob.sync('../poetry/json/*+(song|tang)*.json')
jsonList.forEach(jsonfile => {
  const poetries = JSON.parse(fs.readFileSync(jsonfile, 'utf-8'))
  const dynasty = jsonfile.split('.')[1]
  poetries.forEach(poetry => {
    let Poetry = Song
    if (dynasty === 'tang') {
      Poetry = Tang
    }
    new Poetry(poetry).save(err => {
      if (err) {
        console.log('Failed at', data.title, err);
      } else {
        console.log('Save', data.title);
      }
    })
  })
})
