const gitApiUrl = 'https://api.github.com/repos/knetsov91/';

export const generateRepoUrl = (projectUrl) => {
    const projectUrlLength = projectUrl.length;
    const lastSlashIndex = projectUrl.lastIndexOf('/');
    const projectRepoName = projectUrl.slice(lastSlashIndex + 1, projectUrlLength);
    return gitApiUrl + projectRepoName;
}
