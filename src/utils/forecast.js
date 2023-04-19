const request = require('postman-request')

const forecast = (latitude, longitude, callback)=>{

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=8f96b8df990b0a8d86d28318c224f46a'

    request({url, json : true}, (error, {body})=>{
        if(error){
            callback("Unable to connect to weather service!", undefined)
        }else if(body.cod === "400"){
            callback("Unable to find the location", undefined)   
        }else{
            const tempInCel = ((body.main.temp)-273.15).toFixed(2)
            const feels_likeInCel = ((body.main.feels_like) - 273.15).toFixed(2)
            callback(undefined, body.weather[0].description+ '. It is currently '+tempInCel+' degree out . It feels like '+feels_likeInCel+' degree out.')
        }
    })

}

module.exports = forecast
