const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const port = process.env.PORT || 3000

//defining paths for express config (custom names)                  REFER TO EXPRESS DOCS FOR PROPER UNDERSTANDING
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setting up handlebars engine and views location                               "
app.set('view engine', 'hbs')
app.set('views', viewPath)

//setting up configuration for partials 
hbs.registerPartials(partialsPath)

//Setting up static directory                                                   "
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {


    res.render('index', {

        title: 'Weather App',
        name: 'Saif',
        error: 'Index',
        message: 'Welcome to the Weather App. Use this site to get your weather'

    })


})

app.get('/weather', (req, res) => {

    if (!req.query.address) {

        return res.send({

            error: "Please provide a location"

        })

    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {

            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }

            res.send({

                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })
    // res.send ({

    //     address: req.query.location

    // })


})

app.get('/products', (req, res) => {

    console.log(req.query.search)
    if (!req.query.search) {

        return res.send({

            error: "You must provide a search term"
        })

    }
    res.send({

        products: []

    });

})

app.get('/about', (req, res) => {

    res.render('about', {

        title: 'Me',
        name: 'Saif',
        error: 'About'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {

        message: 'This is the help page.',
        title: 'Help Page',
        name: 'Saif Ullah',
        error: 'Help'


    })
})

// console.log(path.join(__dirname,'../public')) 
//Root Page
// app.get('', (req, res)=>{                            don't need this anymore as index.html will load as default page from now on
//     res.send('Hello Express!')
// })
//Help Page
// app.get('/help',(req,res)=>{
//     res.send("Help Page")
// })
// //About Page
// app.get('/about', (req, res)=>{
//     res.send('<h1>About Page<h1>')
// })

//Weather Page
// app.get('/weather', (req, res) => {

//     res.send({
//         location: 'Delhi',
//         forecast: 'It is 15 degrees here'
//     })
// })

app.get('/help/*', (req, res) => {

    res.render('404', {

        title: 'Error 404!',
        error: 'Help Page Not Found',
        name: 'Saif'
    })

}


)
//Page not found error
app.get('*', (req, res) => {

    res.render('404', {
        title: 'Error 404',
        error: 'Page Not Found',
        name: 'Saif'
    })

})

//Starting Server
app.listen(port, () => {

    console.log('Server is up on port ' + port)

})