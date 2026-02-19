import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { db } from "../config/firebaseConfig";


export async function userLogin(email,password){
  const response = await signInWithEmailAndPassword(auth,email,password);
  return response.user;
}

export async function userRegister(email,password){
  const response = await createUserWithEmailAndPassword(auth,email,password);
  return response.user;
}

export async function getUserById(userId) {

  const user = doc(db, "users", userId);
  const userSnap = await getDoc(user);

  if (!userSnap.exists()) {
    throw new Error("User not found!");
  }

  return {
    id: userSnap.id,
    ...userSnap.data(),
  };
}

export async function createDBUser(userId, name, email,profilePictureUrl) {
  await setDoc(doc(db, "users", userId), {
    name,
    email,
    profilePictureUrl,
    projects: [],
    createdAt: new Date(),
  });

  const user = await getUserById(userId);
  return user;
}
