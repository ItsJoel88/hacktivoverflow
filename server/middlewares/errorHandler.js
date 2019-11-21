module.exports = (err, req, res, next) => {
    if (err.status && err.message) {
        res.status(err.status).json({ message: err.message })
    } else if (err.name === 'ValidationError') {
        let errors = []
        for (key in err.errors) {
            errors.push(err.errors[key].message)
        }
        res.status(400).json(errors)
    } else if (err.name === 'CastError') {
        res.status(404).json({ message: 'We couldn\'t find what you\'re looking for' })
    }
    console.log(err)
}