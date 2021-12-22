let lePanier;
let total = [0, 0];
let lesPrix = {};
import * as moduleEdit from "../module/cartEdit.mjs";

//const innerLigne = document.getElementById("templateLigne");
lePanier = JSON.parse(localStorage.getItem("panier")) ?? {};

/* function initModule() {
  //
} */
function actuPrix(importLesPrix) {
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
        moduleEdit.modifArticle(unId, qtArticle, prixArticle);
        moduleEdit.modifLigne(unId, idColor, newQty, prixLigne);
      }
      if (newQty == 0 && qtArticle != 0) {
        moduleEdit.modifArticle(unId, qtArticle, prixArticle);
        moduleEdit.razLigne(unId, idColor);
      }
    }
    qteP += qtArticle;
    prixP += prixArticle;
  }
  /**id nest plus présent dans le panier donc... */
  if (idColor == -1) {
    moduleEdit.razArticle(id);
  }
  total = [qteP, 100 * prixP.toFixed(2)];
  moduleEdit.modifTotal(qteP, prixP.toFixed(2));
}

function modifQty(id, color, qteVerif) {
  if (qteVerif > 100) {
    alert("Quantité  trop importante");
    return;
  }
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

function checkModifQty(unId, indicecolor, qte) {
  if (qte) {
    const qteVerif = nombreValide2(qte);
    if (qteVerif != -1) {
      modifQty(unId, indicecolor, qteVerif);
    } else {
      console.log("Erreur:  " + qte + "  n'est pas un entier positif ");
    }
  } else {
    // le nbre n existe pas..
    // alert("c'est tourte");
  }
}

function ajouterUn(id, color, sens) {
  modifQty(id, color, lePanier[id][color] + sens);
}
function deleteArticle(unId) {
  /* le color -1 est une astuce/rustine :
  Pour faire simple. On enleve l'article du panier...
  et pour neanmoins pouvoir l'effacer de l'écran, on doit y acceder encore en innerHTML via l'id !
  */
  modifQty(unId, -1, 0);
}

export {
  lePanier,
  actuPrix,
  deleteArticle,
  ajouterUn,
  modifQty,
  checkModifQty,
};
