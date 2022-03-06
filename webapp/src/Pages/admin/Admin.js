import React, { Component, useState } from 'react'
import HeaderAdmin from 'components/HeaderAdmin'
import { Container, Button} from 'react-bootstrap'

export class Admin extends Component {
  data = [
    { username: "Spongebob", accountStatus: "active", artistStatus: "certified"},
    { username: "Gary", accountStatus: "suspended", artistStatus: "N/A"},
    { username: "PatrickYahhh", accountStatus: "active", artistStatus:"applied"},
    { username: "Mr.krab", accountStatus: "active", artistStatus:"N/A",},
  ]

  // [accInfo, setAccInfo] = useState(this.data);

  // handleEdit =(e, acc) =>{
  //   e.preventDefault;
  //   setAccInfo(acc, id);
  // }

  render() {
    return (
      <div>
        <div><HeaderAdmin/></div>        
        <Container>
          <h4 classname='mb-4'>Accounts Overview</h4>
          <div className="App">
      <table>
        <tr>
          <th>Username</th>
          <th>Account Status</th>
          <th>Actions</th>
          <th>Artist Status</th>
          <th>Actions</th>
        </tr>
        {this.data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.username}</td>
              <td>{val.accountStatus}</td>
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm"> Suspend </button>
                <button type="button" class="btn btn-outline-success btn-sm"> Activate </button>
              </td>
              <td>{val.artistStatus}</td>
              <td>
              <button type="button" class="btn btn-outline-info btn-sm"> View </button>
              <button type="button" class="btn btn-outline-success btn-sm"> Approve </button>
              <button type="button" class="btn btn-outline-danger btn-sm"> Reject </button>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
        </Container>
      </div>

    )
  }
}

export default Admin