function ecrireHeader(Coord) {
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
                src="../images/icons/phone.svg"
                alt="logo de téléphone"
                class="informations__phone"
              /> ${Coord.tel}
            </li>
            <li onclick="window.location = '${mailKanap}'";>
              <img
                src="../images/icons/mail.svg"
                alt="logo d'une enveloppe"
                class="informations__mail"
              /> ${Coord.mail}
            </li>
            <li  onclick=" window.location.href ='${mapG}'">
              <img
                src="../images/icons/adress.svg"
                alt="logo d'un point de géolocalisation"
                class="informations__address"
              />lat: ${Coord.latitude}°, long :  ${Coord.longitude}°
            </li>
          </ul>
        </div>
      </div>
      </div> <div id="info_panier">panier</div>
      <div class="limitedWidthBlockContainer menu">
        <div class="limitedWidthBlock">
          <a href="./index.html">
            <img
              class="logo"
              src="../images/logo.png"
              alt="Logo de l'entreprise  ${Coord.nom}"
            />
          </a>
          <nav>
            <ul>
            <a href="param.html"><li>paramètres</li></a>
              <a href="./index.html"><li>Accueil</li></a>
              <a href="./cart.html"><li>Panier</li></a>
              <a href="../temp/cart2.html"><li>Panier2</li></a>
          </nav>
         
        </div>
      </div>
      <img class="banniere" src="../images/banniere.jpg" alt="Baniere" />
     `;
  return tt;
}

function ecrireFooter(Coord) {
  const tt = `

      <div class="limitedWidthBlockContainer footerMain">
        <div class="limitedWidthBlock">
          <div>
            <img
              class="logo"
              src="../images/logo.png"
              alt="Logo de l'entreprise${Coord.nom} "
            />
          </div>
          <div>
            <p>${Coord.adresse}<br />${Coord.ville}</p>
          </div>
          <div>
            <p>Téléphone : ${Coord.tel}</p>
          </div>
          <div>
          <p><a href="mailto:${Coord.mail}?subject=:${Coord.messageMail}">Email :${Coord.mail}</a></p>
          </div>
        </div>
      </div>
      <div class="limitedWidthBlockContainer footerSecondary">
        <div class="limitedWidthBlock">
        ${Coord.credit}
          </p>
        </div>
      </div>
    
`;
  return tt;
}

// Export a Module
export { ecrireFooter, ecrireHeader };

// Export as default Module.
// IMPORTANT!!: Allow at most one 'default'
export default { ecrireFooter, ecrireHeader };
