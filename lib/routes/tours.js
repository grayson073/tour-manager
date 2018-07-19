const router = require('express').Router();
const Tour = require('../models/tour');
const { HttpError } = require('../util/errors');

const make404 = id => new HttpError({
    code: 404,
    message: `No tour with id ${id}`
});

module.exports = router

    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(tour => res.json(tour))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Tour.find()
            .lean()
            .then(tours => res.json(tours))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Tour.findById(req.params.id)
            .lean()
            .then(tour => {
                if(!tour) {
                    next(make404(req.params.id));
                }
                else {
                    res.json(tour);
                }
            })
            .catch(next);
    })