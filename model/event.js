var mongoose = require('mongoose');
var schema = mongoose.Schema;

var eventschema = new schema({    
    name: {
        type: String
    },
    date:{
        type:Date,
        default: Date.now()
    },
    time:{
        type:Date,
        default: Date.now()
    },
    place: {
        type: String
    }
});

module.exports = mongoose.model('events', eventschema);