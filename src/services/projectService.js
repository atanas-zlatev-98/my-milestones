import { db } from "../config/firebaseConfig";
import { doc, updateDoc,getDocs,arrayUnion,collection,addDoc,Timestamp,query,where} from "firebase/firestore";

export const createProject = async (userId, projectData) => {

  const projectRef = await addDoc(collection(db, "projects"), {
    ...projectData,
    createdBy: userId,
    createdAt: Timestamp.now(),
  });

  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    projects: arrayUnion(projectRef.id),
  });

   return {
    id: projectRef.id,
    ...projectData,
    createdBy: userId,
    createdAt: Timestamp.now(),
  };

};

export const getAllProjects = async (userId) => {

  const projectsQuery = query(
    collection(db, "projects"),
    where("createdBy", "==", userId),
  );

  const querySnapshot = await getDocs(projectsQuery);

  const projects = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return projects;
};
