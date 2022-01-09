/**
 * varia nouvelle fonction "deleteligne" au lieu de 
 ...modifQty(unId, indicecolor, 0) qui ne pouvait pas pointer pas sur le controleur ! 
 
 */

import * as moduleEntete from "../module/entete.mjs";
import * as myParam from "../module/parametres.mjs";
import * as moduleEdit from "../module/cartEdit.mjs";
import * as moduleCart from "../module/cartPanier.mjs";
import * as moduleForm from "../module/cartForm.mjs";

function initCart() {
  moduleEntete.ecrireHeaderFooter();
  afficheCommandes();
  afficheLeFormulaire();

  document.getElementById("order").addEventListener("click", function () {
    moduleForm.testOrder(moduleCart.lePanier);
  });

  document.getElementById("remplir").addEventListener("change", function () {
    afficheLeFormulaire();
  });
}

function afficheCommandes() {
  if (moduleCart.lePanier.length != 0) {
    const url = "http://localhost:3000/api/products";
    fetch(url, { method: "GET" })
      .then((data) => {
        //console.log(data.ok + "," + data.status);
        return data.json();
      })
      .then((products) => {
        const tableCdes = moduleCart.preparePanier(products);
        const fragment = moduleEdit.ecrirePanier(tableCdes);

        document.getElementById("cart__items").appendChild(fragment);
      })

      .catch(function (error) {
        console.log("erreur : " + error);
      });
  }
}

function checkModifQty(unId, indicecolor, qte) {
  if (qte) {
    const qteVerif = nombreValide2(qte);

    if (qteVerif != -1 && qteVerif <= maxProduit) {
      moduleCart.modifQty(unId, indicecolor, qteVerif);
    } else {
      console.log(
        "Erreur:  " +
          qte +
          "  n'est pas un entier positif ou est >=" +
          maxProduit
      );
    }
  }
}

function ajouterUn(unId, color, sens) {
  //const newQte = parseInt(moduleCart.lePanier[unId][color] + sens);
  const newQte = parseInt(moduleCart.getQty(unId, color, sens));
  //a modif
  if (newQte <= maxProduit) {
    moduleCart.modifQty(unId, color, newQte);
  } else {
    //newQte est tjrs =100!
    console.log("Erreur:  " + newQte + "  est  >= " + maxProduit);
  }
}
/**pour clore le débat ou eviter de se tromper à froid toutes les fonction ci
 * dessous sont des "répétiteurs" "interfaces mvc "et "n'apportent rien" */
function deleteArticle(unId) {
  // a virer ? NON car mvc..
  moduleCart.modifQty(unId, -1, 0);
}
function deleteLigne(unId, uneColor) {
  moduleCart.modifQty(unId, uneColor, 0);
}

function razLigne(unId, color) {
  moduleEdit.razLigne(unId, color);
}
function razArticle(unId) {
  moduleEdit.razArticle(unId);
}

function modifArticle(unId, qtArticle, prixArticle) {
  moduleEdit.modifArticle(unId, qtArticle, prixArticle);
}
function modifLigne(unId, idColor, newQty, prixLigne) {
  moduleEdit.modifLigne(unId, idColor, newQty, prixLigne);
}
function modifTotal(qte, total) {
  moduleEdit.modifTotal(qte, total);
}

/*ici seulement pour poyuvoir preRemplir ou non le form donc ? */
function afficheLeFormulaire() {
  const preRemplir = document.getElementById("remplir").checked ? 1 : 0;
  const rep = moduleForm.ecrireFormulaire(preRemplir, myParam.unClient);
  document.getElementById("formulaire").innerHTML = rep;
}

export {
  initCart,
  deleteArticle,
  deleteLigne,
  ajouterUn,
  checkModifQty,
  modifLigne,
  modifArticle,
  razArticle,
  razLigne,
  modifTotal,
  afficheLeFormulaire,
};
