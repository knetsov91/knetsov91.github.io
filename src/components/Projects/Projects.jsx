import { useEffect, useState } from "react";
import data from "../../data.json";
import Project from "../Project/Project";
import style from "./Projects.module.css";

const PAGE_SIZE = 3;
const FILTERS = ["all", "frontend", "backend", "full-stack", "infrastructure"];

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        setProjects(data);
    }, []);

    const filtered = filter === "all" ? projects : projects.filter(p => p.type === filter);
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleFilter = (f) => {
        setFilter(f);
        setPage(1);
    };

    const countFor = (f) => f === "all" ? projects.length : projects.filter(p => p.type === f).length;

    return (
        <>
            <div className={style.filters}>
                {FILTERS.map(f => (
                    <button
                        key={f}
                        onClick={() => handleFilter(f)}
                        className={filter === f ? style.active : ""}
                    >
                        {f} ({countFor(f)})
                    </button>
                ))}
            </div>
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
