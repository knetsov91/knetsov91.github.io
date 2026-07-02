import { useEffect, useState } from 'react';
import style from './Project.module.css';

import { fetchRepoData, generateRepoUrl } from '../../utils/util';

const Project = ({project}) => {
    const [createdAt, setCreatedAt] = useState('N/A')
    const [updatedAt, setUpdatedAt] = useState('N/A')
    const [showDemo, setShowDemo] = useState(false);
    const [activeGif, setActiveGif] = useState(0);
    const fetchUrl = generateRepoUrl(project.link);
    const demoGifs = project.demoGifs || [];

    useEffect(() => {
       fetchRepoData(fetchUrl)
       .then((data) => {
            setCreatedAt(new Date(data.created_at).toLocaleDateString());
            setUpdatedAt(new Date(data.updated_at).toLocaleDateString());
       })
       .catch(() => {
            setCreatedAt('N/A');
            setUpdatedAt('N/A');
       });
    }, []);
    return (
        <div className={style.project}>
            <div className={style.header}>
                <h2>{project.name}</h2>
                <div className={style.dates}>
                    <span>Created at: <b>{createdAt}</b></span>
                    <span>Last update: <b>{updatedAt}</b></span>
                </div>
            </div>
            <div className={style.tagsSection}>
                <span><b>Technologies:</b></span>
                <div className={style.tags}>
                    {project.tags.map((tag) => (
                        <span className={style.tag} key={tag}>{tag}</span>
                    ))}
                </div>
            </div>
            <p className={style.description}>{project.description || <span>There is no description yet</span>}</p>
            {project.related && (
                <p className={style.related}>
                    Part of: <a href={project.related.link} target="_blank">{project.related.name}</a>
                </p>
            )}
            <div className={style.links}>
                <a href={project.link} target="_blank">View on GitHub</a>
                {demoGifs.length > 0 && (
                    <button
                        type="button"
                        className={style.demoToggle}
                        onClick={() => { setShowDemo((prev) => !prev); setActiveGif(0); }}
                    >
                        {showDemo ? 'Hide demo' : 'Demo'}
                    </button>
                )}
            </div>
            {demoGifs.length > 0 && showDemo && (
                <div className={style.demoSection}>
                    <img src={demoGifs[activeGif]} alt={`${project.name} demo`} className={style.demoGif} />
                    {demoGifs.length > 1 && (
                        <div className={style.demoTabs}>
                            {demoGifs.map((gif, i) => (
                                <button
                                    type="button"
                                    key={gif}
                                    className={`${style.demoTab} ${i === activeGif ? style.demoTabActive : ''}`}
                                    onClick={() => setActiveGif(i)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Project;
