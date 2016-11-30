import * as fs from 'fs'
import {EOL} from 'os'

export const endOfLine = () => EOL

const readAsync = (file) => (resolve, reject) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data.toString())
    }
  })
}

const writeAsync = (text) => (resolve, reject) => fs.writeFile('output.log', text, (err) => {
  if (err) {
    reject(err)
  } else {
    resolve()
  }
})

export const readAsString = (file) => new Promise(readAsync(file))
export const writeFile = (text) => new Promise(writeAsync(text))
