const setupUserModel = require("../models/users");

module.exports = class dbLogic{
  constructor(){
    this.config = {
      host: "localhost",
      port: 27017,
      db: "users"
    }

    this.setupModels();
  }

  async setupModels(){
    // Setup user model and perform connection with database
    this.UserModel = await setupUserModel(this.config);

    this.getUsersList();
  }

  async getUsersList(){
    return this.UserModel.find({}, (e, usersDB) => {
      if(e) console.log;
        return usersDB;
    })
    .catch(e => console.log("Error:", e));
  }

  async registerHandler(user){
    console.log(`register user:${JSON.stringify(user)}`);

    let boAlreadyInDB = true;

    await this.UserModel.findOne({ email: user.username }, (e, userDB) => {
      if (e) console.log;
      if (null == userDB) {
        boAlreadyInDB = false;
      }
    })
      .then(() => {
        if (false === boAlreadyInDB) {
          const userNew = new this.UserModel({
            email: user.username,
            password: user.password
          })

          userNew.save()
            .then(() => { console.log("User registered") })
            .catch(e => console.error("Error:", e));
        }
        else {
          console.log("User already exist, try again");
        }
      })
      .catch(e => console.error("Error:", e))
  }

  async loginHandler(user){
    console.log(`login user:${JSON.stringify(user)}`);

    await this.UserModel.findOne({email:user.username}, (e, userDB) => {
      if(e) console.log;
      if(null != userDB){
        console.log("user found");
        // Check for password - hash or something here
        if(userDB.password === user.password){
          console.log("user password matches");
        } else {
          console.log("user password not matched");
        }
      } else {
        console.log("user not founded");
      }
    }).catch(e => {console.log(e)});
  }

  async getUsersListHandler(){
    return await this.getUsersList();
  }
}