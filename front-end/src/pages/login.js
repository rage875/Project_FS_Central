import React from "react";

// Components
import Header from "../components/Header";

// Containers
import MainContainer from "../containers/Login";

export default (props) => (
    <div>
        <Header type="login"/>
        <MainContainer server_url={props.server_url}/>
    </div>
  );
