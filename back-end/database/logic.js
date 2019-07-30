const setupUserModel = require("../models/users");

///////////////////////////////////////////////////////////////////////////////
module.exports = class dbLogic {
  constructor() {
    this.config = {
      host: "localhost",
      port: 27017,
      db: "users"
    }

    this.setupModels();
  }

  ///////////////////////////////////////////////////////////////////////////////
  async setupModels() {
    // Setup user model and perform connection with database
    this.UserModel = await setupUserModel(this.config);

    // Just for reset DB
    /*this.UserModel.remove({}, function(e){
      console.log("All collection removed");
    })*/

    this.getUsersList();
  }

  ///////////////////////////////////////////////////////////////////////////////
  async getUsersList() {
    return this.UserModel.find({}, (e, usersDB) => {
      if (e) console.log;
    })
      .catch(e => console.log("Error:", e));
  }

  ///////////////////////////////////////////////////////////////////////////////
  async getUserInfo(user) {
    return this.UserModel.findOne({ "public.username": user.username }, (e, userDB) => {
      if (e) console.log;
      if (userDB) {
        return userDB
      }
    })
      .catch(e => console.log("Error:", e));
  }

  ///////////////////////////////////////////////////////////////////////////////
  async registerHandler(user) {
    console.log(`register user:${JSON.stringify(user)}`);

    let boAlreadyInDB = true;

    await this.UserModel.findOne({ email: user.username }, (e, userDB) => {
      if (e) console.log;
      if (!userDB) {
        boAlreadyInDB = false;
      }
    })
      .then(() => {
        if (false === boAlreadyInDB) {
          const userNew = new this.UserModel({
            private: {
              email: user.username,
              password: user.password,
              fullname: "",
              birth: "",
              defultPrinterInfo: {
                username: "",
                model: "",
                specs: ""
              }
            },
            public: {
              username: user.username.split("@", 1).toString(),
              address: "",
              printers: []
            }
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

  ///////////////////////////////////////////////////////////////////////////////
  async loginHandler(user) {
    console.log(`login user:${JSON.stringify(user)}`);

    return await this.UserModel.findOne({
      "public.username": user.username, "private.password": user.password
    }, (e, userDB) => {
      if (e) console.log;
      if (null != userDB) {
        console.log("user found and password match");
      } else {
        console.log("user not found");
      }
    })
      // ? How to modify the res within then properly
      .catch(e => { console.log(e) });
  }

  ///////////////////////////////////////////////////////////////////////////////
  async getUsersListHandler(type) {
    const usersListDB = await this.getUsersList();
    let usersList = [];

    usersListDB.forEach(user => {
      //console.log(user)
      if ("public" === type) {
        usersList.push(user.public);
      }
      else {
        usersList.push(user.private);
      }
    });

    console.log(`[logic] ${JSON.stringify(usersList)}`);

    return usersList;
  }

  ///////////////////////////////////////////////////////////////////////////////
  async getProfileInfoHandler(user) {
    let userProfileDB = await this.getUserInfo(user);
    let userProfile;

    console.log(`[logic] Profile: ${user}`);

    if ("public" === user.accessType) {
      userProfile = userProfileDB.public;
    } else if ("private" === user.accessType) {
      userProfile = userProfileDB;
    }

    return userProfile;
  }
}
