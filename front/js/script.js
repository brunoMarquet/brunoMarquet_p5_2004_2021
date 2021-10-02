//let url = "http://localhost:3000/back/product";
let url = "http://localhost:3000/api/teddies";
let inner_1 = document.getElementById("items");
let txt_dyn_1 = "";
let Kanaps = new les_kanap();
//let Kanap;
let Param;
let Panier;

//les Produits
fetch(url, { method: "GET" })
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    built(products);
  })
  .catch(function (error) {
    edit_erreur(error);
  });

function edit_erreur(erreur) {
  console.log("Ressource non trouvée, erreur : " + erreur);

  //window.location = "";
}
function built(les_canap) {
  init_locastorage();

  les_canap.forEach((ki) => {
    zi_prod = un_canap(ki);
    Kanaps.list_kanap.push(zi_prod);
  });

  inner_1.innerHTML = Kanaps.editer();
}
//instancier un canapé !
function un_canap(ki) {
  zi_prod = new Kanap(
    ki._id,
    ki.name,
    ki.imageUrl,
    ki.altText,
    ki.price,
    ki.description,
    ki.colors
  );
  return zi_prod;
}

// la class canape _le constructeur!
function Kanap(id, nom, image, alt_text, prix, legende, couleurs) {
  this.id = id;
  this.nom = nom;
  this.image = image;
  this.alt_img = alt_text;
  this.prix = prix;
  this.legende = legende;
  this.couleurs = couleurs;
  this.choix_couleur = -1;
  this.qty = 0; // parametre ???;

  this.edit_1_prod = function () {
    tt = `<a href="product.html?id=${this.id}">
            <article>
              <img src="${this.image}" alt="${this.alt_img}">
              <h3 class="productName">${this.nom}</h3>
              <p class="productDescription">${this.legende}</p>
            </article>
          </a>`;
    return tt;
  };
}

/* 
________________________*/

function les_kanap() {
  this.list_kanap = [];

  this.editer = function () {
    le_max = this.list_kanap.length;
    console.log("num in tableau : " + le_max);
    tt = "";
    for (i = 0; i < le_max; i++) {
      tt += this.list_kanap[i].edit_1_prod();
    }
    return tt;
  };
}
function edit_titre(koi) {
  document.title = koi;
}

function init_locastorage() {
  localStorage.clear();
  localStorage.setItem("mytime", Date.now());
  itd = "_#_";
  localStorage.setItem("item_del", itd);
  localStorage.setItem("line", 0);

  nom = "Dupont-Telle";
  prenom = "Pierre-henry";
  le_mail = "dupont456@gmail";
  ville = "Paris";
  adresse = "3 rue des Martyrs";
  truc = nom + itd + prenom + itd + le_mail + itd + ville + itd + adresse;
  localStorage.setItem("info_client", truc);

  //localStorage.settItem("num_ligne_cde", 0);

  //localStorage.clear();
  return;

  /* if (localStorage.panier == "undefined") {
    localStorage.setItem("panier", 0);
  } */

  // console.log("");
}
