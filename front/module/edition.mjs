import * as myParam from "../module/parametres.js";
let templateRestaurant = document.getElementById("produitTemplate");

function ecrireFormulaire(preRemplir) {
  let text = "";
  let arrayKey = [];
  const unClient = myParam.unClient;

  for (let key in unClient) {
    if (unClient.hasOwnProperty(key)) {
      let valeur = unClient[key];
      // console.log("mon t " + key);
      arrayKey.push(key);
      let lexemple = preRemplir == 1 ? "value='" + valeur.exemple + "'" : "";
      text += `<div class="cart__order__form__question">
        <label for="${key}">${valeur.entete}: </label>
       <input type="${valeur.type}" id="${key}" name="${key}" placeholder="${valeur.pholder}" ${lexemple} >
        <p id="${key}ErrorMsg">${valeur.pholder}</p> `;
    }
  }
  return [text, arrayKey];
}

function ecrireListe(listeProduit) {
  let fragmentSom = new DocumentFragment();
  for (let element of listeProduit) {
    fragmentSom.appendChild(ecrireUnProduit(element));
  }
  return fragmentSom;
}

function ecrireUnProduit(element) {
  let fragment1 = new DocumentFragment();
  const clone = document.importNode(templateRestaurant.content, true);
  const lien = clone.querySelector("a");
  const nom = clone.querySelector("h3");
  const image = clone.querySelector("img");
  const descript = clone.querySelector("p");
  image.src = element.imageUrl;
  image.alt = element.altTxt;
  lien.href = "pages/produit.html?id=" + element._id;
  nom.textContent = element.name;
  descript.textContent = element.description;
  fragment1.appendChild(clone);
  return fragment1;
}

//************************
//*/

function ecrireTemplate(leProduit) {
  let fragment1 = new DocumentFragment();
  let template = document.getElementById("templateArticle");
  const clone = document.importNode(template.content, true);
  //const lien = clone.querySelector('#addToCart');
  const image = clone.querySelector("img");
  const titre = clone.querySelector("h1");
  const prix = clone.querySelector("#price");
  const descript = clone.querySelector("#description");
  let select = clone.querySelector("select");
  for (let i = 0; i < leProduit.colors.length; i++) {
    let choix = document.createElement("option");
    choix.textContent = leProduit.colors[i];
    choix.value = i;
    select.appendChild(choix);
  }

  image.src = leProduit.imageUrl;
  image.alt = leProduit.altTxt;

  titre.textContent = leProduit.name;
  /* titre.addEventListener("click", function () {
    alert("titi" + leProduit.price + " €");
  }); */

  prix.textContent = leProduit.price / 100;
  descript.textContent = leProduit.description;

  fragment1.appendChild(clone);

  return fragment1;
}
function ecrireHeaderFooter() {
  const chemin = window.location.pathname == "/front/index.html" ? "./" : "../";
  document.getElementById("header").innerHTML = ecrireHeader(
    myParam.adresse,
    chemin
  );
  document.getElementById("footer").innerHTML = ecrireFooter(
    myParam.adresse,
    chemin
  );
}
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
export { ecrireHeaderFooter, ecrireFormulaire, ecrireListe, ecrireTemplate };
