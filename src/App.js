import './App.css';
import Chat from './chat/Chat';
import {BrowserRouter,Routes,Route, useNavigate} from "react-router-dom"
import Login from '../src/form/Login'
import { lazy, Suspense, useEffect } from 'react';
import Otp from './form/Otp';
import Sinup from './form/Sinup';
import Cookies  from "js-cookie";
import { createBrowserHistory } from 'history';

function App() {
  const token = Cookies.get('token')
  // const navigate=useNavigate()
  // useEffect(() => {
  //   if(!token){
  //     navigate('/')
  //   }else{
      
  //   }
  // }, [])
  return (
    <>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/otp' element={<Otp/>}/>
      <Route path='/sinup' element={<Sinup/>}/> 
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
