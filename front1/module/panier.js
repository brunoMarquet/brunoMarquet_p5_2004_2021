let lePanier;
let total = [0, 0];
let lesPrix = {};
const innerLigne = document.getElementById("templateLigne");

function initModule() {
  lePanier = JSON.parse(localStorage.getItem("panier")) ?? {};
}
function ecrirePanier(listeProduit) {
  let fragmentSomme = new DocumentFragment();
  let fragmentArticle = new DocumentFragment();

  for (const [unId, ligne] of Object.entries(lePanier)) {
    //console.log(`${unId}`);

    const unProduct = getProdPanier(unId, listeProduit);
    const fragmentArticle = templateArticle(unProduct, ligne);

    fragmentSomme.appendChild(fragmentArticle);
  }
  writeTotal();
  return fragmentSomme;
}
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
        modifArticle(unId, qtArticle, prixArticle);
        modifLigne(unId, idColor, newQty, prixLigne);
      }
      if (newQty == 0 && qtArticle != 0) {
        modifArticle(unId, qtArticle, prixArticle);
        razLigne(unId, idColor);
      }
    }
    qteP += qtArticle;
    prixP += prixArticle;
  }
  /**id nest plus present dans le panier donc... */
  if (idColor == -1) {
    razArticle(id);
  }
  total = [qteP, 100 * prixP.toFixed(2)];
  writeTotal();
}

function razLigne(unId, color) {
  document.getElementById(`ligne_${unId}_${color}`).innerHTML = "";
}
function razArticle(id) {
  document.getElementById("article_" + id).innerHTML = "";
}

function modifArticle(id, qtArticle, prixArticle) {
  document.getElementById("qte_" + id).innerHTML = qtArticle;
  document.getElementById("prix_" + id).innerHTML = prixArticle.toFixed(2);
}
function modifLigne(id, idColor, newQty, prixLigne) {
  document.getElementById("inQte_" + id + "_" + idColor).innerHTML = newQty;
  document.getElementById("inQty_" + id + "_" + idColor).value = newQty;
  document.getElementById("lignePrix_" + id + "_" + idColor).innerHTML =
    prixLigne.toFixed(2);
}

function getProdPanier(unId, lesProduits) {
  for (let j = 0; j < lesProduits.length; j++) {
    if (lesProduits[j]._id == unId) {
      return lesProduits[j];
    }
  }
  return {};
}

function templateArticle(leProduit, lignes) {
  let fragmentArticle = new DocumentFragment();
  let template = document.getElementById("templateCde");
  const clone = document.importNode(template.content, true);
  const arti = clone.querySelector("article");
  arti.id = "article_" + leProduit._id;
  const retour = clone.querySelector("#revoirProduit");
  retour.textContent = "<= " + leProduit.name;
  retour.href = "./produit.html?id=" + leProduit._id;
  const nom = clone.querySelector("h2");
  nom.textContent = leProduit.name;

  const image = clone.querySelector("img");
  image.src = leProduit.imageUrl;
  image.alt = leProduit.altTxt;

  const prix = clone.querySelector("#pu");
  prix.textContent = formaterPrix(leProduit.price, 1);

  const suprimer = clone.querySelector(".deleteItem");
  suprimer.addEventListener("click", function () {
    deleteArticle(leProduit._id);
  });
  let QteModele = 0;
  for (const [key, value] of Object.entries(lignes)) {
    QteModele += value;
  }
  const nombremodele = clone.querySelector("#qteArticles");
  nombremodele.textContent = QteModele;
  nombremodele.id = "qte_" + leProduit._id;
  const prixArticle = clone.querySelector("#prixArticle");
  prixArticle.textContent = formaterPrix(leProduit.price, QteModele);
  prixArticle.id = "prix_" + leProduit._id;
  prixArticle.value = leProduit.price;

  lesPrix[leProduit._id] = formaterPrix(leProduit.price, 1);
  total[0] += 1 * QteModele;
  total[1] += leProduit.price * QteModele;

  const lesLignes = clone.querySelector("#lesCouleurs");
  const fragLignes = ecrireLesLignes(leProduit, lignes);
  lesLignes.appendChild(fragLignes);

  fragmentArticle.appendChild(clone);
  return fragmentArticle;
}

function ecrireLesLignes(leProduit, lignes) {
  let fragmentSom = new DocumentFragment();
  for (const [color, qty] of Object.entries(lignes)) {
    fragmentSom.appendChild(
      ecrireUneLigne(
        leProduit._id,
        leProduit.price,
        color,
        leProduit.colors[color],
        qty
      )
    );
  }

  return fragmentSom;
}
function ecrireUneLigne(unId, pu, indicecolor, color, qty) {
  let fragment1 = new DocumentFragment();
  const cloneLigne = document.importNode(innerLigne.content, true);
  const arti = cloneLigne.querySelector("article");
  arti.id = `ligne_${unId}_${indicecolor}`;

  const uneCouleur = cloneLigne.querySelector("#laCouleur");
  uneCouleur.textContent = color;
  const uneQte = cloneLigne.querySelector(".qteLigneCde");
  uneQte.textContent = qty;
  uneQte.id = `inQte_${unId}_${indicecolor}`;

  const supprimer = cloneLigne.querySelector(".supLigne");
  supprimer.addEventListener("click", function () {
    modifQty(unId, indicecolor, 0);
  });
  const btM = cloneLigne.querySelector("#btonMoins");
  btM.addEventListener("click", function () {
    ajouterUn(unId, indicecolor, -1);
  });
  const btP = cloneLigne.querySelector("#btonPlus");
  btP.addEventListener("click", function () {
    ajouterUn(unId, indicecolor, 1);
  });
  const leInput = cloneLigne.querySelector(".itemQuantity");
  leInput.value = qty;

  leInput.id = `inQty_${unId}_${indicecolor}`;
  // console.log(`${color} qtés : ${qty}`);
  leInput.addEventListener("change", function () {
    checkModifQty(unId, indicecolor, this.value);
  });
  const leprix2 = cloneLigne.querySelector(".monPrixColor");
  leprix2.textContent = formaterPrix(pu, qty);
  leprix2.id = `lignePrix_${unId}_${indicecolor}`;

  fragment1.appendChild(cloneLigne);
  return fragment1;
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

const innertotal = [];
innertotal[0] = document.getElementById("totalQuantity");
innertotal[1] = document.getElementById("totalPrice");

function writeTotal() {
  //qte, prix
  innertotal[0].innerHTML = total[0];
  innertotal[1].innerHTML = formaterPrix(1, total[1]);
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

export { ecrirePanier, initModule, lePanier };
