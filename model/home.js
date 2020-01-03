var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventlistSchema = new Schema({    
    name: {
        type: String
    },
    date:{
        type:Date,
        default: Date.now()
    },
    time:{
        type:String
    },
    place: {
        type: String
    }
});

module.exports = mongoose.model('eventlistinfo', EventlistSchema);