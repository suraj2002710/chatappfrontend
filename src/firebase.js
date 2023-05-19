import { initializeApp } from "firebase/app";
import {getMessaging} from 'firebase/messaging'
const firebaseConfig = {
    apiKey: "AIzaSyAHByJtczqtU1o8xjq0TQqWD8juGcQIyu0",
    authDomain: "chat-notification-6e1cc.firebaseapp.com",
    projectId: "chat-notification-6e1cc",
    storageBucket: "chat-notification-6e1cc.appspot.com",
    messagingSenderId: "307750082265",
    appId: "1:307750082265:web:0afa004e7e34728b0dd0c8",
    measurementId: "G-T06TBY9M13"
  };
  const app = initializeApp(firebaseConfig);
export const messageing=getMessaging(app)