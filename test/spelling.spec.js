import {expect} from 'chai'
import td from 'testdouble'
import * as io from '../src/utils/io.js'
import t9, {convert, convertLine, convertMulti} from '../src/spelling/t9.js'

describe('t9-spelling', () => {
  describe('single line', () => {
    it('spell "hi"', () => {
      expect(convertLine('hi')).to.eq('44 444')
    })

    it('spell "yes"', () => {
      const result = convertLine('yes')
      expect(result).to.eq('999337777')
    })

    it('spell "foo  bar"', () => {
      expect(convertLine('foo  bar')).to.eq('333666 6660 022 2777')
    })

    it('spell "hello world"', () => {
      expect(convertLine('hello world')).to.eq('4433555 555666096667775553')
    })

    it('accept leading space " ": 0', () => {
      expect(convertLine(' ')).to.eq('0')
    })
  })

  describe('convert multiline', () => {
    before(function () {
      const input = `4
hi
yes
foo  bar
hello world`

      this.result = convertMulti(input)
    })

    it('skip first and empty line', function () {
      expect(this.result).to.have.length(4)
    })

    it('convert each line', function () {
      expect(this.result[0]).to.eq('44 444')
    })

    it('convert last line', function () {
      expect(this.result[3]).to.eq('4433555 555666096667775553')
    })
  })

  describe('convert', () => {
    before(function () {
      this.result = convert(`2\n hi\nyes`)
    })

    it('returns single string', function () {
      expect(this.result).to.be.a('String')
    })

    it('format each line', function () {
      expect(this.result).to.eq('Case #1: 044 444\nCase #2: 999337777')
    })
  })

  describe('default', () => {
    before(function () {
      this.writeFile = td.replace(io, 'writeFile')
      const readAsString = td.replace(io, 'readAsString')
      const input = `2\nfoo  bar\nboo`
      td.when(readAsString('input.file')).thenReturn(Promise.resolve(input))
    })

    afterEach(function () {
      td.reset()
    })

    it('calls readAsString', function () {
      return t9('input.file').then(() => {
        // console.log(td.explain(this.writeFile).description)
        td.verify(this.writeFile('Case #1: 333666 6660 022 2777\nCase #2: 22666 666'))
      })
    })
  })
})
