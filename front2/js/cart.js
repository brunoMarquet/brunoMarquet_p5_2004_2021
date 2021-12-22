import * as moduleEntete from "../module/entete.mjs";
import * as myParam from "../module/parametres.js";
import * as moduleEdit from "../module/cartEdit.mjs";
import * as moduleCart from "../module/panier.js";
import * as moduleForm from "../module/cartForm.mjs";

//let url1 = "http://localhost:3000/api/products/order";

//let objRegex = [];
//let unClient = myParam.unClient;

let preRemplir = 1; // a revoir

initCart();

function initCart() {
  moduleEntete.ecrireHeaderFooter();

  if (moduleCart.lePanier.length != 0) {
    const url = "http://localhost:3000/api/products";
    fetch(url, { method: "GET" })
      .then((data) => {
        console.log(data.ok + "," + data.status);
        return data.json();
      })
      .then((products) => {
        //const fragment = moduleCart.
        const fragment = moduleEdit.ecrirePanier(products, moduleCart.lePanier);
        document.getElementById("cart__items").appendChild(fragment);

        moduleCart.actuPrix(moduleEdit.lesPrix);
        //moduleEdit.lesPrix = {}; //pour etre clair!
      })

      .catch(function (error) {
        console.log("erreur : " + error);
        //moduleProduit.editErreur(error);
      });
  }

  let rep = moduleForm.ecrireFormulaire(preRemplir, myParam.unClient);
  document.getElementById("formulaire").innerHTML = rep;

  document.getElementById("order").addEventListener("click", function () {
    moduleForm.testOrder(moduleCart.lePanier);
  });

  document.getElementById("remplir").addEventListener("change", function () {
    modifLeFormulaire();
  });
}

function modifLeFormulaire() {
  preRemplir = document.getElementById("remplir").checked ? 1 : 0;
  let rep = moduleForm.ecrireFormulaire(preRemplir, myParam.unClient);
  document.getElementById("formulaire").innerHTML = rep;
}
