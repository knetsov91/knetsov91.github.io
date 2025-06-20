import data from "../data.json";
import Project from "./Project/Project";
import { useState } from "react";

const Projects = () => {
    const [projects, setProjects] = useState(data); 

    return (
        <>
            {projects.map(p => <Project
                                    project={p}
                                    key={p.id} />
                        )
            }
        </>
    );
}

export default Projects;