const setupDB = require('../database/db');
const bcrypt = require('bcrypt');

const saltRounds = 10;

///////////////////////////////////////////////////////////////////////////////
module.exports = async function setupUserModel(config) {
  const mongoose = await setupDB(config);
  const Schema = mongoose.Schema;

  let User = new Schema({
    private: {
      email: { type: String, lowercase: true, required: true },
      password: String,
      fullname: String,
      birth: Date,
      defaultPrinterInfo: {
        username: String,
        model: String,
        specs: String,
      }
    },
    public: {
      username: { type:String, required: true },
      address: String,
      printers: [{
        index: Number,
        model: String,
        specs: String,
        status: {
          type: String,
          enum: [
            "Available", "Ready", "Busy", "Not Available",
          ],
        },
      }],
    },
  });

  User.pre('save', function (next) {
    this.private.password = bcrypt.hashSync(this.private.password, saltRounds);
    next();
  })

  User.post('save', async function () {
    console.log("Post save middleware");
    return true;
  })

  return mongoose.model('User', User);
}
