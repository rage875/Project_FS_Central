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
          <li key={index}> 
            <div className="card" style={{width: "18rem"}}>
              <div className="card-body">
                <h5 className="card-title">{`Main printer model: ${(printer.printers.length)?(printer.printers[0].model):("NA")}`}</h5>
                <h6 className="card-subtitle mb-2 text-muted"> {`Specs: ${(printer.printers.length)?(printer.printers[0].specs):("NA")}`}</h6>
                <p className="card-text">{`Address: ${printer.address}`}</p>
                <Link to={{
                  pathname: `/profile/${printer.username}`,
                  state: {
                    username: printer.username,
                    accessType: "public",
                  }
                }}> {`${printer.username}'s profile`}</Link>
              </div>
            </div>
          </li>
        ));

    return printersListVirtDom;
  }

  ///////////////////////////////////////////////////////////////////////////////
  render() {
    const printersList = this.createPrintersListVirtDOM(this.state.printers);

    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h3 className="display-4">Printer's list</h3>
          </div>
        </div>
        <ul>
          {printersList}
        </ul>
      </div>
    )
  };
}

export default Printers;
