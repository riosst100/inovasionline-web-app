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

// tetap pakai ini untuk desktop / fallback
messaging.onBackgroundMessage(function (payload) {
  show(payload)
})

// 🔥 tambahan untuk Android Chrome
self.addEventListener('push', function (event) {

  if (!event.data) return

  let payload = {}

  try {
    payload = event.data.json()
  } catch (e) {
    return
  }

  show(payload)
})

function show(payload) {

  console.log('[SW] show payload', payload)

  const data = payload.data || payload.notification || {}

  const title = data.title || 'Notif'
  const options = {
    body: data.body || '',
    icon: '/icon.png'
  }

  self.registration.showNotification(title, options)
}
