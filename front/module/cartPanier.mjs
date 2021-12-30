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
  /*
   * [[le canapé,pu,qtetotal,prixtotal],[idcolor,textcolor,qt,prix lignecolor]],[idcolor2,textcolor2,qt2,lignecolor2]]
   */

  let arrayCart = [];

  for (const [unId, lignes] of Object.entries(lePanier)) {
    let arrayProduit = ["fictif"];
    let arrayProd = [];

    const leProduit = getProdPanier(unId, listeProduit);
    const lePrix = formaterPrix(1, leProduit.price);

    lesPrix[leProduit._id] = lePrix; // réutilisé ds le module
    let QteModele = 0;
    for (const [idcolor, qte] of Object.entries(lignes)) {
      //pour chaque couleur:
      QteModele += qte;
      const textColor = leProduit.colors[idcolor];
      const arrayLigne = [
        idcolor,
        textColor,
        qte,
        formaterPrix(100 * qte, lePrix),
      ];
      arrayProduit.push(arrayLigne);
    }
    //pour chaque article
    qteTotal += QteModele;
    const prixAdd = formaterPrix(100 * QteModele, lePrix);
    prixTotal += QteModele * lePrix;

    arrayProd = [leProduit, lePrix, QteModele, prixAdd];
    arrayProduit[0] = arrayProd;
    arrayCart.push(arrayProduit);
  }
  prixTotal = formaterPrix(100, prixTotal);
  arrayTotal = [qteTotal, prixTotal];

  //debuggerPanier(arrayTotal);
  // console.log("_____from panier_______");
  // console.log(arrayTotal);
  // console.log(arrayCart);
  // console.log(arrayCart[0][0][1]);

  // console.log("color  " + arrayCart[0][1][1]);
  // console.log(arrayCart[0][0][0].name);
  // console.log("_____end from panier_______");

  return [arrayCart, arrayTotal];
}

function getProdPanier(unId, lesProduits) {
  for (let j = 0; j < lesProduits.length; j++) {
    if (lesProduits[j]._id == unId) {
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
