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
    console.log(`[Profile] request info from user: ${JSON.stringify(user)}`);
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
  createProfileInfoVirtDOM(profileInfoDB) {
    let profileInfo = [];

    console.log(`[Profile] Virtual DOM:${JSON.stringify(profileInfoDB)}`);

    if ("" !== profileInfoDB.public.username) {
      for (let ikey in profileInfoDB) {
        if (profileInfoDB.hasOwnProperty(ikey)) {
          console.log(ikey + " -> " + profileInfoDB[ikey]);
          for (let jkey in profileInfoDB[ikey]) {
            if (profileInfoDB[ikey].hasOwnProperty(jkey)) {

              if ("defultPrinterInfo" === jkey) {
                for (let kkey in profileInfoDB[ikey][jkey]) {
                  if (profileInfoDB[ikey][jkey].hasOwnProperty(kkey)) {
                    let strTemp = `[${ikey}] ${jkey} ${kkey}: ${profileInfoDB[ikey][jkey][kkey]}`;
                    console.log(strTemp);
                    profileInfo.push(strTemp);
                  }
                }
              } else if ("printers" === jkey) {
                profileInfoDB[ikey][jkey].forEach(printer => {
                  let strTemp = `[${ikey}] ${jkey} Id:${printer.index}, Model:${printer.model}, Status:${printer.status}`;
                  console.log(strTemp);
                });
              }
              else {
                let strTemp = `[${ikey}] ${jkey}: ${profileInfoDB[ikey][jkey]}`;
                profileInfo.push(strTemp);
                console.log(strTemp);
              }
            }
          }
        }
      }
    }

    console.log("[Profile] Profileinfo:", profileInfo);

    profileInfo = profileInfo.map((elem, index) => (
      <li key={index}> {elem}</li>
    ));

    console.log("[Profile] Mapped Profileinfo:", profileInfo);

    return profileInfo;
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
