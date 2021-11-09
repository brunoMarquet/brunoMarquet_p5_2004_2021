import * as myHeader from "../module/header.js";
import * as myFooter from "../module/footer.js";

import * as myParam from "../module/parametres.js";
import * as myModProduit from "../module/gestion.js";

let panier = JSON.parse(localStorage.getItem("panier")) ?? [];

let txt_dyn_1 = "";
const page = "index"; //Redondance avec  const laPage = "index";
//let inner_1 = document.getElementById("items");
//let jeu = 1; //
let url = "http://localhost:3000/api/products";

initIndex();

function initIndex() {
  fetch(url, { method: "GET" })
    .then((data) => {
      return data.json();
    })
    .then((products) => {
      //alert(products.length);
      affichage(products);
      // alert(myModProduit.built());
    })
    .catch(function (error) {
      myModProduit.editErreur(error);
    });

  console.log("chemin1=(in index)==" + chemin1);

  const chemin = window.location.pathname == "/front/index.html" ? "./" : "../";

  document.getElementById("header").innerHTML = myHeader.ecrireHeader(
    myParam.adresse,
    chemin
  );
  document.getElementById("footer").innerHTML = myFooter.ecrireFooter(
    myParam.adresse,
    chemin
  );
}

function affichage(products) {
  const fragment = myModProduit.afficher(products);
  document.getElementById("items").appendChild(fragment);
}

//alert(myModule.ecrireFooter(Coord));
//document.getElementById("header").innerHTML = ecrireHeader(Coord);
