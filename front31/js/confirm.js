/*
ici avoir une fonction initConfirm() est un peu exageré mais 
"par homogeneité"
Seui écart ce n'est pas exactement le meme innerHTML..selon la réponse!
bug avec le Numcde === undefined pas certain de l'intercepter !
*/

import * as moduleEntete from "../module/entete.mjs";

initConfirm();
function initConfirm() {
  moduleEntete.ecrireHeaderFooter();

  try {
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
  }
}
function erreurCommande() {
  document.getElementsByClassName("confirmation")[0].innerHTML =
    "Desolé <br>il y a une erreur";
}
