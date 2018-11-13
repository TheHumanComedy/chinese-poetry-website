const fs = require('fs')
const glob = require('glob')
const AsyncMapLimit = require('async/mapLimit')

const { Authors, Tang, Song } = require('./../server/src/models')
let songAuthors = require('../poetry/poetry/authors.song.json')
let tangAuthors = require('../poetry/poetry/authors.tang.json')

/**
 * @desc 保存某个朝代的作者列表
 * @param {Array<Author>} authors - 作者列表
 * @param {String} dynasty - 朝代
 */
function saveAuthorIntoDb(authors, dynasty) {
  authors.forEach(async author => {
    await new Authors({
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
  authors = null
}

function savePoetryInfoDb(poetry, dynasty) {
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

const $waitForTimeout = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(true)
      } catch (e) {
        reject(false)
      }
    }, delay)
  })
}

function traversePoetrysList(poetries, dynasty) {
  return new Promise((resolve, reject) => {
    try {
      poetries.forEach(async poetry => {
        console.log(`🚧  Saving Poetry (dynasty = ${dynasty})`, poetry.title)
        await $waitForTimeout(20)
        await savePoetryInfoDb(poetry, dynasty)
      })
      poetries = null
      resolve(0)
    } catch (err) {
      console.log(`❌ Something went wrong[@traversePoetrysList]: ${err}`)
      reject(err)
    }
  })
}

async function main () {
  saveAuthorIntoDb(songAuthors, 'Song')
  songAuthors = null
  await $waitForTimeout(1314)

  saveAuthorIntoDb(tangAuthors, 'Tang')
  tangAuthors = null
  await $waitForTimeout(1314)

  const poetryJsonList = glob.sync('../poetry/poetry/poet.+(song|tang)*.json')
  AsyncMapLimit(poetryJsonList, 1, async jsonfile => {
    await $waitForTimeout(1314)
    let poetries = JSON.parse(fs.readFileSync(jsonfile, 'utf-8'))
    const dynasty = jsonfile.includes('song') ? 'song' : 'tang'
    await traversePoetrysList(poetries, dynasty)
  }, err => {
    if (err) throw err
  })
}

main()