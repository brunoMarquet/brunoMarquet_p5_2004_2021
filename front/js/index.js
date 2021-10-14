import * as myModule from "../module/editHtml.js";
import * as myModule2 from "../module/parametres.js";
import * as myModProduit from "../module/produit.js";

let panier = JSON.parse(localStorage.getItem("panier")) ?? [];
console.log("panier " + panier.length);
let txt_dyn_1 = "";
let inner_1 = document.getElementById("items");
//let jeu = 1; //
let url = "http://localhost:3000/api/teddies";

/* const Coord = {
  nom: "kanap",
  tel: "01 23 45 67 89",
  mail: "support@name.com",
  ville: "Paris 19",
  adresse: "10 quai de la Charente",
  credit:
    "© Copyright 2021 - 2042 | Openclassrooms by Openclassrooms | All Rights Reserved | Powered by &lt;3",
  latitude: 48.82,
  longitude: 2.29,
  messageMail: "Vous_avez_besoin_d_un_crédit",
}; */

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

  //coord = myModule2.coordonnes;
  // coord = myModule2.adresse;

  //aa = JSON.stringify(myModule2.titi());
  console.log(myModule2.titi);

  return;
  document.getElementById("header").innerHTML = myModule.ecrireHeader(coord);
  document.getElementById("footer").innerHTML = myModule.ecrireFooter(coord);
}

function affichage(products) {
  inner_1.innerHTML = myModProduit.afficher(products);
}

//alert(myModule.ecrireFooter(Coord));
//document.getElementById("header").innerHTML = ecrireHeader(Coord);
