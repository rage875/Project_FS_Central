const setupUserModel = require("../models/users");
const bcrypt = require('bcrypt');

///////////////////////////////////////////////////////////////////////////////
module.exports = class dbLogic {
  constructor() {
    this.config = {
      host: "localhost",
      port: 27017,
      db: "users"
    }

    this.setupModels(false);
  }

  ///////////////////////////////////////////////////////////////////////////////
  async setupModels(reset) {
    // Setup user model and perform connection with database
    this.UserModel = await setupUserModel(this.config);

    if (reset) {
      this.UserModel.remove({}, function (e) {
        console.log("All collection removed");
      })
    }

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

    let username = "";
    let boAlreadyInDB = true;

    await this.UserModel.findOne({ "private.email": user.email }, (e, userDB) => {
      if (e) console.log;
      if (!userDB) {
        boAlreadyInDB = false;
      }
    })
      .then(async () => {
        if (false === boAlreadyInDB) {
          const userNew = new this.UserModel({
            private: {
              email: user.email,
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
              username: user.email.split("@", 1).toString(),
              address: "",
              printers: []
            }
          })

          await userNew.save()
            .then(() => {
              console.log(`User registered: ${userNew.public.username}`);
              username = userNew.public.username;
            })
            .catch(e => console.error("Error:", e));
        }
        else {
          console.log("User already exist, try again");
        }
      })
      .catch(e => console.error("Error:", e))

    return username;
  }

  ///////////////////////////////////////////////////////////////////////////////
  async loginHandler(user) {
    console.log(`login user:${JSON.stringify(user)}`);

    return await this.UserModel.findOne({
      "public.username": user.username
    }, (e, userDB) => {
      if (e) console.log;
      if (null != userDB && bcrypt.compareSync(
        user.password, userDB.private.password)) {
        console.log("user found and password match");
      } else {
        console.log("user not found");
      }
    })
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
      userProfile = { public: userProfileDB.public };
    } else if ("private" === user.accessType) {
      userProfile = userProfileDB;
    }

    return userProfile;
  }
}
