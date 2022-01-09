import * as moduleControl from "../module/cartControl.mjs";
let lePanier = JSON.parse(localStorage.getItem("panier")) ?? {};
let lesPrix = {};

/**lesPrix est un objet {id: prix€} redondant ?
 * pour eviter de recharger à chaque fois le prix !
 */

function preparePanier(listeProduit) {
  /*
  on renvoi au controleur un array de 2 array
  A  le premier : arrayCart
   * =[[le canapé,pu,qtetotal,prixtotal],
  [[idcolor1,textcolor1,qt1,prix lignecolor1]],[idcolor2,textcolor2,qt2,lignecolor2]]]
  c'est à dire :
 - array[0] :avec les caractéristiques de l'article et son prix total 
  - array[1] : array de x couleurs et avec pour chacune les caractéristiques de la ligne 

 B  le deuxieme : arrayTotal
 avec juste  qteTotal et prixTotal;

   */

  let arrayCart = [];
  let arrayTotal = [];
  let qteTotal = 0;
  let prixTotal = 0;
  let fauxArticle = []; //

  for (const [unId, lignes] of Object.entries(lePanier)) {
    let arrayProduit = ["fictif"];
    let arrayProd = [];

    const leProduit = getProdPanier(unId, listeProduit);
    //if (Object.keys(leProduit).length !== 0) {
    if (leProduit) {
      const lePrix = leProduit.price;

      lesPrix[leProduit._id] = lePrix; // réutilisé ds le module
      let QteModele = 0;

      for (const [idcolor, qte] of Object.entries(lignes)) {
        //pour chaque couleur:
        QteModele += qte;
        const textColor = leProduit.colors[idcolor];
        const arrayLigne = [idcolor, textColor, qte, formatPrix(qte * lePrix)];
        arrayProduit.push(arrayLigne);
      }
      //pour chaque article
      qteTotal += QteModele;
      prixTotal += QteModele * lePrix;
      arrayProd = [
        leProduit,
        formatPrix(leProduit.price),
        QteModele,
        formatPrix(QteModele * lePrix),
      ];
      arrayProduit[0] = arrayProd;
      arrayCart.push(arrayProduit);
    } else {
      /*id  est un faux on purge le panier à l'exterieur de la boucle */
      console.log("Attention  " + unId + " est un FAUX");
      fauxArticle.push(unId);
    }
  }
  prixTotal = formatPrix(prixTotal);
  arrayTotal = [qteTotal, prixTotal];
  if (fauxArticle.length != 0) {
    deleteBetise(fauxArticle);
  }

  /* console.log(arrayCart[0][0][1]);
console.log("color  " + arrayCart[0][1][1]);
  console.log(arrayCart[0][0][0].name); */

  return [arrayCart, arrayTotal];
}
function deleteBetise(fauxArticle) {
  for (let theId of fauxArticle) {
    delete lePanier[theId];
  }
  if (lePanier == 0) {
    lePanier = {};
  }
}

function getProdPanier(unId, lesProduits) {
  /**pour retouver les infos sur l'articles
   * on retourne l'item de l'API
   */
  console.log(lePanier[unId]);
  for (let j = 0; j < lesProduits.length; j++) {
    if (lesProduits[j]._id == unId) {
      return lesProduits[j];
    }
  }
  //return {};
}

function commander(leId, couleur, qte) {
  if (lePanier[leId]) {
    //modification
    if (lePanier[leId][couleur]) {
      /*on se retrouve dans le cas du cart /panier avec un return 
      de fonction inutile ici*/
      const quiSertPas = modifPanier(leId, couleur, qte);
    } else {
      // on ajoute une couleur
      lePanier[leId][couleur] = qte;
    }
  } else {
    // on ajoute le produit
    lePanier[leId] = {}; // couleur: qte };
    lePanier[leId][couleur] = qte;
  }
  actuStorage();
  if (lePanier[leId]) {
    /*on renvoi les lignes mofdifiées pour actu affichage */
    return lePanier[leId];
  } else {
    return {};
  }
}
function modifPanier(id, color, qteVerif) {
  if (qteVerif > 0) {
    /* on actualise la ligne du panier! */
    lePanier[id][color] = qteVerif;
  } else {
    /* on delete  la ligne ! */
    delete lePanier[id][color];
    /* on delete  l'article si besoin'! */
    if (Object.keys(lePanier[id]).length == 0 || color == -1) {
      /*le test  ou "color == -1" est ici pour intercepter:
        la touche "suppression de l'article....*/

      /* on delete le panier ou la commande si besoin ! */
      delete lePanier[id];
      if (lesPrix[id]) {
        delete lesPrix[id];
      }
      /**indice couleur négatif
       */
      color = -1;
    }
    if (lePanier == 0) {
      lePanier = {};
    }
  }
  return color;
}
/**déclenchée apres modif du panier
 * on return un array(cf. explication dans cartEdit.mjs)
 */
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
        moduleControl.modifArticle(unId, qtArticle, formatPrix(prixArticle));
        moduleControl.modifLigne(unId, idColor, newQty, formatPrix(prixLigne));
      }
      if (newQty == 0 && qtArticle != 0) {
        moduleControl.modifArticle(unId, qtArticle, prixArticle);
        moduleControl.razLigne(unId, idColor);
      }
    }
    qteP += qtArticle;
    prixP += prixArticle;
  }
  if (idColor == -1) {
    /*ici en effet id n'est plus présent dans le panier donc... */
    moduleControl.razArticle(id);
  }
  /*dans tous les cas de figure...on actualise le total */
  moduleControl.modifTotal(qteP, formatPrix(prixP));
}

function modifQty(id, color, qteVerif) {
  const color2 = modifPanier(id, color, qteVerif);
  /**
   * si on annule un article: on l'efface du panier, donc il faut
   * trouver une "astuce" pour aller l'éffacer de l'ecran :
   * c'est : color=-1
   */
  actuStorage();
  actuEcran(id, color2, qteVerif);
}
function actuStorage() {
  /*  console.log(lePanier);
 console.log(JSON.stringify(lePanier)); */
  localStorage.setItem("panier", JSON.stringify(lePanier));
}
function getQty(unId, color, sens) {
  return lePanier[unId][color] + sens;
}
function checkLine(leId, idColor) {
  let qty = 0;
  if (lePanier[leId]) {
    //modification
    if (lePanier[leId][idColor]) {
      qty = lePanier[leId][idColor];
    }
  }
  return qty;
}

export { lePanier, preparePanier, checkLine, commander, modifQty, getQty };
