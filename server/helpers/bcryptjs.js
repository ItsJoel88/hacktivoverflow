const bcryptjs = require('bcryptjs')

module.exports = {
    hash(input) {
        return bcryptjs.hashSync(input, 10)
    },
    compare(input, hash) {
        return bcryptjs.compareSync(input, hash)
    }
}