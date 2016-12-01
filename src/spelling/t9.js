import * as io from '../utils/io.js'

const map = {
  ' ': '0',
  'a': '2',
  'b': '22',
  'c': '222',
  'd': '3',
  'e': '33',
  'f': '333',
  'g': '4',
  'h': '44',
  'i': '444',
  'j': '5',
  'k': '55',
  'l': '555',
  'm': '6',
  'n': '66',
  'o': '666',
  'p': '7',
  'q': '77',
  'r': '777',
  's': '7777',
  't': '8',
  'u': '88',
  'v': '888',
  'w': '9',
  'x': '99',
  'y': '999',
  'z': '9999'
}

const charToDigit = char => map[char]

const joinWithSpace = (prev, current) => {
  const prevChar = prev[prev.length - 1]
  const nextChar = current[0]
  if (prevChar === nextChar) {
    return `${prev} ${current}`
  }
  return prev + current
}

const notEmpty = (line) => line && line.length

const formatLine = (line, index) => `Case #${index + 1}: ${line}`

export const convertLine = (line) => Array.from(line).map(charToDigit).reduce(joinWithSpace, '')

export const convertMulti = (input) => input.split('\n').slice(1).filter(notEmpty).map(convertLine)

export const convert = (input) => convertMulti(input).map(formatLine).join('\n')

export default(file) => io.readAsString(file).then(convert).then(io.writeFile)
