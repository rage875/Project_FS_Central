import React from "react";

// Components
import Header from "../components/Header";

// Containers
import MainContainer from "../containers/Profile";

///////////////////////////////////////////////////////////////////////////////
export default (props) => {
  console.log("[Profilepage]", props)
  return (
    <div>
      <Header type="profile" />
      <MainContainer server_url={props.server_url} params={props.params} />
    </div>
  )
};

