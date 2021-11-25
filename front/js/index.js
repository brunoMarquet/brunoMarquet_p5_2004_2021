import * as moduleEdit from "../module/edition.mjs";

import * as moduleProduit from "../module/gestion_0.js";

//import(utilsPath) as moduleProduit;

let typePanier = localStorage.getItem("typePanier") ?? 0;
//let namePanier;
let namePanier = "panier_" + typePanier + ".js";
namePanier = "panier_1.js";

if (typePanier == 0) {
  //import * as moduleProduit from "../module/gestion_0.js";
  //namePanier = "panier_0";
  let panier = JSON.parse(localStorage.getItem(namePanier)) ?? [];
}

let panier = JSON.parse(localStorage.getItem("panier")) ?? [];
const chemin = window.location.pathname == "/front/index.html" ? "./" : "../";

const page = "index"; //Redondance avec  const laPage = "index";

let url = "http://localhost:3000/api/products";

initIndex();

function initIndex() {
  fetch(url, { method: "GET" })
    .then((data) => {
      return data.json();
    })
    .then((products) => {
      const fragment = moduleEdit.ecrireListe(products);
      document.getElementById("items").appendChild(fragment);
    })
    .catch(function (error) {
      moduleProduit.editErreur(error);
    });

  moduleEdit.ecrireHeaderFooter();

  document
    .getElementById("type_commande")
    .addEventListener("change", function () {
      console.log(this.value);
    });
  document
    .getElementById("type_panier")
    .addEventListener("change", function () {
      modifierTypePanier(this.value);
    });
}
function modifierTypePanier(typePanier) {
  if (typePanier == -1) return;
  //import * as moduleProduit from "../module/gestion"+ typePanier +"".js";
  if (typePanier == 0 || typePanier == 1) {
    console.log(typePanier);
  } else {
    //pas d'objet panier
    console.log("PanierNon");
  }
}
