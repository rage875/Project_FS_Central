import React from "react";

// Components
import Header from "../components/Header";

// Containers
import MainContainer from "../containers/Profile";

///////////////////////////////////////////////////////////////////////////////
export default (props) => {
  return (
    <div>
      <Header type="profile" />
      <MainContainer {... props}/>
    </div>
  )
};

