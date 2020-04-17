const userData = require('../model/user');
const blacklistdata = require('../model/blackList');


/*------logout functionality-----*/
exports.logout = (function (req, res) {
  blacklistdata.create({ token: req.headers.authorization }, function (err, data) {
    if (err) {
      res.status(422).send(err)
    }
    else {
      res.status(200).json(data);
    }
  });
});

exports.postevent = (req, res) => {
  const { id } = req.params;
  const { name, place } = req.body;
  userData.findOneAndUpdate({ '_id': id }, { $push: { "events": { name, place } } }, { new: true }, (err, data) => {
    if (err) {
      res.status(422).send(err)
    }
    else {
      res.status(200).json(data);
    }
  })
}

exports.getallevents = function (req, res) {
  var pageNo = parseInt(req.query.pageNo)
  var query = {}
  userData.aggregate([
    { $match: query },
    {
      $facet: {
        metadata: [{ $count: 'total' }, { $addFields: { pageNo } }],
        list: [{ $skip: (pageNo - 1) * 1 }, { $limit: 1 }]
      }
    },
  ], function (err, data) {
    if (err) {
      res.status(422).send(err)
    }
    else {
      res.status(200).json(data);
    }
  });
}


exports.getallevent = function (req, res) {
  userData.find({}, (err, data) => {
    if (err) {
      res.status(422).send(err)
    }
    else {
      res.status(200).json(data);
    }
  })
}