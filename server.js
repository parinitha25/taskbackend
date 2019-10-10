var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');

const userRoutes=require('./routes/signuproutes');


var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());


app.use('/',userRoutes);


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Users');

// db connection
app.set('port', (process.env.port || 8000));

app.listen(app.get('port'), function(){
    console.log("server started on port" + app.get('port'));
})