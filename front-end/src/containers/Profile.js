import React, {Component}  from "react";

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      nickname: "",
      fullname: "",
      address: "",
      // Commented just to check that profile info
      // is printed due objects and stuff
      //printers: [],
      //defultPrinterInfo : {
      //  username: "",
      //  model: "",
      //  specs: ""
      //}
    }
  };

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

  loadUserInfo() {
    const user = {
      username: "pepe@g"
    }

    return this.getUserInfo(user)
      .then(userInfo => {
        this.setState({
          username: userInfo.email
        })
      });
  }

  componentDidMount(){
    this.loadUserInfo();
  }

  render (){
    const profileInfoDB = this.state;
    let profileInfo = [];
    if(profileInfoDB.username){
    for (let key in profileInfoDB){
      if(profileInfoDB.hasOwnProperty(key)){
        //console.log(key + " -> " + profileInfoDB[key]);
        profileInfo.push(profileInfoDB[key]);
      }
    }}
    console.log(profileInfo);

    profileInfo.map((elem, index) => (
      <li key = {index}> {elem}</li>
    ));

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