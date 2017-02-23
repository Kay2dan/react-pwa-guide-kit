importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyBfdmWiLAgIPCN-LADPTQtqD54TWdMzmZk",
  messagingSenderId: "1075172756206"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

// using message api of firebase instead of push event handler
// when we got a message in raw formatn without body message in notification
// [Receive Messages in a JavaScript Client](https://goo.gl/B6qqOu)
messaging.setBackgroundMessageHandler(({data} = {}) => {
  const title = data.title || 'Title';
  const opts = Object.assign({
    body: 'Body'
  }, data);

  return self.registration.showNotification(title, opts);
});