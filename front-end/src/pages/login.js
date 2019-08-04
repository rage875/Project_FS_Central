import React from "react";

// Components
import Header from "../components/Header";

// Containers
import MainContainer from "../containers/Login";

///////////////////////////////////////////////////////////////////////////////
export default (props) => {
    return (
      <div>
        <Header type="login" />
        <MainContainer {... props}/>
      </div>
    )
  };