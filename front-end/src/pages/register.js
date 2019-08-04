import React from "react";

// Components
import Header from "../components/Header";

// Containers
import MainContainer from "../containers/Register";

///////////////////////////////////////////////////////////////////////////////
export default (props) => {
    return (
      <div>
        <Header type="register" />
        <MainContainer {... props}/>
      </div>
    )
  };
