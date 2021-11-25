import * as moduleEdit from "../module/edition.mjs";
import * as moduleProduit from "../module/gestion.js";

let panier = JSON.parse(localStorage.getItem("panier")) ?? [];

let txt_dyn_1 = "";

const page = "index"; //Redondance avec  const laPage = "index";
//let inner_1 = document.getElementById("items");
//let jeu = 1; //
let url = "http://localhost:3000/api/products";

initIndex();

function initIndex() {
  //localStorage.clear();
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
}
