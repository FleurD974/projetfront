import { Octokit } from "https://esm.sh/octokit";

class Home {
  constructor(){
    this.descriptionHTML = document.querySelector('.js-home-description')
    this.profilUrlHTML = document.querySelector('.js-home-profil-url')
    this.avatarHTML = document.querySelector('.js-home-avatar')

    this.projectsTitle = document.querySelectorAll('.js-home-project-title')
    this.projectsDescription = document.querySelectorAll('.js-home-project-description')
    this.projectsTags = document.querySelectorAll('.js-home-project-tag-container')

    this.init()
  }

  init() {
    // Recup les info depuis lapi
    this.getUserInformations()
    this.getReposInformations()
  }
  
  getUserInformations() {
    // API façon 1 en utilisant fetch
    
    fetch("https://api.github.com/users/FleurD974")
    .then((response) => response.json())
    .then((data) => {
      this.updateInformation(data)
      })
      .catch((error) => {
        console.log("Erreur lor de l'appel API", error)
      })
  }
  
  async getReposInformations() {
    // Api façon 2 recup le contenu avec l'octokit JS + await => async
    const octokit = new Octokit()
    // URL cible : https://api.github.com/users/FleurD974/repos
    const response = await octokit
      .request("GET /users/FleurD974/repos")
      .catch((error) => {
        console.log("Erreur lors de l'appel API", error)
      })
      const recentsProjects = response.data.slice(-3)
      // Url pour récup les langages d'un projet:
      // https://api.github.com/repos/FleurD974/{nom-du-repo}/langages
      for (let i = 0; i < recentsProjects.length; i++) {
        const languagesUrl = recentsProjects[i].languages_url
        const cleanedUrl = languagesUrl.replace("https://api.github.com", "")
        const responseLanguages = await octokit
          .request(`GET ${cleanedUrl}`)
          .catch((error) => {
            console.log("Erreur lors de l'appel API", error)
          })
        const projectLanguages = responseLanguages.data
        recentsProjects[i].languages = projectLanguages
      }
    this.updateProjectsInfos(recentsProjects)
  }

  updateInformation(APIdata) {
    // Afficher la desc du profil
    this.descriptionHTML.textContent = APIdata.bio
    // Afficher l'url du profil
    this.profilUrlHTML.setAttribute("href", APIdata.html_url)
    // Afficher l'avatar
    this.avatarHTML.setAttribute("src", APIdata.avatar_url)
  }

  updateProjectsInfos(projects) {
    const maxIndex = projects.length - 1
    let htmlIndex = 0
    for (let i = maxIndex; i > maxIndex - 3; i--){
      const project = projects[i]
      this.projectsTitle[htmlIndex].textContent = project.name
      this.projectsDescription[htmlIndex].textContent = project.description
      this.createHTMLLanguageTag(this.projectsTags[i], project.languages)
      htmlIndex++
    }
  }

  createHTMLLanguageTag(div, languages) {
    // Création dynamique 
    // Besoin de où je crée les elements html?
    // quels elements ? : les languages
    const arrayLanguages = Object.keys(languages)
    for (let i = 0; i < arrayLanguages.length; i++) {
      const span = document.createElement('span')
      span.textContent = arrayLanguages[i]
      div.appendChild(span)
    }
  }


}

export { Home }