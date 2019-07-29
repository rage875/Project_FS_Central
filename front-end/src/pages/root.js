import React from "react";

// Components
import Header from "../components/Header";

// Containers
import Printers from "../containers/Printers";

///////////////////////////////////////////////////////////////////////////////
export default (props) => (
    <div>
        <Header type="root" />
        <Printers server_url={props.server_url} />
    </div>
);
