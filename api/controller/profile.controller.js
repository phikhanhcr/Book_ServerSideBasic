var Profile = require('../../models/test.model');
module.exports.profile = async (req, res, next) => {
  var query = req.query;

  let filter = req.query;
  if (req.query.age != null) {
    filter: {
      age: { $gt: req.query.age }
    }
  }
  Profile.find(filter)
    .then(profile => {
      res.json({
        confirmation: 'success',
        data: profile
      });
    }).catch(err => {
      res.json({
        confirmation: 'fail',
        data: err.message
      });
    })
}
module.exports.findId = (req, res, next) => {
  var id = req.params.id;
  Profile.findById(id)
    .then(profile => {
      res.json({
        confirmation : 'success' , 
        data : profile
      })
    }).catch(err => {
      res.json({
        confirmation : 'fail' , 
        data : 'Id not found !!'
      })
    })
}

module.exports.createPost = async (req, res, next) => {
  
  var profile = await Profile.create(req.body);
  res.json(profile);
}

module.exports.delete = async (req, res, next) => {
  var id = req.params.id;
  var profile = await Profile.findByIdAndRemove(id);
  res.json(profile);
}

module.exports.update = (req, res, next) => {
  var id = req.params.id;
  Profile.findByIdAndUpdate(id ,req.body , {new : true})
    .then(profile => {
      res.json({
        confirmation : 'success' , 
        data : profile
      })
    })
    .catch(err => {
      res.json({
        confirmation : 'fail' , 
        message : err.message
      })
    })
}