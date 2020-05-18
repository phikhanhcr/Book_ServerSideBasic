
var Product = require("../../models/products.model"); 

module.exports.product = async (req, res, next) => {
  // var product = await Product.find();
  // res.json(product);

  // ** the second way 
  Product.find().exec().then(product => {
    res.json(product)
  }).catch(err => {
    res.send("Loi cmnr ");
  })
}

module.exports.createPost = async ( req , res , next ) => {
  var product = await Product.create(req.body);
  res.json(product);
}
module.exports.findApi = async (req, res , next ) => {
  // upsert create an object if it doesn't exsit , defaults to false
  /// put  update all data by data which you put it in , if uncarefull , may be data will be removed
  await Product.replaceOne({_id : req.params.id } , {name : "Khanh"})
                  .then(product => {
                  res.json(product);
                })
}
module.exports.patch = async (req, res , next ) => {
  /// patch update phần được gửi lên , các properties khác is still like before
  await Product.findOneAndUpdate({_id : req.params.id },{$set : {name : "Hi" }})
  .then(product => {
    res.json(product);
  })
}

module.exports.delete = async (req, res, next ) => {
  await Product.findByIdAndRemove(
    {_id : req.params.id }, 
    (err , product ) => {
      if(err ) {
        res.send('err');
      }  else {
        res.json(product);
      }
    } 
  )
  
}