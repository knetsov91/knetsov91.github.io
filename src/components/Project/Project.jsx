import { useEffect, useState } from 'react';
import style from './Project.module.css';

import { fetchRepoData, generateRepoUrl } from '../../utils/util';

const Project = ({project}) => {
    const [createdAt, setCreatedAt] = useState('N/A')
    const [updatedAt, setUpdatedAt] = useState('N/A')
    const fetchUrl = generateRepoUrl(project.link);

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
            <a href={project.link} target="_blank">View on GitHub</a>
        </div>
    );
}

export default Project;
