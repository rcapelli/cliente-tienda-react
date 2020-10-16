import app, { firestore } from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './config';
import 'firebase/storage';

class Firebase {
    constructor(){
        app.initializeApp(firebaseConfig)
        this.db = app.firestore()
        this.storage = app.storage();
    }
} 


const firebase = new Firebase();
export default firebase;