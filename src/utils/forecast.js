const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/b6676057e4bcd46f6bde9987a23a40e5/' + lat + ',' + long + '?units=si&lang=en'
    request({ url, json: true }, (error, {body}) => {

        if (error) {

            callback('System Error')
        }
        else if (body.error) {

            console.log(url)
            callback('Enter valid coordinates')
        }

        else {

            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + " The current temp is "  + body.currently.temperature + "°C with a " + body.currently.humidity + "% chance of humidity. Highest Temp is "+ body.daily.data[0].temperatureHigh +"°C and lowest Temp is "+body.daily.data[0].temperatureLow+"°C.")
             
        }

    })


}


module.exports = forecast

