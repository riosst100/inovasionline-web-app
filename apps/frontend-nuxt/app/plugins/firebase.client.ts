import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging"

export default defineNuxtPlugin(async () => {

  if (!(await isSupported())) {
    return
  }

  const firebaseConfig = {
    apiKey: "AIzaSyA6vPoXAXE6VHeCkzzXgc6sMSlEQyGlLz0",
    authDomain: "inovasi-online.firebaseapp.com",
    projectId: "inovasi-online",
    storageBucket: "inovasi-online.firebasestorage.app",
    messagingSenderId: "67090412940",
    appId: "1:67090412940:web:6fa84e0dbcb6eb387012a9",
    measurementId: "G-262YGLM1ZS"
  }

  const app = initializeApp(firebaseConfig)
  const messaging = getMessaging(app)

  return {
    provide: {
      messaging,

      getFcmToken: async () => {
        if (!('Notification' in window)) return null

        const permission = await Notification.requestPermission()
        if (permission !== 'granted') return null

        const token = await getToken(messaging, {
          vapidKey: "BP7srRtObkMUrGYmR6Z52AJN96HTit_7fhW4O5QNMtc12HYbaFfmDdKhg0MBzWIsAoxU6rCgR9wA8ZOyKMKb2EQ"
        })

        return token
      },

      onForegroundMessage: (cb: any) => {
        onMessage(messaging, cb)
      }
    }
  }
})
