var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String, unique: true, lowercase: true}
});
// exports model with name of Category and content of CategorySchema
module.exports = mongoose.model('Category', CategorySchema);
