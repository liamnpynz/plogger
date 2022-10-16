import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  setDoc,
} from "firebase/firestore";
import {
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import { connectAuthEmulator } from "firebase/auth";
import date from "date-and-time";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8080);

export const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099");

export const prepareSchemaForPossibleNewUser = async () => {
  const uid = auth.currentUser.uid;
  const docRef = doc(db, "users", uid);

  const querySnapshot = await getDoc(docRef);
  if (querySnapshot.exists()) {
    // console.log("user does exist, no need to create schema.")
  } else {
    // console.log("user does not exist, need to create schema.")
    const timeNow = date.format(new Date(), "ddd, DD MMM YY hh:mm A");
    const newDefaultUserSchema = { creation_date: timeNow, workouts: [] };
    await setDoc(doc(db, "users", uid), newDefaultUserSchema);
    // console.log("schema added")
  }
};

export const retrieveUsersWorkoutHistory = async () => {
  try {
    const uid = auth.currentUser.uid;
    const docRef = doc(db, "users", uid);

    const querySnapshot = await getDoc(docRef);
    if (querySnapshot.exists()) {
      const results = querySnapshot.data();
      return results;
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    // No document will be found because no workout history
  }
};

export const deleteAllDocs = async (userID) => {
  await deleteDoc(doc(db, "users", userID));
  const user = auth.currentUser;
  await deleteUser(user);
};

export const addWorkout = async (workout) => {
  const uid = auth.currentUser.uid;
  const theRef = doc(db, "users", uid);
  await updateDoc(theRef, {
    workouts: arrayUnion(workout),
  });
};
