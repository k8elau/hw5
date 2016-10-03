var express = require('express');
var hbs = require('express-handlebars');

var app = express();

var portNum = 8888;
app.set('port', portNum);

//tell express to use handlebars 
app.engine('handlebars', hbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


//manually puts in netflix data in json format to use later
function getData(){
   return{
            shows:[
                {
                    title: "Stranger Things",
                    year_released: "2016",
                    genre: "science fiction"
                },
                {
                    title: "Breaking Bad",
                    year_released: "2008",
                    genre: "drama"
                },
                {  
                    title: "The Walking Dead",
                    year_released: "2010",
                    genre: "horror"
                },
                {
                    title: "The Office",
                    year_released: "2005",
                    genre: "comedy"
                }
            ],
        };
}


app.use(function(req, res, next){
    //got this code explicitly from the textbook, retrieves json file 
    if(!res.locals.partials)res.locals.partials={};
    res.locals.partials.dataContext = getData();
    next();
})

app.get('/:name', function(req, res){
   res.render('home', {
       name: req.params.name
   }); 
});

app.get('/', function(req, res){
    res.render('home',{
        //is this good coding practice? probably not 
    });
});

app.get('/:show', function(req, res){
    res.render('specificShow', {
        show: req.params.show
    });
});

app.listen(portNum, function(){
   console.log('listening on port', portNum); 
});