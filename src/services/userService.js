import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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
}
