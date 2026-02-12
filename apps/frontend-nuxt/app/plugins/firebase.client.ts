import { initializeApp } from "firebase/app"
import {
  getMessaging,
  getToken,
  onMessage,
  deleteToken,
  isSupported
} from "firebase/messaging"

export default defineNuxtPlugin(async () => {

  // Cegah error di browser / mode yang tidak support
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

      // expose messaging (optional, for debug)
      messaging,

      // ambil / generate token FCM
      getFcmToken: async () => {
        if (!('Notification' in window)) return null

        const permission = await Notification.requestPermission()
        if (permission !== 'granted') return null

        const token = await getToken(messaging, {
          vapidKey: "BP7srRtObkMUrGYmR6Z52AJN96HTit_7fhW4O5QNMtc12HYbaFfmDdKhg0MBzWIsAoxU6rCgR9wA8ZOyKMKb2EQ"
        })

        return token
      },

      // 🔥 RESET TOKEN DI DEVICE (PC / ANDROID)
      resetFcmToken: async () => {
        try {
          await deleteToken(messaging)
          return true
        } catch (e) {
          console.error('resetFcmToken failed', e)
          return false
        }
      },

      // handler pesan foreground
      onForegroundMessage: (cb: any) => {
        onMessage(messaging, cb)
      }
    }
  }
})
