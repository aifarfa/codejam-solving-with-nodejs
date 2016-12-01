import reverseWords from './reverse-words.js'
import path from 'path'

const args = process.argv.slice(2)
const filename = args[0] || path.resolve('./src/reverse-words/B-large-practice.in')
reverseWords(filename)
