//let url = "http://localhost:3000/back/product";
//let url = "http://localhost:3000/api/teddies";

var Les_produits = new les_kanap();
//let Kanap;
let Param;
//let panier = []; // array des lignes de cdes
let Cli_pro = []; // array des canapes ds le pannier
let le_prix = 0;
let la_qte = 0;
let Le_produit;
let url = "http://localhost:3000/api/teddies";

let Parametres = {
  nom: "kanap",
  tel: "01 23 45 67 89",
  mail: "support@name.com",
  ville: "Paris 19",
  adresse: "10 quai de la Charente",
  credit:
    "© Copyright 2021 - 2042 | Openclassrooms by Openclassrooms | All Rights Reserved | Powered by &lt;3",
  latitude: 48.82,
  longitude: 2.29,
  messageMail: "Vous_avez_besoin_d_un_crédit",
};

function edit_erreur(erreur) {
  console.log("Ressource non trouvée, erreur : " + erreur);
  //window.location = "";
}

function built(les_canap) {
  init_locastorage();
  let tt = "";
  les_canap.forEach((element) => {
    element.listeLigneCde = [];

    /* productsList.forEach(element => {
      products.push(element);
    }); */

    /* if (jeu == 1) {
      creer_jeu(ki);
    } */
    Les_produits.listeProduit.push(element);
  });

  inner_1.innerHTML = Les_produits.editer();
}

function creer_truc() {
  let panier2 = JSON.parse(localStorage.getItem("panier")) ?? [];

  let nbr = panier2.length;
  console.log("panier : " + nbr);

  tt = "";
  if (nbr > 0) {
    for (i = 0; i < le_max; i++) {
      tt += panier[i].name;
    }
  }

  inner_1.innerHTML = tt;
}
function creer_jeu(ki) {
  nbr_art = 1 + parseInt(Math.floor(Math.random() * 2.99));

  //id2 = Les_produits.listeProduit[a].id; //pas besoin
  ncol = ki.colors.length;

  choixcol = parseInt(Math.floor(Math.random() * (ncol - 0.01)));
  let lig = new ligne_c(nbr_art, choixcol);
  ki.listeLigneCde.push(lig);
  panier.push(ki);
  //
  localStorage.setItem("panier", JSON.stringify(panier));
  return;
}
function les_kanap() {
  this.listeProduit = [];

  this.editer = function () {
    le_max = this.listeProduit.length;
    //console.log(this.listeProduit[1].name);

    //console.log(le_max);
    tt = "";
    for (i = 0; i < le_max; i++) {
      /* tt += this.listeProduit[i].name + "<br>";
      tt += this.listeProduit[i]._id + "<br>";
      tt += this.listeProduit[i].imageUrl + "<br>";
      tt += this.listeProduit[i].altTxt + "<br>";
      tt += this.listeProduit[i].description + "<br>";*/
      // console.log(this.listeProduit[i].listeLigneCde.length);
      // <i class="fas fa-shopping-basket"></i>
      let txt3 = "";
      if (this.listeProduit[i].listeLigneCde.length != 0) {
        txt3 = "( cde :" + this.listeProduit[i].listeLigneCde.length;
        // console.log("toto" + i);
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

function recherche_Prix(prixMax) {}

function retrouveLigne(couleur) {
  a = -1;
  for (i = 0; i < this.listeLignesCde.length; i++) {
    if (couleur == this.listeLignesCde[i].color) {
      a = i;
      //console.log("doublon " + a);
    }
  }
  return a;
}

function commander(qte, couleur) {
  //console.log(qte + ", " + couleur);

  let test = -1;
  if (leProduit.listeLigneCde.length != 0) {
    test = retrouveLigne(couleur);
  }

  if (a == -1) {
    let b = new ligne_c(qte, couleur);
    leProduit.listeLigneCde.push(b);

    //Les_objets = JSON.parse(localStorage.getItem("les_obj")) ?? [];
  } else {
    //let old_q = 1 * this.listeLignesCdes[a].qty;
    leProduit.listeLigneCde[a].qty = 1 * qte;
    console.log("n qte " + leProduit.listeLigneCde[a].qty);
  }
  return;

  Panier.push(this);
  const legende1 = this.legende;
  this.legende = "";
  //Les_objets.push(this);
  //localStorage.setItem("les_obj", JSON.stringify(Les_objets));
  this.legende = legende1;
  le_prix = le_prix + this.prix * qte;
  document.getElementById("info_panier").innerHTML = le_prix + " €";
  localStorage.setItem("panier", JSON.stringify(Panier));
  alert(localStorage.getItem("panier"));
}

/* ________________________*/

function edit_titre(koi) {
  document.title = koi;
}
function razStorage() {
  localStorage.clear();
}

// en json puie en storage
localStorage.setItem("coordonnes", JSON.stringify(Parametres));

let Coord = "";
aa = localStorage.getItem("coordonnes");
if (aa != "") {
  Coord = JSON.parse(aa);
  aa = "";
}

function init_locastorage() {
  //localStorage.clear();
  localStorage.setItem("mytime", Date.now());

  //localStorage.setItem("line", 0);

  let Contact = {
    firstName: "Pierre-henry",
    lastName: "Dupont-Telle2",
    address: "3 rue des martyrs,Paris",
    city: 75019,
    email: "dupont456@gmail.com",
  };

  let myJSON = JSON.stringify(Contact);

  localStorage.setItem("contact", myJSON);
  /* myJSON = "";
  Contact = "";
  */
}
function ligne_c(qte, color) {
  this.qty = qte;
  this.color = color;
  //console.log(this.color + ", " + this.qty);
}
