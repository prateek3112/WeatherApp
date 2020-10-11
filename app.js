const express = require('express');
const bodyParser = require('body-parser');

const https = require('https');
const { response } = require('express');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res)
{
  
res.sendFile(__dirname + '/index.html');
    
})

app.post('/',function(req,res)
{
  console.log(req.body.cityName);

  const city = req.body.cityName;
  const key ="3a1191a62e3aa048a334c75eb6e0539d"
  const  url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key
    https.get(url,function(response)
    {
        console.log(response.statusCode);
        response.on('data',function(data)
             {
        const weatherData = JSON.parse(data);
        const value = weatherData.main.temp;
        const icon = weatherData.weather[0].icon;
        imgUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
        //console.log(value);
        console.log(weatherData.weather[0].description);
        res.writeHead(200,{"Content-Type" : "text/html"});
        res.write("<h3>The weather in " +req.body.cityName+ " is currently  " + weatherData.weather[0].description + "</h3>");
        res.write("<h2>The temperature is " + value + "degrees celcius</h2>");
        res.write("<img src =" + imgUrl + ">");
         
        res.send();
        

             })
    })
    
})



app.listen(3000,function()
{
    console.log('server is running on port 3000');
})