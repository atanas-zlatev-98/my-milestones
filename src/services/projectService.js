import { db } from "../config/firebaseConfig";
import { doc, updateDoc,getDocs, arrayUnion, collection, addDoc, Timestamp, query,where} from "firebase/firestore";

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


export const getAllProjects = async (userId) => {
  try{
      console.log('Fetching projects for userId:', userId);
      const projectsQuery = query(collection(db,'projects'),where('createdBy','==',userId));
      const querySnapshot = await getDocs(projectsQuery);
      console.log('Total docs found:', querySnapshot.size);
      console.log('Docs:', querySnapshot.docs.map(d => d.data()));
      const projects = querySnapshot.docs.map(doc => ({id:doc.id,...doc.data()}));
      return projects;

  }catch(err){
    console.log(`REAL ERROR`, err);
    throw new Error(`Failed to fetch projects: ${err}`);
  }
}