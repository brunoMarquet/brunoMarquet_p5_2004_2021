import * as moduleControl from "../module/cartControl.mjs";

let qteTotal = 0;
let prixTotal = 0;
const innerLigne = document.getElementById("templateLigne");
const innertotal = [];
innertotal[0] = document.getElementById("totalQuantity");
innertotal[1] = document.getElementById("totalPrice");

function ecrirePanier(tableCdes, listeProduit, lePanier) {
  const arrayPanier = tableCdes[0];
  const arrayTotal = tableCdes[1];
  let fragmentSomme = new DocumentFragment();
  let fragmentArticle = new DocumentFragment();
  for (const theItem of arrayPanier) {
    //console.log(theItem[0][0].name);
    //const unProduct = theItem[0][0];
    const fragmentArticle = templateArticle(theItem);
    fragmentSomme.appendChild(fragmentArticle);
    //console.log(theItem[0][1]);
  }

  modifTotal(arrayTotal[0], arrayTotal[1]);

  return fragmentSomme;
}

function templateArticle(theItem) {
  const lignes = "";
  const leProduit = theItem[0][0];
  const l_Id = leProduit._id;
  const unPu = theItem[0][1];
  //console.log("id " + theItem[0][0].name);
  let fragmentArticle = new DocumentFragment();
  let template = document.getElementById("templateCde");
  const clone = document.importNode(template.content, true);
  const arti = clone.querySelector("article");
  arti.id = "article_" + l_Id;
  const retour = clone.querySelector("#revoirProduit");
  retour.textContent = "<= " + leProduit.name;
  retour.href = "./produit.html?id=" + l_Id;
  const nom = clone.querySelector("h2");
  nom.textContent = leProduit.name;

  const image = clone.querySelector("img");
  image.src = leProduit.imageUrl;
  image.alt = leProduit.altTxt;

  const prix = clone.querySelector("#pu");
  prix.textContent = unPu;

  const suprimer = clone.querySelector(".deleteItem");
  suprimer.addEventListener("click", function () {
    moduleControl.deleteArticle(l_Id);
  });

  const nombremodele = clone.querySelector("#qteArticles");
  nombremodele.textContent = theItem[0][2];
  nombremodele.id = "qte_" + l_Id;
  const prixArticle = clone.querySelector("#prixArticle");
  prixArticle.textContent = theItem[0][3];
  prixArticle.id = "prix_" + l_Id;
  prixArticle.value = unPu;

  const lesLignes = clone.querySelector("#lesCouleurs");

  const fragLignes = ecrireLesLignes(l_Id, theItem);

  lesLignes.appendChild(fragLignes);

  fragmentArticle.appendChild(clone);
  return fragmentArticle;
}

function ecrireLesLignes(unId, theItem) {
  //return;
  let fragmentSom = new DocumentFragment();
  for (let i = 1; i < theItem.length; i++) {
    fragmentSom.appendChild(ecrireUneLigne(unId, theItem[i]));
  }

  return fragmentSom;
}
function ecrireUneLigne(unId, arrayLigne) {
  const indiceColor = arrayLigne[0];
  const laColor = arrayLigne[1];
  const qty = arrayLigne[2];
  const prixLigne = arrayLigne[3];
  // debugger;
  let fragment1 = new DocumentFragment();
  const cloneLigne = document.importNode(innerLigne.content, true);
  const arti = cloneLigne.querySelector("article");
  arti.id = `ligne_${unId}_${indiceColor}`;

  const uneCouleur = cloneLigne.querySelector("#laCouleur");
  uneCouleur.textContent = laColor;
  const uneQte = cloneLigne.querySelector(".qteLigneCde");
  uneQte.textContent = qty;
  uneQte.id = `inQte_${unId}_${indiceColor}`;

  const supprimer = cloneLigne.querySelector(".supLigne");
  supprimer.addEventListener("click", function () {
    moduleControl.deleteLigne(unId, indiceColor, 0);
  });
  const btM = cloneLigne.querySelector("#btonMoins");
  btM.addEventListener("click", function () {
    moduleControl.ajouterUn(unId, indiceColor, -1);
  });
  const btP = cloneLigne.querySelector("#btonPlus");
  btP.addEventListener("click", function () {
    moduleControl.ajouterUn(unId, indiceColor, 1);
  });
  const leInput = cloneLigne.querySelector(".itemQuantity");
  leInput.value = qty;

  leInput.id = `inQty_${unId}_${indiceColor}`;
  // console.log(`${color} qtés : ${qty}`);
  leInput.addEventListener("change", function () {
    moduleControl.checkModifQty(unId, indiceColor, this.value);
  });
  const leprix2 = cloneLigne.querySelector(".monPrixColor");
  leprix2.textContent = prixLigne;
  leprix2.id = `lignePrix_${unId}_${indiceColor}`;

  fragment1.appendChild(cloneLigne);
  return fragment1;
}
function modifTotal(qte, total) {
  //debugger;
  innertotal[0].innerHTML = qte;
  innertotal[1].innerHTML = total;
}

/******************************
 * *fonctions innerHTML appellées par la fonction : actuEcran
depuis le module Controleur !
 * -pour modif le html
 */
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

export {
  ecrirePanier,
  razLigne,
  razArticle,
  modifArticle,
  modifLigne,
  modifTotal,
};
