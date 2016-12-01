import {expect} from 'chai'
import td from 'testdouble'
import * as io from '../src/utils/io.js'
import reverseWords, {reverse, reverseLine, formatOutput} from '../src/reverse-words/reverse-words.js'

describe('reverse words', () => {

  beforeEach(function(){
    let eol = td.replace(io, 'endOfLine')
    td.when(eol()).thenReturn('\n')
  })

  afterEach(function(){
    td.reset()
  })

  it('inject EOL', () => {
    const eol = io.endOfLine()
    expect(eol).to.eq('\n')
  })

  it('reverse line', () => {
    expect(reverseLine('this is a test')).to.eq('test a is this')
  })

  it('do not reverse single word', () => {
    expect(reverseLine('foobar')).to.eq('foobar')
  })

  it('trim white space', () => {
    expect(reverseLine('  bar bazz ')).to.eq('bazz bar')
  })

  it('formatOutput', () => {
    const raw = ['foobar', 'boo', 'baz']
    const result = formatOutput(raw)
    expect(result).to.eq(`Case #1: foobar\nCase #2: boo\nCase #3: baz`)
  })

  it('reverse words order', () => {
    const input = `3
      this is a test
      foobar
      all your base`
    const result = reverse(input)

    expect(result).to.have.length(3)
    expect(result[0]).to.eq('test a is this')
    expect(result[1]).to.eq('foobar')
    expect(result[2]).to.eq('base your all')
  })

  it('reverseWords', () => {
    const readAsString = td.replace(io, 'readAsString')
    const writeFile = td.replace(io, 'writeFile')
    const input = `3
      this is a test
      foobar
      all your base`

    td.when(readAsString('input.file')).thenReturn(Promise.resolve(input))

    return reverseWords('input.file').then(() => {
      td.verify(writeFile(`Case #1: test a is this\nCase #2: foobar\nCase #3: base your all`))
    })
  })

})
