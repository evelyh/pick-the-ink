import React, {useState} from 'react';
import '../assets/css/adminlogin.css'
import PropTypes from 'prop-types';
import {loginAdmin} from '../apiHook/admin.js'


export default function AdminLogin({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e =>{
        e.preventDefault();
        const token = await loginAdmin({username: username, password: password})
        if(token.token){
            setToken(token);
        }else{
            alert("Username/password is incorrect. Notice only admin account can be logged in through this page.")
        }
    }

  return(
    <div className="login-wrapper">
      <h5>Admin Login</h5>
      <form onSubmit={handleSubmit}>
        <div className='form-outline mb-4'>
            <label className="form-label">Username</label>
            <input type="text" id="form2Example1" className="form-control" onChange={e => setUserName(e.target.value)}/>
        </div>

        <div className='form-outline mb-4'>
            <label className="form-label">Password</label>
            <input type="password" id="form2Example2" className="form-control" onChange={e => setPassword(e.target.value)}/>
        </div>

        <div>
          <button className="btn btn-secondary btn-block mb-4">Submit</button>
        </div>
      </form>
    </div>
  )
}

AdminLogin.propTypes = {
  setToken: PropTypes.func.isRequired
}