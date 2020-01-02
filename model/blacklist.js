var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlacklistSchema = new Schema({
    
    token: {
        type: String
    },
    tokenCreated: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('blacklistinfo', BlacklistSchema);