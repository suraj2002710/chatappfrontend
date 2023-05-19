import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"

import io from 'socket.io-client'
import "./Chat.css"
import Cookies from "js-cookie";
import { createBrowserHistory } from 'history';
// import { Cookies } from 'react-cookie'
import { HiOutlineVideoCamera } from "react-icons/hi"
import { MdCall, MdCloudUpload } from "react-icons/md"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import Modal from 'react-bootstrap/Modal';
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player';
import Peer from "peerjs"
import { FiPhoneCall, FiPhoneOff } from 'react-icons/fi'
import { TbPhoneCall } from "react-icons/tb"
import { BsThreeDotsVertical } from "react-icons/bs"
import { IoIosSend } from "react-icons/io"
import InputEmoji, { async } from "react-input-emoji";
import { AiOutlineLink } from "react-icons/ai"
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap'
import FsLightbox from "fslightbox-react";
import Highlighter from "react-highlight-words";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avtar from '../form/avtar1.png'
import avatar from '../form/avtar.png'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { baseurl } from '../Baseurl';
import Lottie from '../Lottie';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Chat = () => {
  // const cookie = new Cookies()
  const peer=new Peer()
  const [onlineuser, setonlineuser] = useState([])
  const [showvoicecall, setshowvoicecall] = useState("")
  const [showvideocall, setshowvideocall] = useState("")
  const [loading, setloading] = useState(false)
  const [imgpreview, setimgpreview] = useState("")
  const [profile, setprofile] = useState("")
  const [email, setemail] = useState("")
  const [errdisplayname, seterrdisplayname] = useState(false)
  const [name, setname] = useState("")
  const [socket, setsocket] = useState(null)
  const [notificationtoken, setnotificationtoken] = useState("")
  const [friends, setfriends] = useState([])
  const [receiver, setreceiver] = useState("")
  const [sender, setsender] = useState("")
  const [message, setmessage] = useState([])
  const [sendmsg, setsendmsg] = useState("")
  const [arrivalmsg, setarrivalmsg] = useState("")
  const [userdetails, setuserdetails] = useState([])
  const [temp, settemp] = useState(true)
  const [showpicker, setshowpicker] = useState("none")
  const [chatboxClass, setchatboxClass] = useState("")
  const [friendshideClass, setfriendshideClass] = useState("")
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [headersetImg, setheadersetImg] = useState("")
  const [headersetName, setheadersetName] = useState("")
  const [text, setText] = useState("");
  const [mystream, setmystream] = useState("")
  const [currentUserName, setcurrentUserName] = useState("")
  const [incomminUserName, setincomminUserName] = useState("")
  const [accepctedOffer, setaccepctedOffer] = useState(null)
  const [phoneOff, setphoneOff] = useState(false)
  const [voicestream, setvoicestream] = useState("")
  const [voiceremotestream, setvoiceremotestream] = useState("")
  const [videocallSender, setvideocallSender] = useState("")
  const [remotestream, setremotestream] = useState("")
  const [callersignal, setcallersignal] = useState("")
  const [filepreview, setfilepreview] = useState("")
  const [filepreviews, setfilepreviews] = useState([])
  const [sendfile, setsendfile] = useState("")
  const [imdpreview, setimdpreview] = useState("")
  const [query, setquery] = useState("")
  const [Friendloading, setFriendloading] = useState(false)
  const [senderImage, setsenderImage] = useState("")
  const [checkAccetion, setcheckAccetion] = useState("")
  const [chatloading, setchatloading] = useState(false)
  const connectionref = useRef()
  const [toggler, setToggler] = useState(false);
  const [msgdisplay, setmsgdisplay] = useState(false)
  const [blockuser, setblockuser] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [onetime, setonetime] = useState(false)
  const [copytext, setCopytext] = useState("")
  const [showless, setshowless] = useState("")
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElmsg, setAnchorElmsg] = React.useState(null);
  const openmsg = Boolean(anchorElmsg);
  const handleClickmsg = (event) => {

    setAnchorElmsg(event.currentTarget);
    setCopytext(event.target.id)
  };
  const handleClosemsg = () => {
    setAnchorElmsg(null);
  };

  const [anchorloginuser, setAnchorloginuser] = React.useState(null);
  const openloginuser = Boolean(anchorloginuser);
  const handleClickloginuser = (event) => {
    setAnchorloginuser(event.currentTarget);
  };
  const handleCloseloginuser = () => {

    setAnchorloginuser(null);

  };
  function handleOnEnter(text) {
    msgcreate()
  }
  let chaturI = 'https://chatbackend-9uyt.onrender.com/'
  const token = Cookies.get('token')
  let sockets

  useEffect(() => {
    if (onetime === false) {

      setsocket(io(chaturI))
      setonetime(true)
    }
  }, [])


  const scroolbotom = useRef()

  const activeClasses = (e) => {
    const et = e.target
    let active = document.querySelector(".active");
    if (active) {
      active.classList.remove("active");
    }
    et.classList.add("active");
  }



  const updateprofile = async (e) => {
    e.preventDefault()
    if (name === "") {
      seterrdisplayname(true)
      return false
    }
    else {
      setloading(true)
      const formdata = new FormData()
      formdata.set('name', name)
      formdata.set('email', email)
      formdata.set('img', profile)
      const { data } = await axios.put(`${baseurl}/updateprofile?token=${token}`, formdata)
      if (data.status === true) {

        setloading(false)
        setShow(false)
        settemp(false)
      }
    }
  }

  useEffect(() => {
    axios.get(`${baseurl}/singleuser?token=${token}`
    ).then((res) => {
      // 
      setuserdetails(res.data.data)
      setsender(res.data.data[0]._id)
      setcurrentUserName(res.data.data[0].name)
      setsenderImage(res.data.data[0].profile.url)
      setimgpreview(res.data.data[0].profile.url)
      setemail(res.data.data[0].email)
      setname(res.data.data[0].name)
    }).catch(err => err)
    settemp(true)
  }, [temp])

  useEffect(() => {
    if (sender && query === "") {
      // setFriendloading(true)
      axios.post(`${baseurl}/allfriends?token=${token}`, {
        sender: sender, reciever: receiver
      }
      ).then((res) => {
        setFriendloading(false)
        setfriends(res.data.data)
      }).catch(err => err)
    }
  }, [sender, query])


  useEffect(() => {

    if (sender && receiver) {

      axios.post(`${baseurl}/getmessage?token=${token}`, {
        reciever: receiver, sender: sender
      }).then((res) => {

        if (res.data.status === true) {
          setmessage(res.data.data)
          res.data.data.map((it) => {
            let arr = []
            if (it.msg.file.url !== "") {

              // 
              arr.push(it.msg.file.url)
              setfilepreviews((p) => [...p, ...arr])
            }
          })
        }
      })

    }
  }, [receiver, sender, blockuser])

  const getblockuser = (receiver) => {
    axios.post(`${baseurl}/getblockuser?token=${token}`, {
      reciver: receiver, sender: sender
    }).then((res) => {

      if (res.data.status === true) {
        if (res.data.data.sender_blocker === sender) {

          setblockuser(true)
        } else {
          setblockuser(false)
        }
      } else {
        setblockuser(false)
      }
    })
  }


  function handleShowVideoCall() {
    peer.on('open', (id) => {
      console.log(id);
      
      socket.emit("videocall-user", { id, receiver, sender, currentUserName })
    })
    
    // navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    //   console.log(stream);
    //   setshowvideocall(true);
    //   setmystream(stream)
      
    //   // console.log(peer);
      
    //   peer.on("call", call => {
    //     call.answer(stream)
    //     call.on("stream", vidstream => {
    //       setremotestream(vidstream)
    //     })
      // })
    // }).catch((err) => {
    //   console.log(err);
    // })
  }


  const connectuser = (userid, stream) => {
    const call = peer.call(userid, stream)
    call.on("stream", vidstream => {
      setremotestream(vidstream)
    })
  }
  const Callaccpected = () => {
    connectuser(videocallSender, mystream)
  }
  const voiceCallaccpected = () => {
    connectuser(videocallSender, voicestream)
  }



  const handlevoiceCall = async () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    })
  }



  useEffect(() => {

    if (socket) {
      socket.on("recev-msg", (msg) => {
        console.log(msg);
        let messg = []
        let msgg = []
        messg.map((it) => {
          msgg = []
        })
        let frind = document.getElementById(msg.sender_id)

        if (frind.classList[1] === "active") {
          setarrivalmsg({ me: false, msg: { text: msg.msg, file: msg.file ,createAt:msg?.createAt} })
        } else {

          const span = document.createElement("span")
          // span.classList.add("dot")
          console.log(messg);
          span.setAttribute('id', 'dot')

          frind.appendChild(span)
        }
      })
      socket.on("incomingvideocall-user", (data) => {

        setcallersignal(data.signaldata)
        setvideocallSender(data.id)
        setshowvideocall(true)
        setphoneOff(true)
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {

          setmystream(stream)
          peer.on("call", call => {
            call.answer(stream)
            call.on("stream", vidstream => {
              setremotestream(vidstream)
            })
          })

          // connectuser(data.id,stream)
        })
      })

      socket.on("incomingvoicecall-user", (data) => {

        setcallersignal(data.signaldata)
        setvideocallSender(data.id)
        setshowvoicecall(true)
        setphoneOff(true)
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {

          setvoicestream(stream)
          peer.on("call", call => {
            call.answer(stream)
            call.on("stream", vidstream => {
              setvoiceremotestream(vidstream)
            })
          })

          // connectuser(data.id,stream)
        })
      })


      let arr = []
      socket.on('onlineuser', (data) => {
        setTimeout(() => {
          data?.forEach((it) => {
            if (it !== sender) {
              console.log(data);

              arr.push(it)

              let frind = document.getElementById(it)
              console.log("suraj1", frind?.lastChild?.localName);
              if (frind?.lastChild?.localName === "span") {

                return false
              } else {


                console.log(frind?.lastChild?.localName);

                const span = document.createElement("span")
                // span.classList.add("dot")
                span?.setAttribute('id', 'online')
                frind?.appendChild(span)

              }
            }
          })
        }, 1000);
        setonlineuser(arr)

      })

      socket.on("offlineuser", (data) => {
        data?.forEach((it) => {
          if (it !== sender) {
            console.log(data);

            // arr.push(it)


            let frind = document.getElementById(it)
            console.log(frind);

            // frind.removeChild(frind.lastChild)
            if (frind?.lastChild?.localName === "span" && frind?.lastChild?.id === "online") {
              frind.removeChild(frind.lastChild)
              // const span = document.createElement("span")
              // console.log(span);
              // span.setAttribute('id', 'offline')
              // frind?.appendChild(span)
            } else {

              return false
            }
          }
        })
      })

      socket.on('friend-add', (data) => {
        setfriends((p) => [...p, data])
      })

      socket.on("friend-request-accpect", (data) => {
        console.log(data);
        let frind = document.getElementById(data._id)
        console.log(frind?.classList);
        if (frind.classList[1] === "active") {
          setarrivalmsg({ me: false, msg: { text: data.msg, file: "" } })
        } else {
          const span = document.createElement("span")
          span.setAttribute('id', 'dot')

          frind.appendChild(span)
        }
        setcheckAccetion("")

      })
      settemp(true)

      return () => {
        socket.off("recev-msg", (msg) => {
          let frind = document.getElementById(msg.sender_id)


          if (frind.classList[1] === "actives") {
            setarrivalmsg({ me: false, msg: { text: msg.msg, file: msg.file } })
          } else {
            const span = document.createElement("span")
            span.setAttribute('id', 'dot')
            frind.appendChild(span)
          }
        })

        socket.off('friend-add', (data) => {
          setfriends((p) => [...p, data])
        })

        socket.off("friend-request-accpect", (data) => {

          let frind = document.getElementById(data._id)

          if (frind.classList[1] === "actives") {
            setarrivalmsg({ me: false, msg: { text: data.msg, file: "" } })
          } else {
            const span = document.createElement("span")
            span.setAttribute('id', 'dot')

            frind.appendChild(span)
          }
          setcheckAccetion("")

        })

      }
    }

  }, [socket, temp])
  useEffect(() => {
    arrivalmsg && setmessage((p) => [...p, arrivalmsg])
  }, [arrivalmsg])
  useEffect(() => {
    // window.scrollIntoView("bottom")
    // messagearea.scrollTop=messagearea.scrollHeight
    scroolbotom.current?.scrollTo(0, scroolbotom.current?.scrollHeight)
    // window.scrollTo(0, document.body.scrollHeight);
  }, [message, msgdisplay])


  useEffect(() => {
    if (onlineuser) {
      //     onlineuser.map((it)=>{  
      //       console.log(onlineuser);
      //       let frind = document.getElementById(it)
      //     console.log(frind);
      //     if(frind?.childNodes[2]===document.getElementById("online")){
      //       return 
      //     }
      //     const span = document.createElement("span")
      //     // span.classList.add("dot")
      //     span?.setAttribute('id', 'online')
      //     frind?.appendChild(span)
      // })
    }
  }, [friends])

  // const onlineusers= ()=>{
  //   if (onlineuser) {
  //         onlineuser.map((it)=>{  
  //           console.log(onlineuser);
  //           let frind = document.getElementById(it)
  //         console.log(frind);
  //         const span = document.createElement("span")
  //       // span.classList.add("dot")
  //       span?.setAttribute('id', 'online')
  //       frind?.appendChild(span)
  //     })
  //   }
  // }



  const spanelementRemove = (e) => {
    let frind = document.getElementById(e.target.id)

    let span = document.getElementById('dot')
    if (span) {

      frind.removeChild(span)
    }

  }


  async function videoCallend() {
    connectionref.current.destroy()
  }

  const handlecalluser = async () => {
    calluser()

  }

  const calluser = async (id) => {

  }






  useEffect(() => {
    // setsocket(io(chaturI))

    if (sender && socket) {
      let data = { id: sender }
      //  
      socket?.emit("add-user", data)
    }
  }, [sender, socket])

  const msgcreate = async () => {
    if (sendmsg.length > 0 || sendfile) {
      axios.post(`${baseurl}/getblockuser?token=${token}`, {
        reciver: receiver, sender: sender
      }).then(async (res) => {

        if (res.data.status === true) {
          setblockuser(true)

        } else {
          let msg = { msg: sendmsg, file: { url: imdpreview }, receiver_id: receiver, notificationtoken: notificationtoken, sender_id: sender, name: currentUserName ,createAt:new Date().toISOString()}
          setimdpreview("")

          socket?.emit("send-msg", msg)

          const msgs = [...message]
          msgs.push({ me: true, msg: { text: sendmsg, file: { url: imdpreview },createAt: new Date().toISOString()  }})
          setmessage(msgs)
          settemp(false)


          const formdata = new FormData()
          formdata.set("message", sendmsg)
          formdata.set("reciever", receiver)
          formdata.set("sender", sender)
          formdata.set("img", sendfile)

          const { data } = await axios.post(`${baseurl}/msgcreate?token=${token}`,
            formdata
          )

          if (data.status === true) {
            setsendmsg("")
            setfilepreview("")
          }

        }
      })
    }

  }

  const base64imgConvert = async (file) => {
    const filereader = new FileReader(file)
    filereader.onload = function (e) {

      setimdpreview(filereader.result)
    }
    filereader.readAsDataURL(file)
  }


  const searchfilter = async (query) => {
    setFriendloading(true)

    const { data } = await axios.get(`${baseurl}/allusers?searchname=${query}&token=${token}`)
    if (data.status === true) {
      setFriendloading(false)

      setfriends(data.data)
    } else {
      setFriendloading(false)
      setfriends([])
    }
  }

  const friendRequest = async () => {

    socket.emit("add-friend", { receiver: receiver, name: currentUserName, _id: sender, profile: senderImage, notificationtoken: notificationtoken })

    // const msgs = [...message]
    // msgs.push({ me: true, msg: { text: "See Hey🖐" } })
    // setmessage(msgs)

    settemp(false)
    const { data } = await axios.post(`${baseurl}/requestsend?token=${token}`, {
      reciver: receiver, sender: sender
    })

    if (data?.status === true) {
      if (data?.data?.accpect === 'Pending') {

        if (data?.data?.sennderId === sender) {
          setchatloading(false)
          setcheckAccetion("sender")
        } else {
          setchatloading(false)


          setcheckAccetion("reciver")
        }
      }
      // setsendmsg("")
      setsendmsg("")
      const dataS = await axios.post(`${baseurl}/msgcreate?token=${token}`, {
        reciever: receiver, sender: sender, message: "See Hey🖐"
      })
      if (dataS.data.status === true) {

      }
    }
  }

  const friendRequestAccpect = async () => {

    socket.emit("friend-request-accpect", { receiver: receiver, notificationtoken: notificationtoken, name: currentUserName, msg: "Request Accpecte🖐", _id: sender, profile: senderImage })
    setcheckAccetion("")

    const msgs = [...message]
    msgs.push({ me: true, msg: { text: "Request Accpecte🖐" } })
    setmessage(msgs)

    settemp(false)
    const { data } = await axios.post(`${baseurl}/requestaccpect?token=${token}`, {
      reciver: receiver, sender: sender,
    })

    if (data.status === true) {
      setsendmsg("")
      const { data } = await axios.post(`${baseurl}/msgcreate?token=${token}`, {
        reciever: receiver, sender: sender, message: "Request Accpecte🖐"
      })
      if (data.status === true) {

      }
    }
  }

  const checkFriends = async (receiver) => {

    setchatloading(true)
    const { data } = await axios.post(`${baseurl}/checkAccetion?token=${token}`, {
      reciver: receiver, sender: sender
    })


    if (data.status === true) {
      if (data.data === 'new connection') {

        setcheckAccetion("new_connection")
        setchatloading(false)
      }
      else {
        if (data.data.accpect === 'Pending') {

          if (data.data.sennderId === sender) {
            setchatloading(false)

            setcheckAccetion("sender")
          } else {
            setchatloading(false)

            setcheckAccetion("reciver")
          }
        }
        else {
          setchatloading(false)

          setcheckAccetion("")
        }
      }
    }
  }


  const userBlock = async () => {
    const { data } = await axios.post(`${baseurl}/userblock?token=${token}`, {
      sender: sender, reciver: receiver
    })


    if (data.status === true) {
      setblockuser(true)
      setModalShow(false)
      // getblockuser()
    } else {
      setModalShow(false)
    }
  }

  const userUnBlock = async () => {
    const { data } = await axios.post(`${baseurl}/unblock?token=${token}`, {
      sender: sender, reciver: receiver
    })

    if (data.status === true) {

      setblockuser(false)
      setModalShow(false)
      // getblockuser()
    } else {
      setModalShow(true)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [])


  const navigate = useNavigate()
  const logout = () => {
    Cookies.remove('token')
    socket.emit("disconnectuser", sender)
    navigate('/')
  }

  return (
    <>
      <div className='aside'>
      <Helmet  title={currentUserName}> </Helmet>
        <div className={`maindev ${friendshideClass}`}>
          <div className="currentuser">
            <div style={{ display: "flex", width: "100%" }}>
              <img className='img' alt="Remy Sharp" src={senderImage ? senderImage : avtar} />
              <p >{currentUserName}</p>
            </div>
            <label htmlFor="" className='voicecall' onClick={handleClickloginuser}>
              <BsThreeDotsVertical onClick={handleClickloginuser} size={20} />
            </label>
            <Menu
              id="basic-menu"
              anchorEl={anchorloginuser}
              open={openloginuser}
              onClose={handleCloseloginuser}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => {
                handleCloseloginuser()
                setShow(true)
              }
              }>View Profile</MenuItem>
              <MenuItem onClick={() => {
                logout()
              }}>Logout</MenuItem>
            </Menu>
          </div>

          <div className='search'>

            <input type='search' placeholder='Search friends' onChange={(e) => {
              // setfriendshideClass("friendshide")
              searchfilter(e.target.value)
              setquery(e.target.value)
            }} />
          </div>
          {Friendloading ? <div className='spiners'> 
          <Lottie style={{ width: "100px" }} />
          </div>
            :


            <div className='friendslist'>


              {friends.length > 0 && friends
                .map((it) => {
                  return (

                    <>
                      {/* <NavLink to={""}> */}
                      <div className="friends" lang={it.name} title={it?.profile?.url} id={it._id} onClick={(e) => {
                        setchatboxClass("messageshow")
                        setfriendshideClass("friendshide")
                        getblockuser(it._id)
                        setheadersetImg(it?.profile?.url)
                        activeClasses(e)
                        setreceiver(it._id)
                        setheadersetName(it.name)
                        checkFriends(it._id)
                        spanelementRemove(e)
                        setmsgdisplay(true)
                        setnotificationtoken(it?.notificationtoken)

                      }}>

                        <div title={it?.profile?.url} lang={it.name} >
                          <img title={it?.profile?.url} lang={it.name} className='img' alt="Remy Sharp"
                            src={it?.profile?.url ? it?.profile?.url : avtar} />

                        </div>
                        {/* <Highlighter
                          highlightClassName="YourHighlightClass"
                          searchWords={query.split('')}
                          autoEscape={true}
                          textToHighlight={it.name}
                        /> */}
                        <p title={it.profile.url} lang={it.name} > <Highlighter
                          highlightClassName="YourHighlightClass"
                          searchWords={query.split('')}
                          autoEscape={true}
                          textToHighlight={it.name}
                          title={it.profile.url} lang={it.name}
                        /></p>
                        {/* {it?.online===true ?<span id="online"></span>:null} */}
                      </div>
                      {/* </NavLink> */}

                    </>
                  )
                })}

            </div>}
        </div>

        {msgdisplay ?

          <div className={`message ${chatboxClass}`}>
            <div className="header">
              <div className="info">
                <span className="backbtn">
                  <MdOutlineKeyboardBackspace cursor={"pointer"} size={32} onClick={() => {
                    setchatboxClass("")
                    setfriendshideClass("")
                  }} />
                </span>

                <div>
                  <img src={headersetImg ? headersetImg : avtar} alt="profile" />
                </div>

                <p>{headersetName}</p>
              </div>
              <div className="othercommunication">

                <label htmlFor="" className="vidcall" onClick={handleShowVideoCall}>
                  <HiOutlineVideoCamera size={32} />
                </label>

                <label htmlFor="" className="voicecall" onClick={() => {
                  setModalShow(true)
                }}>
                  <MdCall size={32} />
                </label>
                <div>
                  <label htmlFor="" className="voicecall" onClick={handleClick}>
                    <BsThreeDotsVertical size={26} />
                  </label>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}>Delete Chat</MenuItem>
                    {blockuser === false ? <MenuItem onClick={() => {
                      setModalShow(true)
                      handleClose()
                    }}>Block</MenuItem> : <MenuItem onClick={() => {
                      setModalShow(true)
                      handleClose()
                    }}>unBlock</MenuItem>}
                  </Menu>
                </div>

              </div>
            </div>
            <div>
              <div ref={scroolbotom} className="chatmsg">
                {chatloading ?
                  <div className='spin'>
                    {/* <Spinner animation="border" style={{position:"absolute"}}/> */}
                    <Lottie/> 
                    {/**/}
                  </div> :

                  <>
                    {checkAccetion === "sender" ? <Card>
                      <Card.Body>
                        <Card.Title>
                          <div className='request'>
                            <img src={headersetImg ? headersetImg : avtar} alt="profile" />
                            <p>{headersetName}</p>
                          </div>

                        </Card.Title>
                        <div className='btn1'>
                          <Button variant="primary">Pending</Button>
                        </div>
                      </Card.Body>
                    </Card> : checkAccetion === 'reciver' ?
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            <div className='request'>
                              <img src={headersetImg ? headersetImg : avtar} alt="profile" />
                              <p>{headersetName}</p>
                            </div>

                          </Card.Title>
                          <div className='btn1'>
                            {/* <Button onClick={userUnBlock} variant="primary">Block</Button> */}
                            <Button onClick={friendRequestAccpect} variant="primary">Accpect</Button>
                          </div>
                        </Card.Body>
                      </Card>
                      : checkAccetion === 'new_connection' ?
                        <Card>
                          <Card.Body>
                            <Card.Title>
                              <div className='request'>
                                <img src={headersetImg ? headersetImg : avtar} alt="profile" />
                                <p>{headersetName}</p>
                              </div>

                            </Card.Title>
                            <div className='btn1'>

                              <Button onClick={friendRequest} variant="primary">See hey</Button>
                            </div>
                          </Card.Body>
                        </Card>
                        : <>
                          {message.length > 0 && message.map((msg, i) => {

                            return (
                              <>
                              
                                
                                <div className={`${msg.me ? "outgoing" : "incoming"}`} >
                                  <div>
                                    {msg?.msg?.text ?
                                      <p className={`${msg.msg.text.length > 100 ? "outgoingwidset" : "outgoinfitcontent"}`} >
                                        {showless === i + 1 ? <span>{msg.msg.text}...<sapn style={{ color: "blue", background: "transparent" }} onClick={(e) => {
                                          setshowless("")
                                        }}>Show Less</sapn> </span> :
                                          msg.msg.text.length > 100 ?
                                            <span>{msg.msg.text.slice(0, 250)}......
                                              <sapn id={i + 1} onClick={(e) => {

                                                setshowless(parseInt(e.target.id))
                                              }} style={{ color: "blue", background: "transparent" }}>Show More</sapn>
                                            </span> :
                                            <>
                                            <div style={{display:"flex",flexDirection:"column"}}>

                                              <span>
                                                {msg.msg.text}
                                              </span>
                                              
                                              <span style={{fontSize:"11px"}}>  {new Date(msg?.msg?.createAt).getHours().toString().padStart(2, '0') +':'+new Date(msg?.msg?.createAt).getMinutes().toString().padStart(2, '0') }</span>
                                            </div>

                                            </>
                                        }
                                        <div>

                                          <span id={msg.msg.text} onClick={handleClickmsg}>
                                            <BsThreeDotsVertical id={msg.msg.text} />
                                          </span>
                                          <Menu
                                            id="basic-menu"
                                            anchorEl={anchorElmsg}
                                            open={openmsg}
                                            onClose={handleClosemsg}
                                            MenuListProps={{
                                              'aria-labelledby': 'basic-button',
                                            }}
                                          >
                                            {/* <MenuItem onClick={handleClosemsg}>Delete </MenuItem> */}
                                            <MenuItem onClick={(e) => {
                                              // 
                                              navigator.clipboard.writeText(copytext)
                                              handleClosemsg()
                                            }}>copy</MenuItem>
                                          </Menu>
                                        </div>
                                      </p> : null}
                                    {msg?.msg?.file?.url ?
                                      <div className='files' id={msg.msg.file?.url}>
                                        <div>


                                          <img src={msg.msg.file.url} id={msg.msg.file?.url} alt="" onClick={(e) => {
                                            setfilepreview(e.target.id)
                                            // setModalShow(true)
                                            let img = e.target.id
                                            filepreviews.splice(img, 1)
                                            filepreviews.unshift(img)
                                            setToggler(!toggler)
                                          }} />
                                          <span onClick={handleClickmsg}>
                                            <BsThreeDotsVertical />
                                          </span>
                                        </div>
                                      </div>

                                      : null
                                    }
                                  </div>
                                </div>
                              </>
                            )
                          })}</>}
                  </>
                }
              </div>
            </div>
            <div className="msgcreate">
              <div>
                {imdpreview && <div className="filecontainer">
                  <img src={imdpreview} alt="" />
                </div>}
              </div>
              <div className='emoji'>
                <InputEmoji
                  value={sendmsg}
                  onChange={setsendmsg}
                  cleanOnEnter
                  onEnter={handleOnEnter}
                  placeholder="Type a message"
                  fontSize={15}
                />
                <label htmlFor='imgfiles'>
                  <AiOutlineLink size={30} />
                  <input hidden type="file" accept=".jpg,.png,.jpeg" name="" id="imgfiles" onChange={(e) => {

                    let prev = URL.createObjectURL(e.target.files[0])

                    setsendfile(e.target.files[0])
                    base64imgConvert(e.target.files[0])
                  }} />
                </label >

                <button className='sendbtn' onClick={msgcreate}>
                  <IoIosSend size={30} />
                </button>
              </div>
            </div>


            <FsLightbox
              toggler={toggler}
              sources={
                // 'https://i.imgur.com/fsyrScY.jpg',
                // 'https://www.youtube.com/watch?v=xshEZzpS4CQ',
                // 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                filepreviews
              }
            />



            <Modal
              backdrop="static"
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={modalShow}
              onHide={() => setModalShow(false)}

            >
              <Modal.Header closeButton>

              </Modal.Header>
              <Modal.Body>
                <div style={{ width: "100%" }}>
                  {`You want to block this user `}



                  {/* <img src={filepreview} style={{ width: "100%" }} alt="" /> */}
                  {/* <div className="call">
                  call
                </div>
                <div className='callicons'>
                  <span id='callend'><FiPhoneOff color='white' size={30} /></span>
                  <span id='calltake'><TbPhoneCall color='white' size={30} /></span>
                </div> */}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button className='block-btn' variant="success" onClick={() => setModalShow(false)}>Cancel</button>
                {blockuser ?
                  <button onClick={userUnBlock} className='block-btn'>UnBlock</button>
                  :
                  <button onClick={userBlock} className='block-btn success-btn'>Block</button>
                }
              </Modal.Footer>
            </Modal>
          </div>
          : <div className={`welcome `}>
            <div className='userinfo'>
              <div id='profileimg'>
                <img src={senderImage ? senderImage : avtar} alt="" />
              </div>
              <p>Welcome to {currentUserName}</p>
            </div>

          </div>}


        <Modal show={show} size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered backdrop="static"
          keyboard={false} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{incomminUserName ? `Calling From ${incomminUserName}` : `Calling to ${headersetName}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="container-login container-height">
              <div className="wrap-login">
                <form onSubmit={updateprofile}>

                  <span className="login-form-title">Profile</span>
                  {/* <img className="avatar"src="img/user.svg" alt="" align="center" /> */}
                  {/* <img className="avatar" src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="" align="center" /> */}

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
                    <input className="input100" placeholder='Enter your email' disabled type="email" value={email} name="" id="" />
                    <span className="focus-efecto"></span>
                  </div>

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
                      <button type="submit" name="btnEntrar" className="login-form-btn"  >{loading ? <CircularProgress /> : "Update"}</button>
                    </div>
                  </div>
                </form>

              </div>
            </div>

            {/* <div>
                <div className="call">
                  <ReactPlayer url={mystream} playing muted />

                  <ReactPlayer url={remotestream} playing muted />

                </div>
                <div className='callicons'>
                  <span id='callend' ><FiPhoneOff onClick={videoCallend} color='white' size={30} /></span>
                  {phoneOff ?
                    <span id='calltake'><TbPhoneCall onClick={Callaccpected} color='white' size={30} /></span> : null}
                </div>
              </div> */}

          </Modal.Body>
        </Modal>
        <Modal show={showvoicecall} size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered backdrop="static"
          keyboard={false} onHide={() => setshowvoicecall(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{incomminUserName ? `Calling From ${incomminUserName}` : `Calling to ${headersetName}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div>
              <div className="call">
                <ReactAudioPlayer src={voicestream} autoPlay />

                <ReactAudioPlayer src={remotestream} playing muted />

              </div>
              <div className='callicons'>
                <span id='callend' ><FiPhoneOff onClick={videoCallend} color='white' size={30} /></span>
                {phoneOff ?
                  <span id='calltake'><TbPhoneCall onClick={Callaccpected} color='white' size={30} /></span> : null}
              </div>
            </div>

          </Modal.Body>
        </Modal>


        <Modal show={showvideocall} size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered backdrop="static"
          keyboard={false} onHide={() => setshowvideocall(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{incomminUserName ? `Calling From ${incomminUserName}` : `Calling to ${headersetName}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div>
              <div className="call">
                <ReactPlayer url={mystream} playing muted />

                <ReactPlayer url={remotestream} playing muted />

              </div>
              <div className='callicons'>
                <span id='callend' ><FiPhoneOff onClick={videoCallend} color='white' size={30} /></span>
                {phoneOff ?
                  <span id='calltake'><TbPhoneCall onClick={Callaccpected} color='white' size={30} /></span> : null}
              </div>
            </div>

          </Modal.Body>
        </Modal>

      </div>
    </>
  )
}

export default Chat