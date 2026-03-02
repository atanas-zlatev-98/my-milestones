import { db } from "../config/firebaseConfig";
import { doc, updateDoc, getDocs, getDoc, arrayUnion, collection, addDoc, Timestamp, query, where, deleteDoc, arrayRemove} from "firebase/firestore";

export const createProject = async (userId, projectData) => {

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User not found");
  }

  const projectRef = await addDoc(collection(db, "projects"), {
    ...projectData,
    createdBy: userId,
    createdAt: Timestamp.now(),
  });

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

  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User not found");
  }

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

export const getProjectById = async (id) => {

    const projectRef = doc(db, 'projects', id);
    const projectSnap = await getDoc(projectRef);

    if(!projectSnap.exists()) {
        throw new Error("Project not found");
    }

    return { id: projectSnap.id, ...projectSnap.data() };
}

export const updateTaskItem = async (project, taskId) => {

  const projectRef = doc(db, "projects", project.id);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    throw new Error("Project not found");
  }

  const updatedTasks = project.tasks.map((task) =>
    task.id === taskId
      ? { ...task, completed: true, completedOn: new Date().toISOString() }
      : task,
  );

  await updateDoc(projectRef, { tasks: updatedTasks });

  return { ...project, tasks: updatedTasks };
};

export const completeProjects = async (project) => {

   const projectRef = doc(db, 'projects', project.id);
   const projectSnap = await getDoc(projectRef);

    if(!projectSnap.exists()) {
        throw new Error("Project not found");
    }

    await updateDoc(projectRef, {
        completed: true,
        completedOn: new Date().toISOString(),
    });

    return { ...project, completed: true, completedOn: new Date().toISOString() };
};

export const delProject = async (projectId,userId) => {

  const projectRef = doc(db, 'projects', projectId);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    throw new Error("Project not found");
  }

  await deleteDoc(projectRef);

  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User not found");
  }

  await updateDoc(userRef, {
    projects: arrayRemove(projectId),
  });

}
