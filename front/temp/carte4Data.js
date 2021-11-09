const adresse = {
  nom: "kanap",
  tel: "01 23 45 67 89",
  mail: "support@name.com",
  ville: "Paris 19",
  adresse: "101 quai de la CharenteLIBRE",
  credit:
    "© Copyright 2021 - 2042 | Openclassrooms by Openclassrooms | All Rights Reserved | Powered by &lt;3",
  latitude: 48.82,
  longitude: 2.29,
  messageMail: "Vous_avez_besoin_d_un_crédit",
};

const unClient = {
  firstName: {
    type: "string",
    entete: "Votre prénom",
    pholder: "mettre son prénom SVP.. ",
    regle: "/[^1-9]/g;",
    exemple: "Jean - Michel",
  },
  lastName: {
    type: "string",
    entete: "Votre nom, merci",
    pholder: "il nous faut un nom .. ",
    regle: "/[^1-9]/g;",
    exemple: "Valjean",
  },
  address: {
    type: "string",
    entete: " Votre adresse",
    pholder: "merci de renseigner votre adresse.. ",
    regle: "/[^1-9]/g;",
    exemple: "14 rue des Martyrs",
  },
  city: {
    type: "integer",
    entete: "Votre code postal",
    pholder: "Ca alors ! vous avez un code postal ?",
    regle: "^[w-.]+@([w-]+.)+[w-]{2,4}$/",
    exemple: 75019,
  },
  email: {
    type: "email",
    entete: "Votre email ",
    pholder: "vous devez avoir un MAIL !",
    regle: "^[w-.]+@([w-]+.)+[w-]{2,4}$/",
    exemple: "jeanValjean222@free.fr",
  },
};
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