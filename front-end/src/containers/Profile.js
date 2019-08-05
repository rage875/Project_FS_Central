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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

    console.log(`${name}: ${value}`);

    if ("private" === splittedName[0]) {
      this.setState({
        private: {
          [`${splittedName[1]}`]: value,
        }
      })
    } else if ("public" === splittedName[0]) {
      if ("printers" !== splittedName[1]) {
        this.setState({
          public: {
            [`${splittedName[1]}`]: value,
          }
        })
      } else {
        // ? how to manage the update for each element of the array
        this.setState({
          public: {
            printers: [{
              [`${splittedName[2]}`]: value,
            }],
          }
        })
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  handleSubmit(event) {
    event.preventDefault();
    console.log(`PUT operation for updated should be here`);
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
        })
      });
  }

  ///////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.loadUserInfo();
  }

  ///////////////////////////////////////////////////////////////////////////////
  parseProfilePrivateInfo(profileIn) {
    const profileInfo = profileIn.private;
    let parsedInfo = [];

    for (let item in profileInfo) {
      let formParsedElem = {
        type: ("password" === item || "email" === item) ? (item) : ("text"),
        placeholder: `${profileInfo[item]}`,
        name: `private:${item}`,
        value: this.state.private[item],
        onChange: this.handleChange,
        disabled: ("password" === item || "email" === item) ? (true) : (false),
      }

      parsedInfo.push(formParsedElem)
    }

    return parsedInfo;
  }

  ///////////////////////////////////////////////////////////////////////////////
  parseProfilePublicInfo(profileIn) {
    const profileInfo = profileIn.public;
    let parsedInfo = [];

    for (let item in profileInfo) {
      if ("printers" !== item) {
        let formParsedElem = {
          type: "text",
          placeholder: `${profileInfo[item]}`,
          name: `public:${item}`,
          value: this.state.private[item],
          onChange: this.handleChange,
          disabled: false,
        }

        parsedInfo.push(formParsedElem)
      }
    }

    profileInfo.printers.forEach(([printer]) => {
      let count = 0;
      let formParsedElem = {
        type: "text",
        placeholder: "",
        name: "",
        value: "",
        onChange: this.handleChange,
      }

      // index
      formParsedElem.placeholder = `${printer.index}`;
      formParsedElem.name = `public:printer:index`;
      formParsedElem.value = this.state.public.printers[count].index;
      parsedInfo.push(formParsedElem)

      // model
      formParsedElem.placeholder = `${printer.model}`;
      formParsedElem.name = `public:printer:model`;
      formParsedElem.value = this.state.public.printers[count].model;
      parsedInfo.push(formParsedElem)

      // specs
      formParsedElem.placeholder = `${printer.specs}`;
      formParsedElem.name = `public:printer:specs`;
      formParsedElem.value = this.state.public.printers[count].specs;
      parsedInfo.push(formParsedElem)

      // status
      formParsedElem.placeholder = `${printer.status}`;
      formParsedElem.name = `public:printer:status`;
      formParsedElem.value = this.state.public.printers[count].status;
      parsedInfo.push(formParsedElem)

      count++;
    })

    return parsedInfo;
  }

  createProfileFormInfo(profileIn) {
    const profileInfo = profileIn;
    let profileForm = profileInfo.map((elem, index) => (
      <div class="form-group row col">
        <label className="col-sm-2 col-form-label col-form-label-sm">{`${elem.label}`}</label>
        <div class="col-sm-10">
          <input
            className="form-control"
            type={`${elem.type}`}
            placeholder={`${elem.placeholder}`}
            name={`${elem.name}`}
            value={`${elem.value}`}
            onChange={`${elem.onChange}`}
            disabled={("public" === this.props.location.state.accessType) ? true : elem.disabled}
            key={index}
          />
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
      let parsedProfileInfo = [
        ...this.parseProfilePrivateInfo(profileInfo), ...this.parseProfilePublicInfo(profileInfo)
      ];

      profileInfoVirtDom = this.createProfileFormInfo(parsedProfileInfo);
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <h2> Profile's info</h2>
        {profileInfoVirtDom}

        <button
          type="submit"
          className="btn btn-primary col text-center"
          disabled={!this.validateForm()}> Update
          </button>
      </form>
    );
  }

  ///////////////////////////////////////////////////////////////////////////////
  render() {
    const profileInfo = this.createProfileInfoVirtDOM(this.state);
    // Despues realizar con boton el delete

    return (
      <div className="Profile">
        {profileInfo}
      </div>
    )
  };
}

export default Profile
