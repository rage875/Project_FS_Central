import React from "react";

// Components
import Header from "../components/Header";

// Containers
import Printers from "../containers/Printers";

///////////////////////////////////////////////////////////////////////////////
export default (props) => {
    return (
      <div>
        <Header type="root" />
        <Printers {... props}/>
      </div>
    )
  };
