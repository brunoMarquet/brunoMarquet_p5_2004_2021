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
  console.log("ok :  " + Les_produits.listeProduit.length);

  return Les_produits.editer();
}

function lesCanapes() {
  this.listeProduit = [];

  this.editer = function () {
    const le_max = this.listeProduit.length;
    console.log(this.listeProduit.length);

    let tt = "";
    for (let i = 0; i < le_max; i++) {
      let txt3 = "";
      if (this.listeProduit[i].listeLigneCde.length != 0) {
        txt3 = "( cde :" + this.listeProduit[i].listeLigneCde.length;
      }

      tt += `<a href="product.html?id=${this.listeProduit[i]._id}">
        <article>
          <img src="${this.listeProduit[i].imageUrl}" alt="${this.listeProduit[i].altTxt}">
          <h3 class="productName">${this.listeProduit[i].name}</h3>
          <p class="productDescription">${txt3} ${this.listeProduit[i].description} </p>
        </article>
      </a>`;
    }
    return tt;
  };
}

export { afficher, editErreur };
