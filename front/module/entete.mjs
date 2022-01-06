//import * as myParam from "../module/parametres.js";
/**Module  pour l'affichage des head et footer
 * et pour tenir compte des la structures des fichiers dans les
 * dossiers...
 */
const leFolder = "front";
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
  messageMail: "Vous_avez_besoin_d_un_crédit ?",
};

function ecrireHeaderFooter() {
  const chemin = window.location.origin + "/";
  //document.getElementById("bidon2").innerHTML = `<img src='${chemin}'>`;
  //let chemin = chemin + "/";
  let chemin2 = "./";
  let cheminIndex = "../";
  // window.location.pathname == "/front2/index.html" ? "./" : "../";
  const lUrl = window.location.pathname;
  if (lUrl == "/" + leFolder + "/" || lUrl == "/" + leFolder + "/index.html") {
    cheminIndex = "./";
    chemin2 = "./pages/";
  }
  document.getElementById("header").innerHTML = ecrireHeader(
    adresse,
    chemin,
    chemin2,
    cheminIndex
  );
  document.getElementById("footer").innerHTML = ecrireFooter(adresse, chemin);
}
function ecrireHeader(Coord, chemin, chemin2, cheminIndex) {
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
            
              <a href="${cheminIndex}index.html"><li>Accueil</li></a>
             
              <a href="${chemin2}cart.html"><li>Panier</li></a>
          </nav>
         
        </div>
      </div>
      <img class="banniere" src="${chemin}images/banniere.jpg" alt="Baniere" />
     `;
  return tt;
}
function ecrireFooter(Coord, chemin) {
  const tt = `

      <div class="limitedWidthBlockContainer footerMain">
        <div class="limitedWidthBlock">
          <div>
            <img
              class="logo"
              src="${chemin}images/logo.png"
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
export { ecrireHeaderFooter };
