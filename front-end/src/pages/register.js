import React from "react";

// Components
import Header from "../components/Header";

// Containers
import MainContainer from "../containers/Register";

///////////////////////////////////////////////////////////////////////////////
export default (props) => (
    <div>
        <Header type="register" />
        <MainContainer server_url={props.server_url} />
    </div>
);
