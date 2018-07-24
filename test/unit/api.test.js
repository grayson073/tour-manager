const { assert } = require('chai');
// const createLocationWeather = require('../../lib/services/weather-service');

function createLocationWeather(api) {
    return (req, res, next) => {
        return api(req.body.zip)
            .then(data => {
                req.body = data;
                next();
            });
    };
}

describe('API Unit Test', () => {

    it('Returns city, state, and weather based on zip code', done => {
        const weather = {
            temperature: '93.2 F (34.0 C)',
            condition: 'Sunny'
        };

        const location = {
            city: 'Tualatin',
            state: 'OR',
            zip: '97062'
        };

        const getLocationWeather = zip => {
            assert.equal(zip, '97062');
            return Promise.resolve({
                weather, location
            });
        };

        const req = {
            body: { zip: '97062' }
        };

        const next = () => {
            assert.deepEqual(req.body.location, location, 'location missing');
            assert.deepEqual(req.body.weather, weather, 'weather missing');
            done();
        };

        const getLocation = createLocationWeather(getLocationWeather);
        getLocation(req, null, next);
    });

});