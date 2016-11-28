import { sort } from '../src/sorter'
import { expect } from 'chai'

describe('sort', () => {

    const data = [{
        name: "Foo"
    }, {
        name: "Bar"
    }, {
        name: "Zab"
    }]

    it('should sort string property', () => {
        const sorted = sort(data, 'name')
        expect(sorted[0].name).to.eq('Bar')
        expect(sorted[1].name).to.eq('Foo')
        expect(sorted[2].name).to.eq('Zab')
    })
})
