import { useEffect, useState } from "react";
import data from "../../data.json";
import Project from "../Project/Project";
import style from "./Projects.module.css";
import { CATEGORY_TAGS, matchesCategories } from "../../utils/categories";

const PAGE_SIZE = 3;
const FILTERS = ["all", "frontend", "backend", "full-stack", "infrastructure"];
const CATEGORIES = Object.keys(CATEGORY_TAGS);

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("all");
    const [demoOnly, setDemoOnly] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setProjects(data);
    }, []);

    const matchesType = (p, f) => f === "all" || p.type === f;
    const hasDemo = (p) => p.demoGifs && p.demoGifs.length > 0;
    const matchesAll = (p, f) => matchesType(p, f) && (!demoOnly || hasDemo(p)) && matchesCategories(p, categories);

    const filtered = projects.filter(p => matchesAll(p, filter));
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleFilter = (f) => {
        setFilter(f);
        if (f === "all") setDemoOnly(false);
        setPage(1);
    };

    const handleDemoFilter = () => {
        setDemoOnly(d => {
            const next = !d;
            if (next) setFilter("all");
            return next;
        });
        setPage(1);
    };

    const handleCategoryFilter = (c) => {
        setCategories(cs => cs.includes(c) ? cs.filter(x => x !== c) : [...cs, c]);
        setPage(1);
    };

    const countFor = (f) => f === "all"
        ? projects.length
        : projects.filter(p => matchesAll(p, f)).length;
    const demoCount = projects.filter(p => matchesType(p, filter) && hasDemo(p) && matchesCategories(p, categories)).length;
    const categoryCount = (c) => projects.filter(p => matchesType(p, filter) && (!demoOnly || hasDemo(p)) && CATEGORY_TAGS[c].some(tag => p.tags.includes(tag))).length;

    return (
        <>
            <div className={style.filterSection}>
                <p className={style.filterSectionLabel}>Filters</p>
                <div className={style.filters}>
                    <span className={style.filterLabel}>Type:</span>
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            onClick={() => handleFilter(f)}
                            disabled={demoOnly && countFor(f) === 0}
                            className={filter === f && !demoOnly ? style.active : ""}
                        >
                            {f} ({countFor(f)})
                        </button>
                    ))}
                </div>
                <div className={style.demoFilters}>
                    <span className={style.filterLabel}>Has Demo:</span>
                    <button
                        onClick={handleDemoFilter}
                        className={demoOnly ? `${style.active} ${style.demoButtonActive}` : style.demoButton}
                    >
                        Yes ({demoCount})
                    </button>
                </div>
                <div className={style.filters}>
                    <span className={style.filterLabel}>Category:</span>
                    {CATEGORIES.map(c => (
                        <button
                            key={c}
                            onClick={() => handleCategoryFilter(c)}
                            disabled={categoryCount(c) === 0 && !categories.includes(c)}
                            className={categories.includes(c) ? style.active : ""}
                        >
                            {c} ({categoryCount(c)})
                        </button>
                    ))}
                </div>
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
