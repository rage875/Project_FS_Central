import React, {Component}  from "react";

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      nickname: "",
      fullname: "",
      address: "",
      printers: [], /*index, model, specs, status*/
      defultPrinterInfo : {
        username: "",
        model: "",
        specs: ""
      }
    }

    console.log("[Profile]", this.props.match);
    console.log("[Profile]", this.props.location);
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
    const {match: {params}} = this.props
    console.log(params)
    this.loadUserInfo();
  }

  createProfileInfoVirtDOM(profileInfoDB){
    let profileInfo = [];

    if(profileInfoDB.username){
    for (let key in profileInfoDB){
      if(profileInfoDB.hasOwnProperty(key)){
        //console.log(key + " -> " + profileInfoDB[key]);
        if("printers" === key){
          // Handle arrays
          profileInfoDB[key].forEach(printer =>{
            console.log("- Index:" + printer.index + "status:" + printer.status);
          })
        } else if("defultPrinterInfo" === key){
          console.log("-- Username:" + profileInfoDB[key].username);
        } else {
          profileInfo.push(profileInfoDB[key]);
        }
      }
    }}

    console.log(profileInfo);

    profileInfo.map((elem, index) => (
      <li key = {index}> {elem}</li>
    ));

    return profileInfo;
  }

  render (){
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