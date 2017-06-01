var distance = require('google-distance');
var Promise = require('promise');

module.exports = {
    getDistanceBetween: getDistanceBetween
}

function getDistanceBetween(origin, destination) {
    var originString = origin.lat + "," + origin.lng;
    var destinationString = destination.lat + "," + destination.lng;
    var promise = new Promise(function (resolve, reject) {
        distance.get(
            {
                origin: originString,
                destination: destinationString,
                units: 'imperial' // miles
            },
            function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    })
    return promise;
}