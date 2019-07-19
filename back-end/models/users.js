const setupDB = require('../database/db');

module.exports = async function setupUserModel(config) {
  const mongoose = await setupDB(config);
  const Schema = mongoose.Schema;

  let User = new Schema({
    email: String,
    password: String
  });

  // Arrow function not allowed due global scope properties
  User.pre('save', function (next) {
    console.log("Pre save middleware");
    console.log(this);

    if (!this.email) {
      let err = new Error("Error email not exist");
      next(err);
    }
    next();
  })

  User.post('save', async function () {
    console.log("Post save middleware");
    return true;
  })

  return mongoose.model('User', User);
}