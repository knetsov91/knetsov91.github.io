import style from './Project.module.css';

const Project = ({project}) => {
    return (
        <div className={style.project}>
            <h2>Social Network</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank">Link</a>
            <span>Tags({project.tags.length}):</span>
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