function ligneCommande(id, qte, color, temps) {
  this._id = id;
  this.qty = qte;
  this.color = color;
  this.temps = temps;
  console.log(
    "ref: " + this._id + "," + this.temps + "," + this.color + ", " + this.qty
  );
}
function afficheLigne(unProduit) {
  console.log("afficheLigne");

  return "";
}

//catalogue
function templateArticle(leProduit, indexPanier) {
  let fragmentArticle = new DocumentFragment();
  let template = document.getElementById("templateCde");
  const clone = document.importNode(template.content, true);
  const arti = clone.querySelector("article");
  arti.id = "article_" + indexPanier;
  const retour = clone.querySelector("#revoirProduit");
  retour.textContent = "<= " + leProduit.name;
  retour.href = "./produit.html?id=" + leProduit._id;
  const nom = clone.querySelector("h2");
  nom.textContent = leProduit.name;
  nom.id = leProduit._id;

  const prixArticle = clone.querySelector("#prixArticle");
  prixArticle.textContent = (
    (leProduit.qtyCommand * leProduit.price) /
    100
  ).toFixed(2);
  prixArticle.id = "prix_" + indexPanier;

  const qteArticle = clone.querySelector("#qteArticle");
  qteArticle.textContent = leProduit.qtyCommand;
  qteArticle.id = "qte_" + indexPanier;
  const image = clone.querySelector("img");
  image.src = leProduit.imageUrl;
  image.alt = leProduit.altTxt;

  const prix = clone.querySelector(".cart__item__content__titlePrice p");
  prix.textContent = leProduit.price / 100 + " €.(PU.)";

  const c = indexPanier;
  const suprimer = clone.querySelector(".deleteItem");
  //suprimer.textContent = "Supprimer tout (qte : " + totalQte + "),";
  suprimer.addEventListener("click", function () {
    supprimArticle(c);
  });

  fragmentArticle.appendChild(clone);
  return fragmentArticle;
}
function titi() {
  console.log("TTTTRRRRRRRRRRRRRRRRRRR");
}

export { titi, templateArticle, afficheLigne };
