import React, {Component} from "react";

// Components
import Header from "../components/Header";

// Containers
import MainContainer from "../containers/Profile";

class ProfilePage extends Component{
  render(){

      return(
        <div>
          <Header type="profile" />
          <MainContainer server_url={this.props.server_url} />
        </div>
        )
    }
}

export default ProfilePage;