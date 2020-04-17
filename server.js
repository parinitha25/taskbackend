var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userroutes');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

app.use('/', userRoutes);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Users');

app.set('port', (process.env.port || 8000));

const server = app.listen(app.get('port'), function () {
    console.log("server started on port" + app.get('port'));
});

mongoose.set('useFindAndModify', false);

module.exports = app

