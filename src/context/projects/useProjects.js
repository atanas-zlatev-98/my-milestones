import { useContext } from "react";
import { ProjectsContext } from "./ProjectsProvider";

export default function useProjects() {
    const context = useContext(ProjectsContext);
    return context
}