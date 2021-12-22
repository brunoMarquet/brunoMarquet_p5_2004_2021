let lePanier;
let total = [0, 0];
let lesPrix = {};

//const innerLigne = document.getElementById("templateLigne");
lePanier = JSON.parse(localStorage.getItem("panier")) ?? {};

/* function initModule() {
  //
} */

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

function modifQty(id, color, qteVerif) {
  if (qteVerif > 100) {
    alert("Quantité  trop importante");
    return;
  }
  const color2 = modifPanier(id, color, qteVerif);
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

export { lePanier };
