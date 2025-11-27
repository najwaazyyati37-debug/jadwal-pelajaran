if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("firebase-messaging-sw.js")
    .then(reg => {
      console.log("Service Worker registered:", reg);
    })
    .catch(err => {
      console.error("Service Worker registration failed:", err);
    });
}

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Tombol aktifkan notifikasi FCM
document.getElementById("notifBtn").addEventListener("click", async () => {
  try {
    // Minta izin
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Izin notifikasi ditolak!");
      return;
    }

    // Ambil FCM token
    const token = await messaging.getToken({
      vapidKey: "BDNdAXrRvkNBGctrZogjIXP4uaVIhMEm9Da2jJpdJehQBsgZaHuXqGC2mAHWALY_j8ULYYXlA8ID0QR6bcV_o9k"
    });

    console.log("TOKEN FCM:", token);
    localStorage.setItem("fcmToken", token);

    alert("Notifikasi FCM berhasil diaktifkan!");

  } catch (err) {
    console.error("Gagal mengaktifkan FCM:", err);
  }
});

// Jika menerima pesan saat halaman sedang terbuka
messaging.onMessage((payload) => {
  console.log("Pesan foreground diterima:", payload);

  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: "icon,190.png"
  });
});
