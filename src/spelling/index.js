import t9 from './t9.js'

const args = process.argv.slice(2)
const filename = args[0] || require('path').resolve('src/spelling/C-small-practice.in')

t9(filename)
