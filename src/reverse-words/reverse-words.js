import * as io from '../utils/io.js'

const readLine = (txt) => txt.split('\n').slice(1)

const notEmpty = txt => txt && txt.length

export const reverseLine = (line) => line.split(' ').reverse().join(' ').trim()

export const reverse = (data) => readLine(data).map(reverseLine).filter(notEmpty)

export const formatOutput = (lines) => lines
  .map((line, index) => `Case #${index + 1}: ${line}`)
  .join(io.endOfLine())

export default(file) => io.readAsString(file)
  .then(reverse)
  .then(formatOutput)
  .then(result => io.writeFile(result))
  // .catch(e => console.error(e))
