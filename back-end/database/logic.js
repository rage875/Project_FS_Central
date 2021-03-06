const setupUserModel = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    const saltRounds = 10;
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
              password: bcrypt.hashSync(user.password, saltRounds),
              fullname: "",
              birth: "",
              defaultPrinterInfo: {
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
    let genToken = "";

    await this.UserModel.find({}, (e, usersDB) => {
      if (e) console.log;
      if(usersDB){
        console.log(usersDB);
      }
    })

    await this.UserModel.findOne({
      "public.username": user.username
    }, async (e, userDB) => {
      if (e) console.log;
      if (null != userDB && bcrypt.compareSync(
        user.password, userDB.private.password)) {
        await jwt.sign({ user }, 'palabra', function (err, token) {
          if (!e) {
            genToken = token;
          } else {
            console.log(e);
          }
        })
        console.log("user found and password match");
        console.log(`token:${genToken}`);
      } else {
        console.log("user not found");
      }
    })
      .catch(e => { console.log(e) });

    return genToken;
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

  ///////////////////////////////////////////////////////////////////////////////
  async updateProfileInfoHandler(user) {
    await this.UserModel.findOne({
      "public.username": user.public.username
    }, async (e, userDB) => {
      if (e) console.log;
      if (userDB){
        console.log("[logic] user:", userDB);
        userDB.public = user.public;
        userDB.private.fullname = user.private.fullname;
        userDB.private.birth = user.private.birth;
        userDB.private.defaultPrinterInfo = user.private.defaultPrinterInfo;

        await userDB.save()
        .then(() => {
              console.log(`User updated`);
            })
            .catch(e => console.error("Error:", e));
      } else {
        console.log("user not found");
      }
    })
      .catch(e => { console.log(e) });
  }

}
