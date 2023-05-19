import React, { useEffect, useState } from 'react'
import { Button, IconButton, InputAdornment, Link, TextField } from "@mui/material"
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { BsFillCloudUploadFill } from "react-icons/bs"
import CircularProgress from '@mui/material/CircularProgress';
import './Login.css'
import { baseurl } from '../Baseurl';
import axios from 'axios';
import { Cookies } from 'react-cookie'
import { NavLink, useNavigate } from 'react-router-dom';
import Lottie from '../Lottie';
import {Helmet} from 'react-helmet'
const Login = () => {
  const cookie = new Cookies()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [pwrdcls, setpwrdcls] = useState("password")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [imgpreview, setimgpreview] = useState("")
  const [loading, setloading] = useState(false)
  const [errdisplayemail, seterrdisplayemail]=useState("")
  const [errdisplaypassword, seterrdisplaypassword]=useState("")
  const handleClickShowPassword = () => {
    setpwrdcls("text")
    setShowPassword(true)
  };
  const handleMouseDownPassword = () => {
    setpwrdcls("password")
    setShowPassword(false)
  };
  const login = async (e) => {
    e.preventDefault()
   
    if(email===""){
      seterrdisplayemail("Required")
    }
    if(password===""){
      seterrdisplaypassword("Required")
    }
    if(email==="" || password ===""){
      return
    }
    setloading(true)
    const { data } = await axios.post(`${baseurl}/login`, {
      email: email, password: password
    })
    if (data.status === true) {
      setloading(false)
      cookie.set('token', data.token,{path:"/",expires:new Date(Date.now()+86400000)})
      navigate('/chat')
    }else{
      if(data.msg==="password do not match"){
        seterrdisplaypassword(data.msg)
        setloading(false)
      }else{
        seterrdisplayemail(data.msg)
        setloading(false)

      }
    }
  }

  const token=cookie.get('token')

  useEffect(() => {
    if(token){
      navigate("/chat")
  }
  }, [])
  
  return (
    <>

      <Helmet title='Login'> </Helmet>
      <div className="container-login">
        <div className="wrap-login">
          
          <form onSubmit={login}>

            <span className="login-form-title">Login</span>
            {/* <img className="avatar"src="img/user.svg" alt="" align="center" /> */}
            <img className="avatar" src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="" align="center" />

            <div className="wrap-input100">
              <input className="input100" placeholder='Enter your email' type="email" value={email} onChange={(e) => {setemail(e.target.value)
              seterrdisplayemail("")}
              } name="" id="" />
              <span className="focus-efecto"></span>
            </div>
            
            {errdisplayemail?
              <span className='require'>{errdisplayemail}</span>:null}
        <div>
        
            <div className="wrap-input100">
              <input className="input100" input placeholder='Enter password' type={pwrdcls} value={password} onChange={(e) => {setpassword(e.target.value)
              seterrdisplaypassword("")}
              } name="" id="pass" />
              <span className="focus-efecto"></span>
              {!showPassword ? <MdVisibility className='ic' style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} /> : <MdVisibilityOff className='ic' style={{ cursor: 'pointer' }} onClick={handleMouseDownPassword} />}
            </div>
            {errdisplaypassword?
              <span className='require'>{errdisplaypassword}</span>:null}
            
              

              </div>
            <div className="container-login-form-btn">
              <div className="wrap-login-form-btn">
                <div className="login-form-bgbtn"></div>
                <button type="submit" name="btnEntrar" className="login-form-btn"  >{loading?<CircularProgress />:"Submit"}</button>
              </div>
            </div>
          </form>
          <div className='other'>
      
          <NavLink to="/otp">Sinup</NavLink>
            <NavLink to="/forgotpassword">Forgot Password</NavLink>
        
          </div>
        </div>
      </div>
           

    </>
  )
}

export default Login