
1
2
3
4
5
6
7
8
9
10
11
12
13
14
module.exports = {
    errorResponse: function(message,res) {
        return res.status(500).json({ result: {}, message: message , success:0, statusCode:500});
    },
    successResponse: function(message,res,data) {
        return res.status(200).json({ result: data, message: message , success:1, statusCode:200});
    },
    notFoundResponse: function(message,res) {
        return res.status(404).json({ result: {}, message: message , success:0, statusCode:404});
    },
    unauthorizedRequest: function(message,res) {
        return res.status(401).json({ result: {}, message: message , success:0, statusCode:401});
    }
}