import React, {Component}  from "react";

class Register extends Component {

  getList() {
    return fetch(`${this.props.server_url}/`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      // The info from back-end arrives properly
      .then(data => console.log(data))
      .catch(e => console.error(e));
  }

  render() {
    let printersList = "";
    // Here the info is undefined
    let list = this.getList()

    console.log(JSON.stringify(list));
    //printersList.map((printer, index) => (
    //  <li key = {index}> {printer}</li>
    //));

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


export default Register;