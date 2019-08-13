import React, { Component } from "react";

import "../styles/Profile.css"

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
        defaultPrinterInfo: {
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
      ready: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNewPrinter = this.addNewPrinter.bind(this);
    this.removeLastPrinter = this.removeLastPrinter.bind(this);

    console.log("[Profile]", this.props);
  };

  ///////////////////////////////////////////////////////////////////////////////
  validateForm() {
    return ("private" === this.props.location.state.accessType);
  }

  ///////////////////////////////////////////////////////////////////////////////
  handleChange(event) {
    const { name, value } = event.target;
    let splittedName = name.split(":");
    let tmpState = { ...this.state }
    let updateState = true;

    //console.log(`${name}: ${value}`);
    //console.log(splittedName);

    if ("private" === splittedName[0]) {
      if ("defaultPrinterInfo" !== splittedName[1]) {
        tmpState.private[`${splittedName[1]}`] = value;
      } else {
        tmpState.private.defaultPrinterInfo[`${splittedName[2]}`] = value;
      }
    } else if ("public" === splittedName[0]) {
      if ("printers" !== splittedName[1]) {
        tmpState.public[`${splittedName[1]}`] = value;
      } else {
        tmpState.public.printers[`${splittedName[2]}`][`${splittedName[3]}`] = value;
      }
    } else {
      updateState = false;
    }

    if (updateState) {
      this.setState({
        public: tmpState.public,
        private: tmpState.private,
      });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  handleSubmit(event) {
    event.preventDefault();

    this.updateUserInfo(this.state);
  }

  ///////////////////////////////////////////////////////////////////////////////
  updateUserInfo(user) {
    console.log("[Profile] Update user info")
    return fetch(`${this.props.server_url}/profile`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${this.props.location.state.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => console.log(res))
      .catch(error => console.error("Error:", error));
  }

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
          ready: true,
        })
      });
  }

  ///////////////////////////////////////////////////////////////////////////////
  addNewPrinter(event) {
    event.preventDefault();
    let tmpState = { ...this.state }

    let printer = {
      index: tmpState.public.printers.length + 1,
      model: "",
      specs: "",
      status: "Not Available",
    }

    tmpState.public.printers.push(printer);

    this.setState({
      public: tmpState.public,
      private: tmpState.private,
    });
  }

  ///////////////////////////////////////////////////////////////////////////////
  removeLastPrinter(event) {
    event.preventDefault();
    let tmpState = { ...this.state }

    if (tmpState.public.printers.length) {
      tmpState.public.printers.pop();

      this.setState({
        public: tmpState.public,
        private: tmpState.private,
      });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  parseProfilePrivateInfo(profileIn) {
    const profileInfo = profileIn.private;
    let typeInfo = "private";
    let parsedInfo = [];

    for (let item in profileInfo) {
      let formParsedElem = {
        type: ("password" === item || "email" === item) ? (item) : ("text"),
        placeholder: `${profileInfo[item]}`,
        name: `${typeInfo}:${item}`,
        value: this.state.private[item],
        onChange: this.handleChange,
        disabled: ("password" === item || "email" === item) ? (true) : (false),
      }

      if ("defaultPrinterInfo" !== item) {
        parsedInfo.push(formParsedElem);
      }
    }

    for (let item in profileInfo.defaultPrinterInfo) {
      let formParsedElem = {
        type: ("password" === item || "email" === item) ? (item) : ("text"),
        placeholder: `${profileInfo.defaultPrinterInfo[item]}`,
        name: `${typeInfo}:defaultPrinterInfo:${item}`,
        value: this.state.private.defaultPrinterInfo[item],
        onChange: this.handleChange,
        disabled: ("password" === item || "email" === item) ? (true) : (false),
      }

      parsedInfo.push(formParsedElem);
    }

    return parsedInfo;
  }

  ///////////////////////////////////////////////////////////////////////////////
  parseProfilePublicInfo(profileIn) {
    const profileInfo = profileIn.public;
    let typeInfo = "public";
    let parsedInfo = [];

    for (let item in profileInfo) {
      if ("printers" !== item) {
        let formParsedElem = {
          type: "text",
          placeholder: `${profileInfo[item]}`,
          name: `${typeInfo}:${item}`,
          value: this.state.public[item],
          disabled: false,
        }

        parsedInfo.push(formParsedElem)
      }
    }

    if (profileInfo.printers.length) {
      profileInfo.printers.forEach((printer) => {
        for (let item in printer) {
          let formParsedElem = {
            type: "text",
            placeholder: `${printer[item]}`,
            name: `${typeInfo}:printers:${printer.index - 1}:${item}`,
            value: this.state.public.printers[`${printer.index - 1}`][`${item}`],
            disabled: ("index" === item) ? (true) : (false),
          }

          parsedInfo.push(formParsedElem)
        }
      })
    }

    return parsedInfo;
  }

  createProfileFormInfo(profileIn) {
    const profileInfo = profileIn;
    let profileForm = profileInfo.map((elem, index) => (
      <div className="form-group row col" key={index}>
        <label className="col-sm-2 col-form-label col-form-label-sm">{`${elem.name}`}</label>
        <div className="col-sm-10">
          <input
            className="form-control"
            type={`${elem.type}`}
            placeholder={`${elem.placeholder}`}
            name={`${elem.name}`}
            value={`${elem.value}`}
            onChange={this.handleChange}
            disabled={("public" === this.props.location.state.accessType) ? true : elem.disabled} />
        </div>
      </div>
    ));

    return profileForm;

  }

  ///////////////////////////////////////////////////////////////////////////////
  createProfileInfoVirtDOM(profileIn) {
    const profileInfo = profileIn;
    let profileInfoVirtDom = [];

    if ("" !== profileInfo.public.username) {
      let parsedProfileInfo = []
      if (("private" === this.props.location.state.accessType)) {
        parsedProfileInfo = [
          ...this.parseProfilePrivateInfo(profileInfo), ...this.parseProfilePublicInfo(profileInfo)
        ];
      } else {
        parsedProfileInfo = [
          ...this.parseProfilePublicInfo(profileInfo)
        ];
      }

      profileInfoVirtDom = this.createProfileFormInfo(parsedProfileInfo);
    }

    if (this.validateForm()) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <h2> Profile's info</h2>
            {profileInfoVirtDom}
            <button
              onClick={this.addNewPrinter}
              className="btn btn-primary"
              type="button">
              + Printer
            </button>
            <button
              onClick={this.removeLastPrinter}
              className="btn btn-primary"
              type="button">
              - Printer
            </button>
            <button
              type="submit"
              className="btn btn-primary col col-sm-6 text-center"
              disabled={!this.validateForm()}> Update
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <h2> Profile's info</h2>
          {profileInfoVirtDom}
        </form>
      );
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.loadUserInfo();
  }

  ///////////////////////////////////////////////////////////////////////////////
  render() {
    let profileInfo = "";
    if (true === this.state.ready) {
      profileInfo = this.createProfileInfoVirtDOM(this.state);
    }

    return (
      <div className="Profile">
        {profileInfo}
      </div>
    )
  };
}

export default Profile
