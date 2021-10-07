//let url = "http://localhost:3000/back/product";
let url = "http://localhost:3000/api/teddies";

var Les_produits = new les_kanap();
//let Kanap;
let Param;
let Panier = []; // array des lignes de cdes
let Cli_pro = []; // array des canapes ds le pannier
let le_prix = 0;
let la_qte = 0;
let Le_produit;

function edit_erreur(erreur) {
  console.log("Ressource non trouvée, erreur : " + erreur);
  //window.location = "";
}

function built(les_canap) {
  init_locastorage();

  les_canap.forEach((ki) => {
    //zi_prod = un_produit(ki);
    Les_produits.list_prod.push(un_produit(ki));
  });
  inner_1.innerHTML = Les_produits.editer();
}
//instancier un canapé !
function un_produit(ki) {
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
  this.prix = prix / 100;
  this.legende = legende;
  this.couleurs = couleurs;
  this.choix_couleur = -1;

  //this.date=--1,
  //this.ligne= 0; // parametre ???;
  this.tab_cdes = [];

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
  this.commander = function (qte, couleur) {
    console.log(qte + ", " + couleur);
    a = -1;
    if (this.tab_cdes.length != 0) {
      for (i = 0; i < this.tab_cdes.length; i++) {
        if (couleur == this.tab_cdes[i].color) {
          a = i;
          console.log("doublon " + a);
        }
      }
    }

    if (a == -1) {
      b = new ligne_c(this.id, qte, couleur);
      this.tab_cdes.push(b);
      Panier = JSON.parse(localStorage.getItem("panier"));
      Les_objets = JSON.parse(localStorage.getItem("les_obj"));
      Panier.push(b);
      Les_objets.push(this);
    } else {
      old_q = 1 * this.tab_cdes[a].qty;
      this.tab_cdes[a].qty = old_q + 1 * qte;
      console.log("n qte " + this.tab_cdes[a].qty);
    }
    le_prix = le_prix + this.prix * qte;
    document.getElementById("info_panier").innerHTML = le_prix + " €";
  };

  /*
 // zi_panier = localStorage.getItem("panier");
    //localStorage.setItem("panier", ma_cde); 

      //alert(localStorage.getItem("cde"));
      //localStorage.setItem("ccde" : JSON.stringify(this))
    */
}

/* ________________________*/

function les_kanap() {
  this.list_prod = [];

  this.editer = function () {
    le_max = this.list_prod.length;
    tt = "";
    for (i = 0; i < le_max; i++) {
      tt += this.list_prod[i].edit_1_prod();
      // console.log(this.list_prod[i].nom);
    }
    return tt;
  };
}

function edit_titre(koi) {
  document.title = koi;
}

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
  mess_mail: "Vous_avez_besoin_d_un_crédit",
};

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
function ligne_c(id, qte, color) {
  this.id = id;
  this.qty = qte;
  this.color = color;
  console.log(this.id + ", " + this.qty);
}
/* 
function recup_panier() {
  Panier = JSON.parse(localStorage.getItem("panier"));
  console.log(Panier.length);
}
function actu_panier() {
  localStorage.settItem("panier", JSON.stringify(Panier));
} */

function creer_jeu_essai() {
  const le_max = 10; //nbrecde

  vm = Les_produits.list_prod.length - 0.001;
  for (i = 0; i < le_max; i++) {
    a = parseInt(Math.floor(Math.random() * vm));
    nbr_art = 1 + parseInt(Math.floor(Math.random() * 2.99));
    //id2 = Les_produits.list_prod[a].id; //pas besoin
    ncol = Les_produits.list_prod[a].couleurs.length;
    choixcol = parseInt(Math.floor(Math.random() * (ncol - 0.01)));

    //BUG MONSTRE!!!!!!!

    //Les_produits.list_prod[a].commander(nbr_art, choixcol);

    console.log(" color : " + choixcol + ",+ nbr " + nbr_art);
  }
  // localStorage.setItem("panier", JSON.stringify(Panier));
}

/* function verif_ajout_line(id2, nbr_art, choixcol, prix) {
  for (let lig in Panier) {
    a = 0;
    if (id2 == lig.id && choixcol == lig.color) {
      a = 1;
      console.log("doublon");
    }
  }

  if (a == 0) {
    lig = new ligne_c(id2, nbr_art, choixcol);
    le_prix = le_prix + prix * nbr_art;

    Panier.push(lig);
  }
} */

//function verif_occurence_panier() {}

// + document.getElementsByName(head).innerHTML);

/* let Header={
    titre="",
   les_css=[],
   les_scripts=[],
   la_description:""
  }

  let le_form = {
    firstName: [le_type= "string", place_h:"ton prenom",regle=""]
  }
   /* 
    ,
    lastName: {le_type= "string", place_h:"ton nom",regle=""},
    address: {le_type= "string", place_h:"ton adresse",regle=""},
    city: {le_type= "integer", place_h:"ton code postal",regle=""},
    email: {le_type= "string", place_h:"ton mail",regle=""}
  } 
  */
/* */

//alert(myJSON);

//localStorage.clear();
//return;
//localStorage.settItem("num_ligne", 0);
/* if (localStorage.panier == "undefined") {
    localStorage.setItem("panier", 0);
  } */
/* function(nume){
  nume>999?(return "afaire"+nume) :(return nume);
}  */

// console.log("")
