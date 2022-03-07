import React, { Component, useState} from 'react'
import HeaderAdmin from 'components/HeaderAdmin'
import { Container, Button} from 'react-bootstrap'

function Admin () {
  const [data, setData] = useState([
    { username: "Spongebob", accountStatus: "active", artistStatus: "approved"},
    { username: "Gary", accountStatus: "suspended", artistStatus: "N/A"},
    { username: "PatrickYahhh", accountStatus: "active", artistStatus:"applied"},
    { username: "Mr.krab", accountStatus: "active", artistStatus:"rejected",},
  ]);

  const handleSuspend = (i, e) =>{
    e.preventDefault();
    const newData = [...data];
    newData[i].accountStatus = "suspended";
    setData(newData);
  }

  const handleActivate = (i, e) =>{
    e.preventDefault();
    const newData = [...data];
    newData[i].accountStatus = "active";
    setData(newData);
  }

  const handleApprove = (i, e) =>{
    e.preventDefault();
    const newData = [...data];
    newData[i].artistStatus = "approved";
    setData(newData);
  }

  const handleReject = (i, e) =>{
    e.preventDefault();
    const newData = [...data];
    newData[i].artistStatus = "rejected";
    setData(newData);
  }

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
        {data.map((_, index) => {
          return (
            <tr key={index}>
              <td>{data[index].username}</td>
              <td>{data[index].accountStatus}</td>
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm" onClick={handleSuspend.bind(this, index)}> 
                Suspend </button>
                <button type="button" class="btn btn-outline-success btn-sm" onClick={handleActivate.bind(this, index)}> 
                Activate </button>
              </td>
              <td>{data[index].artistStatus}</td>
              <td>
              <button type="button" class="btn btn-outline-info btn-sm"> View </button>
              <button type="button" class="btn btn-outline-success btn-sm" onClick={handleApprove.bind(this, index)}> 
              Approve </button>
              <button type="button" class="btn btn-outline-danger btn-sm" onClick={handleReject.bind(this, index)}> 
              Reject </button>
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

export default Admin