const setupDB = require('../database/db');

///////////////////////////////////////////////////////////////////////////////
module.exports = async function setupUserModel(config) {
  const mongoose = await setupDB(config);
  const Schema = mongoose.Schema;

  let User = new Schema({
    private: {
      email: { type: String, lowercase: true },
      password: String,
      fullname: String,
      birth: Date,
      defultPrinterInfo: {
        username: String,
        model: String,
        specs: String,
      }
    },
    public: {
      username: String,
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
    console.log("Pre save middleware");

    if (!this.private.email) {
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
