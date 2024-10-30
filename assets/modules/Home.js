class Home {
  constructor(){
    this.descriptionHTML = document.querySelector('.js-home-description')
    this.profilUrlHTML = document.querySelector('.js-home-profil-url')
    this.avatarHTML = document.querySelector('.js-home-avatar')

    this.init()
  }

  init() {
    // Recup les info depuis lapi
    this.getUserInformations()
  }
  
  getUserInformations() {
    // en utilisant fetch
    
    fetch("https://api.github.com/users/FleurD974")
    .then((response) => response.json())
    .then((data) => {
      this.updateInformation(data)
      })
      .catch((error) => {
        console.log("Erreur lor de l'appel API", error)
      })
  }

  updateInformation(APIdata) {
    // Afficher la desc du profil
    this.descriptionHTML.textContent = APIdata.bio
    // Afficher l'url du profil
    this.profilUrlHTML.setAttribute("href", APIdata.html_url)
    // Afficher l'avatar
    this.avatarHTML.setAttribute("src", APIdata.avatar_url)
  }
}

export { Home }