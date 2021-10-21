import * as myModule from "../module/editHtml.js";
import * as myModule2 from "../module/parametres.js";
import * as myModProduit from "../module/gestion.js";

let panier = JSON.parse(localStorage.getItem("panier")) ?? [];

let txt_dyn_1 = "";
let inner_1 = document.getElementById("items");
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

  document.getElementById("header").innerHTML = myModule.ecrireHeader(
    myModule2.adresse
  );
  document.getElementById("footer").innerHTML = myModule.ecrireFooter(
    myModule2.adresse
  );
}

function affichage(products) {
  inner_1.appendChild = myModProduit.afficher(products);
}

//alert(myModule.ecrireFooter(Coord));
//document.getElementById("header").innerHTML = ecrireHeader(Coord);
