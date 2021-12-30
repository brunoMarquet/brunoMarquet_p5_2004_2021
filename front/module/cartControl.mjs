/**
 * varia nouvelle fonction "deleteligne" au lieu de 
 ...modifQty(unId, indicecolor, 0) qui ne pouvait pas pointer pas sur le controleur ! 
 
 */

import * as moduleEntete from "../module/entete.mjs";
import * as myParam from "../module/parametres.js";
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
        console.log(data.ok + "," + data.status);
        return data.json();
      })
      .then((products) => {
        const tableCdes = moduleCart.preparePanier(products);
        const fragment = moduleEdit.ecrirePanier(
          tableCdes,
          products,
          moduleCart.lePanier
        );

        console.log(tableCdes);

        /* const fragment = moduleEdit.ecrirePanier(
          moduleCart.preparePanier(products)
        ); */

        document.getElementById("cart__items").appendChild(fragment);

        /*const fragment = moduleEdit.ecrirePanier(
          moduleCart.preparePanier(products)
        );*/

        //const arrayPanier = moduleCart.preparePanier(products);
        //moduleEdit.ecrirePanier(moduleCart.preparePanier(products));

        //document.getElementById("cart__items").appendChild(fragment);

        //moduleCart.actuPrix(moduleEdit.lesPrix);
        //moduleEdit.lesPrix = {}; //pour etre clair!
      })

      .catch(function (error) {
        console.log("erreur : " + error);
        //moduleProduit.editErreur(error);
      });
  }
}

function checkModifQty(unId, indicecolor, qte) {
  if (qte) {
    const qteVerif = nombreValide2(qte);

    if (qteVerif != -1 && qteVerif < 100) {
      moduleCart.modifQty(unId, indicecolor, qteVerif);
    } else {
      console.log(
        "Erreur:  " + qte + "  n'est pas un entier positif ou est >=100"
      );
    }
  }
}

// ajout commentaire
function ajouterUn(unId, color, sens) {
  const newQte = parseInt(moduleCart.lePanier[unId][color] + sens);
  if (newQte < 100) {
    moduleCart.modifQty(unId, color, newQte);
  } else {
    //newQte est tjrs =100!
    console.log("Erreur:  " + newQte + "  est  >=100");
  }
}
function deleteArticle(unId) {
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

//bof
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
