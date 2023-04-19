const path = require('path')
const express = require('express')  // return just a function not an object . Hence we need to call it 
const hbs = require('hbs')
const { error } = require('console')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Anonymous'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About Us',
        name: 'Anonymous'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        msg: 'This is help page.',
        name: 'Anonymous'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error : 'Address must be provided.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitutde, location} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitutde , (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData
            })
            
        })
        
    })
})

app.get('/product', (req, res)=>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term.'
        })
    }
    // we can use else statement also but return will also work and more used.
    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title : '404',
        name : 'Anonymous',
        errorMsg: 'Help article not found.'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name : 'Anonymous',
        errorMsg: 'Page not found!'
    })
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})