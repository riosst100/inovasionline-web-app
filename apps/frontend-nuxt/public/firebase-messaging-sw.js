importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: "AIzaSyA6vPoXAXE6VHeCkzzXgc6sMSlEQyGlLz0",
  authDomain: "inovasi-online.firebaseapp.com",
  projectId: "inovasi-online",
  storageBucket: "inovasi-online.firebasestorage.app",
  messagingSenderId: "67090412940",
  appId: "1:67090412940:web:6fa84e0dbcb6eb387012a9"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {

  console.log('[SW] push payload', payload)

  const title = payload.data?.title || 'Notif'
  const options = {
    body: payload.data?.body || '',
    icon: '/icon.png'
  }

  self.registration.showNotification(title, options)
})



// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyA6vPoXAXE6VHeCkzzXgc6sMSlEQyGlLz0",
//   authDomain: "inovasi-online.firebaseapp.com",
//   projectId: "inovasi-online",
//   storageBucket: "inovasi-online.firebasestorage.app",
//   messagingSenderId: "67090412940",
//   appId: "1:67090412940:web:6fa84e0dbcb6eb387012a9",
//   measurementId: "G-262YGLM1ZS"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);