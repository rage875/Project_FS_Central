const setupUserModel = require("../models/users");

module.exports = class dbLogic{
  constructor(){
    this.config = {
      host: "localhost",
      port: 27017,
      db: "users"
    }
  }

  async registerHandler(user){
    console.log(`register user:${JSON.stringify(user)}`);

    // Setup user model and perform connection with database
    const UserModel = await setupUserModel(this.config);
    const newUser = new UserModel({
      email: user.username,
      password: user.password
    })

    await newUser.save()
      .then(()=> {console.log("User registered")})
      .catch(e => console.error("Error:", e));

    process.exit(0);
  }

  loginHandler(user){
    console.log(`login user:${JSON.stringify(user)}`);
  }
}