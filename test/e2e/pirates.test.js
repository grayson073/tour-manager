const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

const checkOk = res => {
    assert.equal(res.status, 200, 'Expected 200 http status code');
    return res;
};

describe('Tours API', () => {

    beforeEach(() => dropCollection('tours'));

    function save(tour) {
        return request
            .post('/api/tours')
            .send(tour)
            .then(checkOk)
            .then(({ body }) => body);
    }

    let clowns = {
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

    beforeEach(() => {
        return save(clowns)
            .then(data => {
                clowns = data;
            });
    });

    it('Saves a tour', () => {
        assert.isOk(clowns._id);
    });

});