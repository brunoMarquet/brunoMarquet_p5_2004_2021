/*let Parametres = {
  nom: "kanap",
  tel: "01 23 45 67 89",
  mail: "support@name.com",
  ville: "Paris 19",
  adresse: "10 quai de la Charente",
  credit:
    "© Copyright 2021 - 2042 | Openclassrooms by Openclassrooms | All Rights Reserved | Powered by &lt;3",
  info_address: "48.72,2.19",
  mess_mail: "Vous_avez_besoin_d_un_crédit",
};
*/

function ecrire_footer() {
  tt = `

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
          <p><a href="mailto:${Coord.mail}?subject=:${Coord.mess_mail}">Email :${Coord.mail}</a></p>
          </div>
        </div>
      </div>
      <div class="limitedWidthBlockContainer footerSecondary">
        <div class="limitedWidthBlock">
        ${Coord.credit}
          </p>
        </div>
      </div>
      
    test <a href="mailto:${Coord.mail}?subject=:${Coord.mail}">Email :${Coord.mail}</a>
    
`;
  return tt;
}
function ecrire_header() {
  tt = `
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
            <li>
              <img
                src="../images/icons/mail.svg"
                alt="logo d'une enveloppe"
                class="informations__mail"
              /> ${Coord.mail}
            </li>
            <li><a href="https://www.google.fr/maps/dir// ${Coord.latitude},${Coord.longitude}">
              <img
                src="../images/icons/adress.svg"
                alt="logo d'un point de géolocalisation"
                class="informations__address"
              />lat: ${Coord.latitude}°, long :  ${Coord.longitude}°
            </a> </li>
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

function ecrire_head() {
  tt = `
 
  <title>Cart</title>

  <meta charset="utf-8" />
  <meta name="description" content="Plateforme incroyable de e-commerce" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />
  <link href="../css/style.css" rel="stylesheet" />
  <link href="../css/cart.css" rel="stylesheet" />

  <meta name="viewport" content="width=device-width, initial-scale=1" />
  `;
  return tt;
}
