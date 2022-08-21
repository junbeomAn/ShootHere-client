import {
  getDatabase,
  set,
  ref,
  Database,
  get,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export class ReservationDB<T> {
  db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  write = (reservation: T, userId: string) => {
    const reservationId = uuidv4();
    set(ref(this.db, `reservation/${reservationId}`), {
      ...reservation,
      userId,
    });
  };

  getUserReservation = async (userId: string) => {
    if (!userId) {
      throw new Error('Login required!');
    }
    const q = query(
      ref(this.db, 'reservation'),
      orderByChild('userId'),
      equalTo(userId)
    );
    const res = await get(q);
    console.log(res.val());
  };
}

export const reservationDb = new ReservationDB(database);
