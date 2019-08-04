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

    console.log("[Profile]", this.props);
  };

  ///////////////////////////////////////////////////////////////////////////////
  getUserInfo(user) {
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
      username: "",
      accessType: "",
    }

    if (this.props.location.state) {
      user.username = this.props.location.state.username;
      user.accessType = this.props.location.state.accessType;
    }

    console.log(`[Profile] load user:${user}`)

    return this.getUserInfo(user)
      .then(profileInfoDB => {
        this.setState({
          private: profileInfoDB.private,
          public: profileInfoDB.public,
        })
      });
  }

  ///////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.loadUserInfo();
  }

  ///////////////////////////////////////////////////////////////////////////////
  createProfileInfoVirtDOM(profileIn) {
    const profileInfo = profileIn;
    let profileInfoVirtDom = [];

    if ("" !== profileInfo.public.username) {
      for (let ikey in profileInfo) {
        if (profileInfo.hasOwnProperty(ikey)) {
          console.log(ikey + " -> " + profileInfo[ikey]);
          for (let jkey in profileInfo[ikey]) {
            if (profileInfo[ikey].hasOwnProperty(jkey)) {

              if ("defultPrinterInfo" === jkey) {
                for (let kkey in profileInfo[ikey][jkey]) {
                  if (profileInfo[ikey][jkey].hasOwnProperty(kkey)) {
                    let strTemp = `[${ikey}] ${jkey} ${kkey}: ${profileInfo[ikey][jkey][kkey]}`;
                    profileInfoVirtDom.push(strTemp);
                  }
                }
              } else if ("printers" === jkey) {
                profileInfo[ikey][jkey].forEach(printer => {
                  let strTemp = `[${ikey}] ${jkey} Id:${printer.index}, Model:${printer.model}, Status:${printer.status}`;
                  profileInfoVirtDom.push(strTemp);
                });
              }
              else {
                let strTemp = `[${ikey}] ${jkey}: ${profileInfo[ikey][jkey]}`;
                profileInfoVirtDom.push(strTemp);
              }
            }
          }
        }
      }
    }

    profileInfoVirtDom = profileInfoVirtDom.map((elem, index) => (
      <li key={index}> {elem}</li>
    ));

    return profileInfoVirtDom;
  }

  ///////////////////////////////////////////////////////////////////////////////
  render() {
    const profileInfo = this.createProfileInfoVirtDOM(this.state);
    // Despues realizar con boton el delete

    return (
      <div>
        <h2> Profile's info</h2>
        <ul>
          {profileInfo}
        </ul>
      </div>
    )
  };
}

export default Profile
