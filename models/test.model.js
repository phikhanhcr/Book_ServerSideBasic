var mongooes = require('mongoose');
var profileSchema = new mongooes.Schema({
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' },
  age: { type: Number, default: 0 },
  team: { type: String, trim: true, default: '' },
  position: { type: String, trim: true, default: '' }
})
var Profile = mongooes.model('Profile' , profileSchema , 'profiles' );

module.exports = Profile;