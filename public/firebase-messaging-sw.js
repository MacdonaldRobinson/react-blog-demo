// src/firebase/firebase-messaging-sw.js

// Give the service worker access to Firebase Messaging.
// Replace 10.13.2 with the version of the Firebase JS SDK you're using
// in your app.
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'api-key',
  authDomain: 'vite-test-3ae2c.firebaseapp.com',
  databaseURL: 'https://vite-test-3ae2c.firebaseio.com',
  projectId: 'vite-test-3ae2c',
  storageBucket: 'vite-test-3ae2c.appspot.com',
  messagingSenderId: '851395576158',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
});

// Retrieve an instance of Firebase Messaging so that it can handle
// background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Title!';
  const notificationOptions = {
    body: 'Background Body!',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
