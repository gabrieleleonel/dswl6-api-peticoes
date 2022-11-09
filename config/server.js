let express = require('express');
let expressSession = require('express-session');
let body_parser = require('body-parser');


let app = express();

let port = process.env.PORT || 3000;

app.use(express.json());
app.use(body_parser.urlencoded({extended:true}));

app.use(expressSession({
    secret: 'api_peticoes',
    resave: false,
    saveUninitialized: false
}));

app.listen(port, function(){
    console.log("Runnning at: ", port);
});

module.exports = app;