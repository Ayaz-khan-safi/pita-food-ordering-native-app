import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'BM1uzEDTUa7kv3IvaIbQaXEvytS4jYPEOcNf4KupgnyMx-1tG6QX44wM6P2k3Qk48lPrMyY2EalGXsoCDsdzxRU',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
