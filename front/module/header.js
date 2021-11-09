function ecrireHeader(Coord, chemin) {
  const mapG = `https://www.google.fr/maps/dir//${Coord.latitude},${Coord.longitude}`;
  const mailKanap = `mailto:${Coord.mail}?subject=:${Coord.messageMail}`;
  //"./cart.html";
  //<li  onclick=" window.location.href ='./cart.html'">
  //`https://www.google.fr/maps/dir//${Coord.latitude},${Coord.longitude}`;
  const tt = `
      <div class="limitedWidthBlockContainer informations">
        <div class="limitedWidthBlock">
          <ul>
            <li>
              <img
                src="${chemin}images/icons/phone.svg"
                alt="logo de téléphone"
                class="informations__phone"
              /> ${Coord.tel}
            </li>
            <li onclick="window.location = '${mailKanap}'";>
              <img
                src="${chemin}images/icons/mail.svg"
                alt="logo d'une enveloppe"
                class="informations__mail"
              /> ${Coord.mail}
            </li>
            <li  onclick=" window.location.href ='${mapG}'">
              <img
                src="${chemin}images/icons/adress.svg"
                alt="logo d'un point de géolocalisation"
                class="informations__address"
              />lat: ${Coord.latitude}°, long :  ${Coord.longitude}°
            </li>
          </ul>
        </div>
      </div>
       </div> 
      <div class="limitedWidthBlockContainer menu">
        <div class="limitedWidthBlock">
          <a href="./index.html">
            <img
              class="logo"
              src="${chemin}images/logo.png"
              alt="Logo de l'entreprise  ${Coord.nom}"
            />
          </a>
          <nav>
            <ul>
            <a href="./param.html"><li>paramètres</li></a>
              <a href="${chemin}index.html"><li>Accueil</li></a>
              <a href="./cart.html"><li>PanierNOOO</li></a>
              <a href="./cart.html"><li>Panier1</li></a>
          </nav>
         
        </div>
      </div>
      <img class="banniere" src="${chemin}images/banniere.jpg" alt="Baniere" />
     `;
  return tt;
}

// Export a Module
export { ecrireHeader };
