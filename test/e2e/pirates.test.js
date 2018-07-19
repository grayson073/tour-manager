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

    let animals = {
        title: 'Exotic Animals',
        activities: ['Elephant dance', 'Lions, tigers, and bears, oh my!'],
        launchDate: new Date(),
        stops: [{
            location: {
                city: 'Portland',
                state: 'Oregon',
                zip: 97209
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

    it('Saves a tour', () => {
        assert.isOk(clowns._id);
    });


    it('Gets a list of tours', () => {
        return request
            .get('/api/tours')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [clowns, animals]);
            });
    });

});