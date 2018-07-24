const router = require('express').Router();
const Tour = require('../models/tour');
const { HttpError } = require('../util/errors');
const createStopInfo = require('../util/middleware')();

const make404 = id => new HttpError({
    code: 404,
    message: `No tour with id ${id}`
});

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router

    .post('/', (req, res, next) => {
        Tour.create(req.body)
            .then(tour => res.json(tour))
            .catch(next);
    })

    .post('/:id/stops', createStopInfo, (req, res, next) => {
        Tour.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    stops: req.body
                }
            },
            updateOptions
        )
            .then(tour => {
                if(!tour) next(make404(req.params.id));
                else res.json(tour.stops[tour.stops.length - 1]);
            })
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
                if(!tour) next(make404(req.params.id));
                else res.json(tour);
            })
            .catch(next);
    })

    .put('/:id/stops/:stopid/attendance', (req, res, next) => {
        Tour.findById(req.params.id)
            .then(tour => {
                let stop = tour.stops.id(req.params.stopid);
                stop.attendance = req.body.attendance;
                stop.save({ suppressWarning: true });
                return tour;
            })
            .then(tour => res.json(tour))
            .catch(next);
    })

    .delete('/:id/stops/:stopid', (req, res, next) => {
        Tour.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    stops: { _id: req.params.stopid }
                }
            },
            updateOptions
        )
            .then(tour => {
                if(!tour) {
                    next(make404(req.params.id));
                }
                else {
                    res.json({ removed: true });
                }
            })
            .catch(next);
    });


    