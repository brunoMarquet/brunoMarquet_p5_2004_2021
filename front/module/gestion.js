let Les_produits = new lesCanapes();
//let Kanap;
let Param;
//let panier = []; // array des lignes de cdes
let Cli_pro = []; // array des canapes ds le pannier
/* let le_prix = 0;
let la_qte = 0;
let Le_produit; */

function editErreur(erreur) {
  console.log("Ressource non trouvée, erreur : " + erreur);
  //window.location = "";
}

function afficher(les_canap) {
  //init_locastorage();
  let tt = "";

  les_canap.forEach((element) => {
    element.listeLigneCde = [];
    Les_produits.listeProduit.push(element);
  });

  return Les_produits.editer();
}

function lesCanapes() {
  this.listeProduit = [];
  //conerie:
  let fragment = new DocumentFragment();
  let fragment1 = new DocumentFragment();
  let template = document.getElementById("patternProduit");

  this.editer = function () {3
    const leMax = this.listeProduit.length;
    let fragmentSom = new DocumentFragment();
    let fragment1 = new DocumentFragment();
    let template = document.getElementById("produitTemplate");
    for (let i = 0; i < leMax; i++) {
      const clone = document.importNode(template.content, true);
      const lien = clone.querySelector("a");
      const nom = clone.querySelector("h3");
      const image = clone.querySelector("img");
      const descript = clone.querySelector("p");
      image.src = this.listeProduit[i].imageUrl;
      image.src.alt = this.listeProduit[i].altTxt;
      lien.href = this.listeProduit[i]._id;
      nom.textContent = this.listeProduit[i].name;
      descript.textContent = this.listeProduit[i].description;
      //console.log(image);

      fragment1.appendChild(clone);
      fragmentSom.appendChild(fragment1);
    }
    return fragmentSom;
  };
}

export { afficher, editErreur };
