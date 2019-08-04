import React, { Component } from "react";
import { Link } from "react-router-dom";

///////////////////////////////////////////////////////////////////////////////
class Printers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printers: []
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  getList() {
    return fetch(`${this.props.server_url}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(e => console.error(e));
  }

  ///////////////////////////////////////////////////////////////////////////////
  loadList() {
    return this.getList()
      .then(printers => {
        this.setState({
          printers
        })
      });
  }

  ///////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.loadList();
  }

  ///////////////////////////////////////////////////////////////////////////////
  createPrintersListVirtDOM(printersListIn) {
    const printersList = printersListIn;
    const printersListVirtDom =
      (undefined === printersList) ? "" :
        printersList.map((printer, index) => (
          <li key={index}> <Link to={{
            pathname:`/profile/${printer.username}`,
            state:{
              username: printer.username,
              accessType: "public",
            }
          }}> {printer.username}</Link></li>
        ));

    return printersListVirtDom;
  }

  ///////////////////////////////////////////////////////////////////////////////
  render() {
    const printersList = this.createPrintersListVirtDOM(this.state.printers);

    return (
      <div>
        <h2> Printer's list</h2>
        <ul>
          {printersList}
        </ul>
      </div>
    )
  };
}

export default Printers;
