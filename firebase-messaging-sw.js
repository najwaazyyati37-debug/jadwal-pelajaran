importScripts("https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDXPdmLeBWh7NN46HQScDEW2731jAA5T7k",
  authDomain: "aplikasi-jadwal-dan-tugas.firebaseapp.com",
  projectId: "aplikasi-jadwal-dan-tugas",
  storageBucket: "aplikasi-jadwal-dan-tugas.firebasestorage.app",
  messagingSenderId: "835649858878",
  appId: "1:835649858878:web:6d1fab4136744e0bbbd06f",
});

// Inisialisasi messaging untuk background
const messaging = firebase.messaging();

// Ketika notifikasi diterima saat aplikasi DITUTUP
messaging.onBackgroundMessage(payload => {
  console.log("Pesan background diterima:", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "icon.png"
    }
  );
});
