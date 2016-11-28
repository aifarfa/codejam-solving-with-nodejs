export const sort = (list = [], key = '') => list.sort(compare(key))

const compare = key => (a, b) => a[key].localeCompare(b[key])
