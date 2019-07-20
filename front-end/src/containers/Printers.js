import React, {Component}  from "react";

class Printers extends Component {
  constructor(props){
    super(props);
    this.state = {
      printers: []
    }
  }

  getList() {
    return fetch(`${this.props.server_url}/`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(e => console.error(e));
  }

  loadList() {
    return this.getList()
      .then(printers => {
        this.setState({
          printers
        })
      });
  }

  componentDidMount(){
    this.loadList();
  }

  render() {
    let printersListDB = this.state.printers;
    const printersList = 
    (undefined===printersListDB) ? "" :
    printersListDB.map((printer, index) => (
      <li key = {index}> {printer.email}</li>
    ));

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