import firebase from 'firebase';

class FirebaseMessaging {
  constructor(config = {}) {
    config = Object.assign({
      handleMessage: () => {}
    }, config);
    
    this.app = firebase.initializeApp(config);
    this.handleMessage = config.handleMessage;
  }

  requirestPermission() {
    const messaging = firebase.messaging();

    if (this.handleMessage) {
      messaging.onMessage(this.handleMessage);
    }

    return messaging.requestPermission().then(() => messaging.getToken());
  }
}

export default FirebaseMessaging;