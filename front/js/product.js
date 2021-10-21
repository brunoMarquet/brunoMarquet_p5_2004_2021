import * as myModule from "../module/editHtml.js";
import * as myModule2 from "../module/parametres.js";
import * as myModProduit from "../module/produit.js";

//cacb65d43b2b5c1ff70f3393ad1
let url = "http://localhost:3000/back/product ";

//retrieving the URL parameter
let lePanier = JSON.parse(localStorage.getItem("panier")) ?? [];
if (lePanier.length != 0) {
  // initPanier();
}
let leProduit;
let inPanier = false;
//let appli=
//let gestion; //

initLeProduit();

function initLeProduit() {
  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("id");

  url = "http://localhost:3000/api/products/" + product_id;
  //Product
  fetch(url, { method: "GET" })
    .then((data) => {
      return data.json();
    })
    .then((product) => {
      console.log(product.name);
      affichLeProduit(product);
    })
    .catch(function (error) {
      console.log(error);
      //  edit_erreur(error);
    });
  document.getElementById("header").innerHTML = myModule.ecrireHeader(
    myModule2.adresse
  );
  document.getElementById("footer").innerHTML = myModule.ecrireFooter(
    myModule2.adresse
  );
}
function recupLigne(identifiant) {
  let a = -1;
  let vm = lePanier.length;
  for (let i = 0; i < vm; i++) {
    if (identifiant == lePanier[i]._id) {
      a = i;
    }
  }
  return a;
}
function modifCouleur(couleur) {
  // console.log(couleur);
  nbre = leProduit.listeLigneCde.length;
  console.log(nbre);
  let a = -1;

  for (let i = 0; i < nbre; i++) {
    if (couleur == leProduit.listeLigneCde[i].color) {
      a = i;
    }
  }
  if (a != -1) {
    let cde = leProduit.listeLigneCde[a];
    //alert(cde.qty);
    document.getElementById("itemQuantity").value = cde.qty;
    modifSomme(cde.qty);
  } else {
    document.getElementById("itemQuantity").value = 0;
    in_info_prix.innerHTML = "";
  }
  // if (couleur)
}
function modifQte(qte) {
  if (qte < 100) {
    modifSomme(qte);
  }
}
function modifSomme(qte) {
  in_info_prix.innerHTML = "prix : " + (qte * leProduit.price) / 100 + "€";
}
function ajoutPanier() {
  vtt = "";
  v_err = 0;

  qte = document.getElementById("itemQuantity").value;
  couleur = document.getElementById("colors").value;
  if (qte == 0) {
    vtt += "Merci de choisir une quantité svp !<br>";
    v_err++;
  }
  if (couleur == -1) {
    vtt += "Merci de choisir la couleur svp !";
    v_err++;
  }

  if (v_err == 0) {
    //adeplacer

    commander(qte, couleur);

    tt =
      qte +
      " " +
      leProduit.nom +
      " de couleur " +
      couleur +
      " ajouté(s) à votre panier";
    in_info1.innerHTML = tt;

    /*num = localStorage.getItem("num_ligne_cde");
    num++;
    localStorage.setItem("cde." + num, leProduit.id + "_" + qte + "_" + couleur);
    localStorage.settItem("num_ligne_cde", num);

    //inner_erreur.innerHTML = "";*/
  } else {
    //erreur

    v_err == 2 ? (pluriel = "s") : (pluriel = "");
    v1 = "Nous avons " + v_err + " problème" + pluriel + " :<br>" + vtt;
    in_info_erreur.innerHTML = v1;

    //inner_erreur.innerHTML = vtt;
    //alert(vtt + " pas ok");
    //document.getElementById("mess_erreur").innerHTML = vtt;
  }
  //
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
}

function ligne_c(qte, color) {
  this.qty = qte;
  this.color = color;
  //console.log(this.color + ", " + this.qty);
}

// La super fonction§§§§§§§§§§§§§§§§§

function affichLeProduit(leCanap) {
  document.title = leCanap.name;

  let a = recupLigne(leCanap._id);
  let messText = "";

  if (a == -1) {
    leCanap.listeLigneCde = [];
  } else {
    let inPanier = true;
    leCanap.listeLigneCde = lePanier[a].listeLigneCde;
    //  c'est ok
    let nbre = leCanap.listeLigneCde.length;
    let messText = "vous avez déja commandé :<br>";
    for (let i = 0; i < nbre; i++) {
      let lig = leCanap.listeLigneCde[i];
      messText +=
        lig.qty +
        " canapé(s) de couleur  : " +
        lePanier[a].colors[lig.color] +
        "<br>";
    }
    //console.log(messText);
    //in_info1.innerHTML = messText;
  }

  leProduit = leCanap;

  let inner_2 = document.getElementsByTagName("article")[0];
  let tt_option = "";
  let tt = "";

  let nbre_color = leProduit.colors.length;

  for (let i = 0; i < nbre_color; i++) {
    let koi = leProduit.colors[i];
    tt_option += `<option value="${i}">${koi}</option>`;
  }

  tt = `<div class="item__img">
    <img src="${leProduit.imageUrl}" alt="${leProduit.altTxt}">
  </div>
  <div class="item__content">
  <div class="item__content__titlePrice">
      <h1 id="title">${leProduit.name}</h1>
      <p>Prix : <span id="price">${leProduit.price / 100} € (PU.)</span></p>
    </div>
  <div class="item__content__description">
      <p class="item__content__description__title">Description :</p>
      <p id="description">${leProduit.description}</p>
    </div>
  <div class="item__content__settings">
      <div class="item__content__settings__color">
        <label for="color-select">Choisir une taille (une couleur ?!) :</label>
        <select name="color-select" id="colors" onchange="modifCouleur(this.value)">
            <option value=-1>--SVP, choisissez parmi ${nbre_color} couleurs  --</option>${tt_option}

   </select>
      </div>
      <div class="item__content__settings__quantity">
        <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
        <input type="number" name="itemQuantity" min="1" max="100" value="0" id="itemQuantity" onchange="modifQte(this.value)">
      </div>
    </div>
      <div class="item__content__addButton">
      <button id="addToCart">Ajouter au panier</button>
    </div><br>
    
    <div id="prix_ligne">tt</div>
    <div id="message_info"></div>
    <div id="message_erreur"></div>
  </div>`;

  inner_2.innerHTML = tt;
  const in_info_prix = document.getElementById("prix_ligne");
  const in_info1 = document.getElementById("message_info");
  const in_info_erreur = document.getElementById("message_erreur");

  document.getElementById("addToCart").addEventListener("click", ajoutPanier);
  in_info1.innerHTML = messText;
}
