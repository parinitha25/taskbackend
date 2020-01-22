var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const dbConnect = require('./model/index');
const cors = require('cors');
const userRoutes=require('./routes/userroutes');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

app.use('/',userRoutes);

dbConnect.on('connected', () => {
console.log('db connected at:',)


app.set('port', (process.env.port || 8000));

const server = app.listen(app.get('port'), function(){
    console.log("server started on port" + app.get('port'));
});
});

mongoose.set('useFindAndModify', false);




 
