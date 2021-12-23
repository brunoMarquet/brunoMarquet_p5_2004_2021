/*
separer les données statiques (le descriptif produit) et le panier 
perdu un temps fou à vouloir synthetiser les 2 !

*/
import * as moduleEntete from "../module/entete.mjs";
import * as moduleCart from "../module/gestion.js";
import * as moduleEdit from "../module/productEdit.js";
let theId = 0;
//localStorage.clear();

initLeProduit();

function initLeProduit() {
  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("id");
  const url = "http://localhost:3000/api/products/" + product_id;

  fetch(url, { method: "GET" })
    .then((data) => {
      return data.json();
    })
    .then((product) => {
      afficheProd(product);
    })
    .catch(function (error) {
      console.log(error);
      //  edit_erreur(error);
    });

  moduleEntete.ecrireHeaderFooter();
}

function afficheProd(product) {
  //unProduct = new moduleCart.leProd(product._id, product.colors, product.price);
  theId = product._id;

  // moduleCart.initProd(product);
  document.title = product.name;

  /*Ecriture du produit lambda
seulemenent ensuite on regarde ce qui est déjà commandé */

  const fragment = moduleEdit.ecrireTemplate(product);

  //console.log(moduleCart.lePanier[product._id]);

  document.getElementById("theItem").appendChild(fragment);
  if (moduleCart.lePanier[theId]) {
    //recherche commandes
    //console.log(moduleCart.lePanier[product._id]);
    moduleEdit.editLignesCde(moduleCart.lePanier[theId]);
  }

  //"instanciation" de script

  document
    .getElementById("color-select")
    .addEventListener("change", function () {
      changeColor(this.value);
    });
  document
    .getElementById("itemQuantity")
    .addEventListener("change", function () {
      changeQty(this.value);
    });

  document.getElementById("addToCart").addEventListener("click", ajoutPanier);
}

function changeQty(qte) {
  // console.log(leProduit);
  return;
}

function checkLine(indiceColor) {
  return;
}

/* actualiser si besoin le nbre en fonction de la couleur */
function changeColor(indiceColor) {
  return;
}

function ajoutPanier() {
  const qte1 = document.getElementById("itemQuantity").value;
  const qteVerif = nombreValide(qte1);
  const couleur = document.getElementById("color-select").value;
  if (qteVerif != -1 && couleur != -1) {
    const lesLines = moduleCart.commander(theId, qteVerif, couleur);
    if (Object.keys(lesLines).length != 0) {
      moduleEdit.editLignesCde(lesLines);
    }
  } else {
    console.log("Erreur");
  }
}
