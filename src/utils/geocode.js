const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoidXNhaWYxMzEiLCJhIjoiY2s1enAwMnJ0MGd5dTNwcWdpZ3J0bWEzeiJ9.EQZRCF898hR3N1Tz0Obo3w'
    request({ url: url, json: true }, (error, {body}) => {

        if (error) {

            callback('Unable to connect to location services!')
        }
        else if (body.features.length === 0) {

            callback('Unable to find location. Try another search')
        }
        else {

            callback(undefined, {

                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name

                       
            })
          

        }

    })

}

module.exports = geocode