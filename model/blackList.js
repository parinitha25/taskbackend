var mongoose = require('mongoose');
var schema = mongoose.Schema;

var blacklistSchema = new schema({
    token: {
        type: String
    },
    tokereated: {
        type: Date, 
        default: Date.now()
    }
});

module.exports = mongoose.model('blacklist', blacklistSchema);