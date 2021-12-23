import * as moduleControl from "../module/cartControl.mjs";
let lePanier;
let total = [0, 0];
let lesPrix = {};
import * as moduleEdit from "./cartEdit.mjs";

//const innerLigne = document.getElementById("templateLigne");
lePanier = JSON.parse(localStorage.getItem("panier")) ?? {};

/* function initModule() {
  //
} */
function actuPrix(importLesPrix) {
  // lesPrix[leProduit._id] = formaterPrix(leProduit.price, 1);
  lesPrix = importLesPrix;
  console.log(lesPrix);
}

function modifPanier(id, color, qteVerif) {
  if (qteVerif > 0) {
    lePanier[id][color] = qteVerif;
  } else {
    /* on delete  la ligne ! */
    delete lePanier[id][color];
    /* on delete  l'article si besoin'! */
    if (Object.keys(lePanier[id]).length == 0 || color == -1) {
      delete lePanier[id];
      delete lesPrix[id];
      color = -1;
    }
    if (lePanier == 0) {
      console.log("panier vide");
      lePanier = {};
    }
  }
  return color;
}
/**déclenchée apres modif du panier*/
function actuEcran(id, idColor, newQty) {
  let qteP = 0;
  let prixP = 0;
  for (const [unId, lignes] of Object.entries(lePanier)) {
    const pu = lesPrix[unId];
    let qtArticle = 0;

    for (const [color, qte] of Object.entries(lignes)) {
      qtArticle += qte;
    }
    const prixArticle = qtArticle * pu;
    const prixLigne = newQty * pu;

    if (id == unId) {
      if (newQty > 0) {
        moduleControl.modifArticle(unId, qtArticle, prixArticle);
        moduleControl.modifLigne(unId, idColor, newQty, prixLigne);
      }
      if (newQty == 0 && qtArticle != 0) {
        moduleControl.modifArticle(unId, qtArticle, prixArticle);
        moduleControl.razLigne(unId, idColor);
      }
    }
    qteP += qtArticle;
    prixP += prixArticle;
  }
  /**id nest plus présent dans le panier donc... */
  if (idColor == -1) {
    moduleControl.razArticle(id);
  }
  total = [qteP, 100 * prixP.toFixed(2)];
  moduleControl.modifTotal(qteP, prixP.toFixed(2));
}

function modifQty(id, color, qteVerif) {
  const color2 = modifPanier(id, color, qteVerif);
  //ordre a inverser ??
  actuEcran(id, color2, qteVerif);
  actuStorage();
}
function actuStorage() {
  /*  console.log(lePanier);
  console.log("---------lePanier");
  console.log(JSON.stringify(lePanier)); */

  localStorage.setItem("panier", JSON.stringify(lePanier));
}

export { lePanier, actuPrix, modifQty };
