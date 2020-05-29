const request = require('request');
const weatherStack = ({latitude, longitude}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=038eeb9cfc65977ca0dfa96d1d2a2af6&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f';

    request({ url, json: true }, (error, {body}) => {
    if(error) {
        callback('Unable to connet weeather stack',undefined);
    }
    else if(body.error)
    {
        callback('Unable get weather',undefined);
    
    }
    else 
    {
        callback(undefined, body.current);
    }
    })
    
}
module.exports = weatherStack;