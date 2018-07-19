const { assert } = require('chai');
const Tour = require('../../lib/models/tour');
const { getErrors } = require('./helpers');

describe('Tour model', () => {

    it('Validates a good model', () => {
        const data = {
            title: 'Circus Clowns',
            activities: ['It scares you', 'Bobo the clown juggles'],
            launchDate: new Date(),
            stops: {
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
            }
        };

        const tour = new Tour(data);
        const json = tour.toJSON();
        delete json._id;
        assert.deepEqual(json, data);

    });

});