import style from './About.module.css';

const education = [
    {
        institution: "Sofia University St. Kliment Ohridski, FMI",
        degree: "Master's degree, Information Systems"
    },
    {
        institution: "Sofia University St. Kliment Ohridski, FMI",
        degree: "Bachelor's degree, Computer Science"
    },
    {
        institution: "Software University (SoftUni)",
        degree: "Software Engineer with Java"
    }
];


const About = () => {
    return (
        <div className={style.about}>
            <section className={style.section}>
                <h2>About Me</h2>
                <p className={style.bio}>
                    Software engineer with a Master's degree in Information Systems and a Bachelor's in
                    Computer Science from Sofia University. Passionate about backend development,
                    cloud-native applications, DevOps practices, networking, security, and AI.
                </p>
            </section>

            <section className={style.section}>
                <h2>Education</h2>
                <div className={style.eduList}>
                    {education.map((e, i) => (
                        <div key={i} className={style.eduItem}>
                            <span className={style.institution}>{e.institution}</span>
                            <span className={style.degree}>{e.degree}</span>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default About;
