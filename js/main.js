import { get_organization_contributors } from "./controller/contributors.js";
import { get_organization_repos } from "./controller/repos.js";
import { getRepoIssues } from "./controller/issues.js";

const pathName=window.location.pathname;
// console.log(pathName);

if (pathName==="/issues.html") {
    getRepoIssues();
} else if (pathName==="/") {
    get_organization_repos();
    get_organization_contributors();
} 