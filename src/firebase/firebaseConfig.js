import {FirebaseApp, initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBGhRpT5bma6H8ijqEvQrJUafyzA8968c4",
    authDomain: "uas-ppm-a3b51.firebaseapp.com",
    projectId: "uas-ppm-a3b51",
    storageBucket: "uas-ppm-a3b51.firebasestorage.app",
    messagingSenderId: "1035650615503",
    appId: "1:1035650615503:web:e571711b7c21dbfde00fba"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);