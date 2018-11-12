const fs = require('fs')
const glob = require('glob')
const { Authors, Tang, Song } = require('./../server/src/models')

const songAuthors = require('../poetry/poetry/authors.song.json')
const tangAuthors = require('../poetry/poetry/authors.tang.json')

/**
 * @desc 保存某个朝代的作者列表
 * @param {Array<Author>} authors - 作者列表
 * @param {String} dynasty - 朝代
 */
function saveAuthors(authors, dynasty) {
  authors.forEach(author => {
    new Authors({
      desc: author.desc || 'N/A',
      name: author.name || 'N/A',
      dynasty
    }).save(err => {
      if (err) {
        console.log('🐛 Failed At', author.name, err)
      } else {
        console.log(`✓ Author Saved (dynasty = ${dynasty})`, author.name)
      }
    })
  })
}

saveAuthors(songAuthors, 'Song')
saveAuthors(tangAuthors, 'Tang')

function savePoetry(poetry, dynasty) {
  return new Promise((resolve, reject) => {
    if (poetry.title && poetry.author && poetry.paragraphs) {
      const params = {
        title: poetry.title,
        author: poetry.author,
        paragraphs: poetry.paragraphs
      }
      const Poetry = dynasty === 'tang' ? Tang : Song
      new Poetry(params).save(err => {
        if (err) {
          console.log('🐛 Failed At', poetry.title, err)
          reject()
        } else {
          console.log(`✓ Poetry Saved (dynasty = ${dynasty})`, poetry.title)
          resolve()
        }
      })
    }
  })
}

/**
 * @desc 保存某个朝代的作品列表
 */
const jsonList = glob.sync('../poetry/poetry/poet.+(song|tang)*.json')
jsonList.forEach(async jsonfile => {
  let poetries = JSON.parse(fs.readFileSync(jsonfile, 'utf-8'))
  const dynasty = jsonfile.includes('song') ? 'song' : 'tang'
  poetries.forEach(async poetry => {
    console.log(`✓ Saving (dynasty = ${dynasty})`, poetry.title)
    await savePoetry(poetry, dynasty)
  })
})
