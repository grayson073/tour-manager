const { assert } = require('chai');
const Tour = require('../../lib/models/tour');
const { getErrors } = require('./helpers');

describe('Tour model', () => {

    it('Validates a good model', () => {
        const data = {
            title: 'Circus Clowns',
            activities: ['It scares you', 'Bobo the clown juggles'],
            launchDate: new Date(),
            stops: [{
                location: {
                    city: 'Tualatin',
                    state: 'Oregon',
                    zip: 97062
                },
                weather: {
                    temperature: 85,
                    sunset: '8:14pm'
                },
                attendance: 52
            }]
        };

        const tour = new Tour(data);

        const json = tour.toJSON();
        delete json._id;
        json.stops.forEach(stop => delete stop._id);
        assert.deepEqual(json, data);

    });

    it('Requires a title for the tour', () => {
        const tour = new Tour({});

        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors.title.kind, 'required');
    });

    it('Requires an attendance of at least 1', () => {
        const tour = new Tour({
            title: 'Circus Tour',
            stops: [{
                attendance: 0
            }]
        });

        const errors = getErrors(tour.validateSync(), 1);
        assert.equal(errors['stops.0.attendance'].kind, 'min');
    });

});