/**module d'écriture html
 * c'est du templating pour l'edition initiale
 * (2 templates et 3 fonctions mises en oeuvres)
 * et du innerhtml
 * -pour le "total"
 *
 * -et l'actualisation du panier avec 4 mini fonctions tres ciblées ou précises.
 *
 *
 */

import * as moduleControl from "../module/cartControl.mjs";

const innerLigne = document.getElementById("templateLigne");
const innertotal = [];
innertotal[0] = document.getElementById("totalQuantity");
innertotal[1] = document.getElementById("totalPrice");

function ecrirePanier(tableCdes) {
  const arrayPanier = tableCdes[0];
  const arrayTotal = tableCdes[1];
  let fragmentSomme = new DocumentFragment();

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
  const leProduit = theItem[0][0];
  const l_Id = leProduit._id;
  const unPu = theItem[0][1];

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

  /* pour lancer l'écriture des lignes de couleur */
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
    /**pour chaque couleur... */
    fragmentSom.appendChild(ecrireUneLigne(unId, theItem[i]));
  }

  return fragmentSom;
}
function ecrireUneLigne(unId, arrayLigne) {
  const indiceColor = arrayLigne[0];
  const laColor = arrayLigne[1];
  const qty = arrayLigne[2];
  const prixLigne = arrayLigne[3];

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

  leInput.addEventListener("change", function () {
    moduleControl.checkModifQty(unId, indiceColor, this.value);
  });
  const leprix2 = cloneLigne.querySelector(".monPrixColor");
  leprix2.textContent = prixLigne;
  leprix2.id = `lignePrix_${unId}_${indiceColor}`;

  fragment1.appendChild(cloneLigne);
  return fragment1;
}

/*écriture total de la commande*/
function modifTotal(qte, total) {
  innertotal[0].innerHTML = qte;
  innertotal[1].innerHTML = total;
}

/******************************
 * *fonctions innerHTML appellées par la fonction : actuEcran
depuis le module Controleur -pour modifier le html !
lorsque l'on modifie un article: 2 fonctions utilisées  
 - modifArticle(id, qtArticle, prixArticle) 
 - modifLigne(id, idColor, newQty, prixLigne) 
 mais il n'est pas judicieux de les réunir car bcq de parmetres

 * 
 */
function razLigne(unId, color) {
  document.getElementById(`ligne_${unId}_${color}`).innerHTML = "";
}
function razArticle(id) {
  const htmlArticle = document.getElementById("article_" + id);
  htmlArticle.innerHTML = "";
  /**Car petit bug visuel causé par la class */
  htmlArticle.classList = [];
  /**ou moins violent:
   *  htmlArticle.classList.remove("cart__item");
   */
}

function modifArticle(id, qtArticle, prixArticle) {
  document.getElementById("qte_" + id).innerHTML = qtArticle;
  document.getElementById("prix_" + id).innerHTML = prixArticle;
}
function modifLigne(id, idColor, newQty, prixLigne) {
  document.getElementById("inQte_" + id + "_" + idColor).innerHTML = newQty;
  document.getElementById("inQty_" + id + "_" + idColor).value = newQty;
  document.getElementById("lignePrix_" + id + "_" + idColor).innerHTML =
    prixLigne;
}

export {
  ecrirePanier,
  modifTotal,
  razLigne,
  razArticle,
  modifArticle,
  modifLigne,
};
