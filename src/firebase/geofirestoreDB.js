import firebase from './firebaseDB';
import * as geofirestore from 'geofirestore';
const GeoFirestore = geofirestore.initializeApp(firebase.firestore());
export default GeoFirestore;