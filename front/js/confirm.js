/*
ici avoir une fonction initConfirm() est un peu exageré mais 
"par homogeneité"...
------
Seul écart:  ce n'est pas exactement le meme innerHTML..selon la réponse!


avant on utilisait le localStorage donc par exemple la fonction
  erreurCommande() était alors appelée 2 fois;

  On verifie qu'il y a un contenu:apres avoir mis l'url dans un array..
  avec split("idCommande=")[1]

  et celui ci doit etre une suite d'hexa décimaux séparés par un "-"
  avec donc   const regle = /^[0-9a-fA-F -]*$/;

*/

import * as moduleEntete from "../module/entete.mjs";

initConfirm();
function initConfirm() {
  moduleEntete.ecrireHeaderFooter();
  const Numcde = document.URL.split("idCommande=")[1];

  if (Numcde) {
    const regle = /^[0-9a-fA-F-]*$/;
    const testHexa = estValide(Numcde, regle);
    if (testHexa) {
      // console.log(Numcde.toString());
      // console.log(regle.test(Numcde));

      document.getElementById("orderId").innerHTML = "<br/>" + Numcde;
    }
  } else {
    erreurCommande();
  }
}

function erreurCommande() {
  document.getElementsByClassName("confirmation")[0].innerHTML =
    "Desolé <br>il y a une erreur";
}

//auparavent
/* if (
    Numcde === undefined ||
    Numcde === null ||
    Numcde === void 0
  ) {
    erreurCommande();
  } else {
    document.getElementById("orderId").innerHTML = "<br/>" + Numcde;
  }
  alert(Numcde); */

//etc...
/*  try {
    const Numcde = localStorage.getItem("orderId");
    console.log("type" + typeof Numcde);
    const innerH = document.getElementById("orderId");
    if (Numcde === undefined || Numcde === null || Numcde === void 0) {
      erreurCommande();
    } else {
      localStorage.removeItem("orderId");
      document.getElementById("orderId").innerHTML = "<br/>" + Numcde;
    }
  } catch {
    erreurCommande();
  } */
