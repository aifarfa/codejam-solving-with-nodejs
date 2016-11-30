import reverseWords from './reverse-words.js'

const args = process.argv.slice(2)
const filename = args[0]
reverseWords(filename)
