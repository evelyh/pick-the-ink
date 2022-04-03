import React, { Component, useEffect, useState} from 'react'
import HeaderAdmin from '../components/HeaderAdmin'
import { Container, Button} from 'react-bootstrap'
import AdminLogin from './AdminLogin.js'
import {getAllUsers, getUserLicense, getUserPhyID, verifyArtist} from '../apiHook/admin.js'
import useToken from '../components/UseToken.js'
import { getImageById } from 'apiHook/image'

function Admin () {
  const [data, setData] = useState([]);

  const { token, setToken } = useToken();

  const [success, setSuccess] = useState(false)
  useEffect(() => {
      getAllUsers().then(json => {
        setData(json)
      })
  }, [success])

  const handleLicense = (i, e) =>{
    e.preventDefault();
    console.log(i)
    getUserLicense(data[i]._id).then(imageID => {
      getImageById(imageID).then(img => {
        console.log(img)
          var win = window.open(img.images.img, '_blank')
          win.focus()
      })
    })
  }

  const handlePhyID = (i, e) =>{
    e.preventDefault();
    getUserPhyID(data[i]._id).then(imageID => {
      getImageById(imageID).then(img => {
          var win = window.open(img.images.img, '_blank')
          win.focus()
      })
    })
  }

  const handleApprove = async (i, e) =>{
    e.preventDefault();
    verifyArtist({userID: data[i]._id, verify: true}).then(json => {
        if(json){
          setSuccess(!success)
        }
    })
  }

  const handleReject = async (i, e) =>{
    e.preventDefault();
    verifyArtist({userID: data[i]._id, verify: false}).then(json => {
      if(json){
        setSuccess(!success)
      }
  })
  }

  if(!token){
    return <AdminLogin setToken={setToken}></AdminLogin>
  }

  return (
      <div>
        <div><HeaderAdmin/></div>        
        <Container>
          <h4>Artists Account Status Overview</h4>
          <div className="App">
      <table className="table mt-3">
        <thead>
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Verified</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
      <tbody>
        {data.map((item, index) => {
          if(item.artistSub != null){
            return (
              <tr key={item.userName} scope="row">
                <td>{item.userName}</td>
                <td>{JSON.stringify(item.artistSub.approved)}</td>
                <td>
                <button type="button" className="btn btn-outline-info btn-sm" onClick={handleLicense.bind(this, index)}> 
                View License</button>
                <button type="button" className="btn btn-outline-info btn-sm" onClick={handlePhyID.bind(this, index)}> 
                View Identification</button>
                <button type="button" className="btn btn-outline-success btn-sm" onClick={handleApprove.bind(this, index)}> 
                Approve </button>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleReject.bind(this, index)}> 
                Reject </button>
                </td>
              </tr>
            )
          }

        })}</tbody>
      </table>
    </div>
        </Container>
      </div>

    )
}

export default Admin