/**
 - Chaque page html appelle un script qui reprend son "nom" et
  loge dans le dossier js. 
 
 - Chaque page html via le script appelle une fonction generique initIndex()
  etc..
 
 -le  module moduleEntete from "../module/entete.mjs"
 appelle la methode ecrireHeaderFooter(); : c'est un peut hors sujet..
 mais voila , elle est utilisé dans les 4 html. 
 (nb: il y a 2 variables : chemin et chemin2 pour le path selon la page)

 - ici pour l'index initIndex() :
 fetch de l'api Et en cas de succes : on appelle le  module
  moduleEdit from "../module/edition.mjs";
  et sa methode ecrireListe() , celle ci dans une boucle appelle une sous 
  méthode pour chaque produit.

  jeuPanier() est une fonction basique pour générer un petit jeu d'essai

 */
import * as moduleEntete from "../module/entete.mjs";
import * as moduleEdit from "../module/indexEdit.mjs";
//localStorage.clear;
//let panier = JSON.parse(localStorage.getItem("panier")) ?? [];

const url = "http://localhost:3000/api/products";

initIndex();

function initIndex() {
  fetch(url, { method: "GET" })
    .then((data) => {
      console.log(data.ok + "," + data.status);
      return data.json();
    })
    .then((products) => {
      const fragment = moduleEdit.ecrireListe(products);
      document.getElementById("items").appendChild(fragment);
    })
    .catch(function (error) {
      console.log("erreur : " + error);
    });
  moduleEntete.ecrireHeaderFooter();

  /* pas vocation à rester... */
  document.getElementById("jeuEssai").addEventListener("change", function () {
    jeuPanier();
  });
}

/**  *********************  */
function jeuPanier() {
  if (document.getElementById("jeuEssai").checked) {
    let jsonlePanier = {
      "055743915a544fde83cfdfc904935ee7": { 2: 4, 0: 2, 1: 5 },
      "77711f0e466b4ddf953f677d30b0efc9": { 0: 1, 1: 4 },
      a6ec5b49bd164d7fbe10f37b6363f9fb: { 3: 1, 0: 1, 1: 4, 2: 1 },
      a6ec5b49bd164d7fbe10f37b63f9fb: { 0: 20, 1: 10 },
      Bidon49bd164d7fbe10f37b63f9fb: { 0: 2, 1: 1 },
    };
    localStorage.setItem("panier", JSON.stringify(jsonlePanier));
  }
}
/**la 4eme ligne est un FAUX */
