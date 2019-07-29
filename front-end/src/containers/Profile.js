import React, { Component } from "react";

///////////////////////////////////////////////////////////////////////////////
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    }

    console.log("[Profile]", this.props.params);
  };

  ///////////////////////////////////////////////////////////////////////////////
  getUserInfo(user) {
    console.log(`request info from user: ${user.username}`);
    return fetch(`${this.props.server_url}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error));
  }

  ///////////////////////////////////////////////////////////////////////////////
  loadUserInfo() {
    const user = {
      username: this.props.params.username,
    }

    return this.getUserInfo(user)
      .then(userInfo => {
        this.setState({
          username: userInfo.email
        })
      });
  }

  ///////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.loadUserInfo();
  }

  ///////////////////////////////////////////////////////////////////////////////
  createProfileInfoVirtDOM(profileInfoDB) {
    let profileInfo = [];

    if (profileInfoDB.username) {
      for (let ikey in profileInfoDB) {
        if (profileInfoDB.hasOwnProperty(ikey)) {
          console.log(ikey + " -> " + profileInfoDB[ikey]);
          for (let jkey in profileInfoDB[ikey]) {
            if (profileInfoDB[ikey].hasOwnProperty(jkey)) {
              console.log(`${ikey}: ${jkey} -> ${profileInfoDB[ikey][jkey]}`);
            }
          }
          /*if ("printers" === key) {
            // Handle arrays
            profileInfoDB[key].forEach(printer => {
              console.log("- Index:" + printer.index + "status:" + printer.status);
            })
          } else if ("defultPrinterInfo" === key) {
            console.log("-- Username:" + profileInfoDB[key].username);
          } else {
            profileInfo.push(profileInfoDB[key]);
          }*/
        }
      }
    }

    console.log("Profileinfo:", profileInfo);

    profileInfo.map((elem, index) => (
      <li key={index}> {elem}</li>
    ));

    return profileInfo;
  }

  ///////////////////////////////////////////////////////////////////////////////
  render() {
    const profileInfo = this.createProfileInfoVirtDOM(
      this.state);
    // Despues realizar con boton el delete

    return (
      <div>
        <h2> Profile's info</h2>
        {
          profileInfo
        }
      </div>
    )
  };
}

export default Profile
