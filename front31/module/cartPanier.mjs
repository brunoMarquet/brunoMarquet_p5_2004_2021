import * as moduleControl from "../module/cartControl.mjs";
let lePanier;
let arrayTotal = [];
let qteTotal = 0;
let prixTotal = 0;
let lesPrix = {};
import * as moduleEdit from "./cartEdit.mjs";

//const innerLigne = document.getElementById("templateLigne");
lePanier = JSON.parse(localStorage.getItem("panier")) ?? {};

function preparePanier(listeProduit) {
  //console.log("qteTotal");
  //alert("rrrrrrrrrrr");

  //itérable ici
  let arrayCart = [];
  let arrayQte = [];
  let arrayPrix = [];
  //let arraycolorQt
  debugger;
  for (const [unId, lignes] of Object.entries(lePanier)) {
    const leProduit = getProdPanier(unId, listeProduit);
    //console.log(leProduit.price);
    arrayCart.push(leProduit);
    const lePrix = formaterPrix(1, leProduit.price);
    //arrayPrix.push(lePrix);

    lesPrix[leProduit._id] = lePrix; // réutilisé ds le module
    let QteModele = 0;
    for (const [key, value] of Object.entries(lignes)) {
      QteModele += value;
    }
    arrayQte.push(QteModele);

    qteTotal += QteModele;
    prixTotal += QteModele * lePrix;
  }

  arrayTotal = [qteTotal, prixTotal];
  console.log(qteTotal);

  return [arrayCart, arrayQte, arrayTotal];
  //, arrayQte, arraycolor, arrayTotal];
}

function getProdPanier(unId, lesProduits) {
  for (let j = 0; j < lesProduits.length; j++) {
    if (lesProduits[j]._id == unId) {
      //console.log(j);
      return lesProduits[j];
    }
  }
  console.log(lesPrix);
  return {};
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

export { lePanier, preparePanier, modifQty };
