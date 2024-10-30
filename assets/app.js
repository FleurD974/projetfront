import { Octokit, App } from "https://esm.sh/octokit";

const octokit = new Octokit();
console.log(octokit);

// octokit.rest.repos => provient du sdk
// get => Méthode du sdk pour récupérer ici UN repo
// owner nom utilisateur de github
octokit.rest.repos
  .get({
    owner:"FleurD974",
    repo:"",
  })
  .then (({data}) => {console.log("Repo récup", data)});