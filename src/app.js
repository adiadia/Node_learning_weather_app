const path = require('path');
const express = require('express');
const hbs = require('hbs');

const pathDirectory = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');
const weatherStack = require('./utils/weatherstack');
const geoCode = require('./utils/geocode');

const app = express();
app.set('view engine','hbs');
app.set('views',viewPath);
app.use(express.static(pathDirectory));
hbs.registerPartials(partialPath);

app.get('',(req,res)=>{
    res.render('index',{
        'title' : 'Home',
        'name' : 'Aditya Index'
    })
});

app.get('/help',(req, res)=> {
    res.render('helpTest',{
        'title' : 'Help',
        'name' : 'Aditya Help'
    });
});

app.get('/weather',(req, res)=> {
    if(req.query.address) {
        geoCode(req.query.address, (error, data = {})=> {
            if(error) {
                res.send({ error });
            }
            weatherStack(data,(error,weatherdata)=>{
                console.log(weatherdata);
                if(error)
                {
                    res.send({ error });
                }
                res.send({
                    ForCast : weatherdata,
                    location : data.location 
                });
             })
                  
        });
    }

    res.render('about',{
        'title' : 'Weather',
        'name' : 'Aditya Help'
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        'error' : 'Help page not found'
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        'error' : '404 Page not found'
    });
});



app.listen(3000,()=>{
    console.log('3000 port is working');
})