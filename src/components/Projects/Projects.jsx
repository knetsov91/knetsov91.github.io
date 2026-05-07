import { useEffect, useState } from "react";
import data from "../../data.json";
import Project from "../Project/Project";
import style from "./Projects.module.css";

const PAGE_SIZE = 3;

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setProjects(data);
    }, []);

    const totalPages = Math.ceil(projects.length / PAGE_SIZE);
    const visible = projects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <>
            {visible.map(p => <Project project={p} key={p.id} />)}
            {totalPages > 1 && (
                <div className={style.pagination}>
                    <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>&#8592;</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                        <button
                            key={n}
                            onClick={() => setPage(n)}
                            className={page === n ? style.active : ""}
                        >
                            {n}
                        </button>
                    ))}
                    <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>&#8594;</button>
                </div>
            )}
        </>
    );
}

export default Projects;
