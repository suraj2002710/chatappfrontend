import React, { useEffect, useState } from 'react'
import { Button, IconButton, InputAdornment, Link, TextField } from "@mui/material"
import { MdCloudUpload, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { BsFillCloudUploadFill } from "react-icons/bs"
import CircularProgress from '@mui/material/CircularProgress';
import './Login.css'
import { baseurl } from '../Baseurl';
import axios from 'axios';
import { Cookies } from 'react-cookie'
import { NavLink, useNavigate } from 'react-router-dom';
import avatar from './avtar.png'
import { Helmet } from 'react-helmet';
// import { messageing } from '../firebase'
// import { getToken } from 'firebase/messaging'

const Sinup = () => {

    const cookie = new Cookies()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [pwrdcls, setpwrdcls] = useState("password")
    let email = JSON.parse(sessionStorage.getItem("email"))
    const [password, setpassword] = useState("")
    const [profile, setprofile] = useState("")
    const [name, setname] = useState("")
    const [imgpreview, setimgpreview] = useState("")
    const [loading, setloading] = useState(false)
    const [errdisplayname, seterrdisplayname] = useState(false)
    const [errdisplaypassword, seterrdisplaypassword] = useState(false)
    const [notificationtoken,setnotificationtoken]=useState("")
    const handleClickShowPassword = () => {
        setpwrdcls("text")
        setShowPassword(true)
    };
    const handleMouseDownPassword = () => {
        setpwrdcls("password")
        setShowPassword(false)
    };

// const notificationpermission=async()=>{
//     const permission=await Notification.requestPermission()
//       if(permission==="granted"){
//         let notitoken=await getToken(messageing,{
//             vapidKey:"BAEqkIRnGLgqBFMopBVxdDdBPWgfq7jBlnCRZuiO1kw3A22ykwzN6RNAZahR6-K7y-L5a7ir4gULexHiU1tXCXg",
//         })
//         setnotificationtoken(notitoken)
//         console.log("token",notitoken);
//       }else if(permission==="denied"){
//         console.log("notification off");
//       }
// }
    useEffect(() => {
        // notificationpermission()
    }, [])
    
    const sinup = async (e) => {
        e.preventDefault()
        console.log(name);
        if (name === "") {
            seterrdisplayname(true)
        } if (password === "") {
            seterrdisplaypassword(true)
        }
        else if (name === "" || password === "") {
            return false
        } else {

            setloading(true)
            const formdata = new FormData
            formdata.set("email", email.email)
            formdata.set("password", password)
            formdata.set("profile", profile)
            formdata.set("name", name)
            formdata.set("notificationtoken", notificationtoken)
            const { data } = await axios.post(`${baseurl}/sinup`, formdata)
            if (data.status === true) {
                setloading(false)
                cookie.set('token', data.token)
                sessionStorage.clear()
                navigate('/chat')
            }
        }
    }
    const token=cookie.get('token')
    useEffect(() => {
        console.log(email);
        if (!email) {
            navigate('/otp')
        }
      
    }, [])
    return (
        <>
<Helmet title='Login'> </Helmet>
            <div className="container-login">
                <div className="wrap-login">
                    <form onSubmit={sinup}>

                        <span className="login-form-title">Login</span>
                        {/* <img className="avatar"src="img/user.svg" alt="" align="center" /> */}
                        <img className="avatar" src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="" align="center" />

                        <div className="wrap-input100">
                            <input className="input100" placeholder='Enter your Name' type="text" value={name} name="" id="" onChange={(e) => {
                                setname(e.target.value)
                                seterrdisplayname(false)
                            }} />
                            <span className="focus-efecto"></span>
                        </div>
                        {errdisplayname ?
                            <span className='require'>Required</span> : null}

                        <div className="wrap-input100">
                            <input className="input100" placeholder='Enter your email' disabled type="email" value={email?.email} name="" id="" />
                            <span className="focus-efecto"></span>

                        </div>
                        <div>
                            <div className="wrap-input100">
                                <input className="input100" input placeholder='Enter password' type={pwrdcls} value={password} onChange={(e) => {
                                    setpassword(e.target.value)
                                    seterrdisplaypassword(false)
                                }} name="" id="pass" />
                                <span className="focus-efecto"></span>
                                {!showPassword ? <MdVisibility className='ic' style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} /> : <MdVisibilityOff className='ic' style={{ cursor: 'pointer' }} onClick={handleMouseDownPassword} />}
                            </div>
                        </div>
                        {errdisplaypassword ?
                            <span className='require'>Required</span> : null}
                        <div>
                            <div className="profilepic">
                                <div className='img'>

                                    <img src={imgpreview ? imgpreview : avatar} alt="" />
                                </div>
                                <label htmlFor="profile"><MdCloudUpload size={50} />upload profile pic</label>
                                <input type="file" hidden
                                    name="" onChange={(e) => {
                                        setprofile(e.target.files[0])
                                        setimgpreview(URL.createObjectURL(e.target.files[0]))
                                    }} id="profile" />
                            </div>
                        </div>


                        <div className="container-login-form-btn">
                            <div className="wrap-login-form-btn">
                                <div className="login-form-bgbtn"></div>
                                <button type="submit" name="btnEntrar" className="login-form-btn"  >{loading ? <CircularProgress /> : "Submit"}</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>


        </>
    )
}

export default Sinup