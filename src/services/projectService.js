import { db } from "../config/firebaseConfig";
import { doc, updateDoc, arrayUnion, collection, addDoc, Timestamp} from "firebase/firestore";

export const createProject = async (userId, projectData) => {

  try {
    const projectRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdBy: userId,
      createdAt: Timestamp.now(),
    });

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      projects: arrayUnion(projectRef.id),
    });

  } catch (error) {
    throw new Error(`Failed to create project: ${error}`);
  }
};
