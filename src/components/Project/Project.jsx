import { useEffect, useState } from 'react';
import style from './Project.module.css';

import { fetchRepoData, generateRepoUrl } from '../../utils/util';

const Project = ({project}) => {
    const [createdAt, setCreatedAt] = useState(null) 
    const [updatedAt, setUpdatedAt] = useState(null) 
    const fetchUrl = generateRepoUrl(project.link);
 
    useEffect(() => {
       fetchRepoData(fetchUrl)
       .then((data) => { 
            setCreatedAt(new Date(data.created_at).toLocaleDateString());
            setUpdatedAt(new Date(data.updated_at).toLocaleDateString());
       });
    }, []);
    return (
        <div className={style.project}>
            <h2>{project.name}</h2>
            <span>Created at: <b>{createdAt}</b></span>
            <span>Last update: <b>{updatedAt}</b></span>
            <p>{project.description || <span>There is no description yet</span> }</p>
            <a href={project.link} target="_blank">Link</a>
            <span>Tags(<b>{project.tags.length}</b>):</span>
            <div className={style.tags}>
                {
                    project.tags.map(( tag) => {
                        return <span className={style.tag}
                         key={tag}>{tag}</span>;
                    })
                } 
            </div>
        </div>
    );
}

export default Project;