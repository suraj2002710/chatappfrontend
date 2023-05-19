import React, { useEffect, useState } from 'react'


import './Login.css'
import { baseurl } from '../Baseurl';
import axios from 'axios';
import { Cookies } from 'react-cookie'
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal, Spinner } from 'react-bootstrap';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useRef } from 'react';
import otpimg from './otp.png'
import { Helmet } from 'react-helmet';

const Otp = () => {
  const [show, setShow] = useState(false);
  const [otpdisplay, setotpdisplay] = useState(false)
  const cookie = new Cookies()
  const navigate = useNavigate()
  const emailref=useRef()
  const [email, setemail] = useState("")
  const [OTP, setOTP] = useState("");
  const [loading, setloading] = useState(null)
  const [otpErr, setotpErr] = useState("")
  const [errdisplayemail, seterrdisplayemail]=useState("")

  const sendOtp = async (e) => {
    e.preventDefault()
    if(email===""){
      seterrdisplayemail("Required")
      return false
    }
    setloading("otpsend")
    const { data } = await axios.post(`${baseurl}/sendotp`, {
      email: email
    })
    console.log(data);
    if (data.status === true) {
      setloading(null)
      setotpdisplay("block")
      emailref.current.disabled=true
      sessionStorage.setItem('email',JSON.stringify({email:email}))
    }
    else {
      
      seterrdisplayemail(data.data)
      setloading(null)
    }
  }

const resendOtp = async () => {
    setloading("otpsend")
    const { data } = await axios.post(`${baseurl}/sendotp`, {
      email: email
    })
    if (data.status === true) {
      setloading(null)
      setotpdisplay(true)
    }
   
}

  const Otpverify = async (e) => {
    e.preventDefault()
    if (OTP === "") {
      setotpErr("please Enter Otp")
      return
    }
    setloading("otpverify")


    const  {data}  = await axios.post(`${baseurl}/otpverify`, {
      email: email, otp: OTP
    })
    
    if (data.status === true) {
      setloading(null)
      setShow(false)
      navigate("/sinup")
    } else {
      
      setotpErr(data.data)
      setloading(null)
    }
  }

  return (
    <>
<Helmet title='Sinup'> </Helmet>
      <div className="container-login">
        <div className="wrap-login">
          <form onSubmit={sendOtp}>

            <span className="login-form-title">Send OTP</span>
            {/* <img className="avatar"src="img/user.svg" alt="" align="center" /> */}
            <img className="avatar" src={otpimg} alt="" align="center" />

            <div className="wrap-input100" style={{ marginBottom: "12px" }}>
              <input ref={emailref} className="input100" placeholder='Enter your email' type="email" value={email} onChange={(e) =>{ setemail(e.target.value)
              seterrdisplayemail(false)
              }} name="" id="" />
              <span className="focus-efecto"></span>
            </div>
            {errdisplayemail ? <span className='require'>{errdisplayemail}</span>:null}
            <div>

            </div>

            {otpdisplay ?
              <div
                style={{

                  padding: 12,
                }}
              >
                <OTPInput className="otp" value={OTP} onChange={setOTP}
                  autoFocus
                  OTPLength={4}
                  placeholder={["-", "-", "-", "-"]}
                  otpType="number"
                  disabled={false}
                  // resendOTP={{}}
                  secure />
                <span className='otpErr'>{otpErr}</span>
            
                <ResendOTP maxTime={120} onResendClick={resendOtp} />

              </div>

              : null}
            {otpdisplay ? <div className="container-login-form-btn">
              <div className="wrap-login-form-btn">
                <div className="login-form-bgbtn"></div>
                <button type="submit" name="btnEntrar" className="login-form-btn" onClick={Otpverify} >{loading === "otpverify" ? <Spinner animation="border" size="sm" /> : "OTP Submit"}</button>
              </div>
            </div> :
              <div className="container-login-form-btn">
                <div className="wrap-login-form-btn">
                  <div className="login-form-bgbtn"></div>
                  <button type="submit" name="btnEntrar" className="login-form-btn"  >{loading === "otpsend" ? <Spinner animation="border" size="sm" /> : "Send OTP"}</button>
                </div>
              </div>}
          </form>

        </div>
      </div>
      <Modal show={show} centered onHide={() => {
        setShow(false)
        setotpErr("")

        setOTP("")
      }
      } backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Enter a Valid OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              padding: 12,
            }}
          >
            <OTPInput className="otp" value={OTP} onChange={setOTP}
              autoFocus
              OTPLength={4}
              placeholder={["-", "-", "-", "-"]}
              otpType="number"
              disabled={false}
              // resendOTP={{}}
              secure />
            <span className='otpErr'>{otpErr}</span>
            <div className="container-login-form-btn">
              <div className="wrap-login-form-btn">
                <div className="login-form-bgbtn"></div>
                <button type="submit" name="btnEntrar" className="login-form-btn" onClick={Otpverify} >{loading === "otpsend" ? <Spinner animation="border" size="sm" /> : "OTP Submit"}</button>
              </div>
            </div>

            <ResendOTP onResendClick={sendOtp} />

          </div>

        </Modal.Body>
      </Modal>
    </>
  )
}

export default Otp