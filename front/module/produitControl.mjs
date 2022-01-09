/*
separer les données statiques (le descriptif produit) et le panier 
j'ai perdu un temps fou à vouloir synthetiser les 2 !

*/
import * as moduleEntete from "../module/entete.mjs";
import * as moduleEdit from "../module/produitEdit.mjs";
import * as moduleCart1 from "../module/cartPanier.mjs";
let theId = 0;
//localStorage.clear();
//import * as moduleCart from "../module/produitCart.mjs";

function initProduit() {
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
  document.title = product.name;

  /*Ecriture du produit lambda*/
  const lesLignes = moduleCart1.lePanier[theId];
  //
  // debugger;
  const fragment = moduleEdit.ecrireTemplate(product);
  document.getElementById("theItem").appendChild(fragment);

  /*seulemenent ensuite on regarde ce qui est déjà commandé 
  recherche commandes
  */
  if (moduleCart1.lePanier[theId]) {
    moduleEdit.editLignesCde(moduleCart1.lePanier[theId]);
  }

  /* "instanciation" de script addEventListener
   */
  document
    .getElementById("color-select")
    .addEventListener("change", function () {
      changeColor(this.value);
    });

  /*  document
    .getElementById("itemQuantity")
    .addEventListener("change", function () {
      changeQty(this.value);
    }); */

  document.getElementById("addToCart").addEventListener("click", ajoutPanier);
}

function changeColor(indiceColor) {
  const qte = moduleCart1.checkLine(theId, indiceColor);
  moduleEdit.actuQty(qte);
}
//function changeQty(newQty) {}

/* actualiser si besoin le nbre en fonction de la couleur */
/* function AfficheColor(indiceColor) {
  console.log(indiceColor);
  moduleEdit.changeColor(indiceColor);
  return;
} */

function ajoutPanier() {
  const qte = document.getElementById("itemQuantity").value;
  const qteVerif = nombreValide1(qte);
  const couleur = document.getElementById("color-select").value;
  if (qteVerif != -1 && couleur != -1) {
    const lesLines = moduleCart1.commander(theId, couleur, qteVerif);
    if (Object.keys(lesLines).length != 0) {
      moduleEdit.editLignesCde(lesLines);
    } else {
      // console.log("panner vide");
      moduleEdit.razLignes();
    }
  } else {
    console.log("Erreur");
  }
}
export { initProduit };
