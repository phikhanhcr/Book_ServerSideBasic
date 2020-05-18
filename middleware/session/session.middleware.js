const shortid = require('shortid');
var db = require('../../db');
var Session = require('../../models/cart.model');
module.exports = async function(req, res, next) {
  if(!req.signedCookies.sessionId) {
    var id = shortid.generate();
    res.cookie('sessionId' , id , {
      signed : true
    })
    await Session.insertMany({_id : id});
  }
  next();
}

// module.exports = (req, res, next) => {
  
//   if (!req.signedCookies.sessionId) {
//     var id = shortid.generate();
//     res.cookie('sessionId' , id , {
//       signed: true // để có thể biến đổi signed cookie
//     });
//     console.log(req.signedCookies.sessionId);
//     db.get('sessions').push({ id: id }).write()
    
//   }

//   next();
// }
// complete unit 22