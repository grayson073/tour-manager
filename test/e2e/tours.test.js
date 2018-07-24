const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const getLocationWeather = require('../../lib/services/weather-service');

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
                city: 'Salem',
                state: 'Oregon',
                zip: '55555'
            },
            weather: {
                temperature: 85,
                sunset: '8:14pm'
            },
            attendance: 52
        }]
    };

    let animals = {
        title: 'Exotic Animals',
        activities: ['Elephant dance', 'Lions, tigers, and bears, oh my!'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Portland',
                state: 'Oregon',
                zip: '97209'
            },
            weather: {
                temperature: 78,
                sunset: '8:13pm'
            },
            attendance: 200
        }]
    };

    beforeEach(() => {
        return save(clowns)
            .then(data => {
                clowns = data;
            });
    });

    beforeEach(() => {
        return save(animals)
            .then(data => {
                animals = data;
            });
    });

    it('POSTS a tour', () => {
        assert.isOk(clowns._id);
    });


    it('GETS a list of tours', () => {
        return request
            .get('/api/tours')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [clowns, animals]);
            });
    });

    it('GETS a tour by id', () => {
        return request
            .get(`/api/tours/${animals._id}`)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, animals);
            });
    });

    it.skip('should GET location/weather data', () => {
        return getLocationWeather('97062')
            .then(data => {
                assert.isDefined(data);
            });
    });

    it('POSTs a stop to a tour with API zip', () => {
        const data = { zip: '97062' };
        const location = {
            city: 'Tualatin',
            state: 'OR',
            zip: '97062'
        };
        return request
            .post(`/api/tours/${clowns._id}/stops`)
            .send(data)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body.location, location);
            });
    });

    it('DELETES a stop from a tour (by tour id)', () => {
        return request
            .del(`/api/tours/${clowns._id}/stops/${clowns.stops[0]._id}`)
            .then(checkOk)
            .then(({ body }) => {
                assert.isTrue(body.removed);
            });
    });

    it('Updates a stop with number of attendees', () => {
        const data = { attendance: 250 };
        return request
            .put(`/api/tours/${clowns._id}/stops/${clowns.stops[0]._id}/attendance`)
            .send(data)
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.stops[0].attendance, 250);
            });
    });

});