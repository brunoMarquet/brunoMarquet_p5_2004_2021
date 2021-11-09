//resource https://regex101.com/
/*
caractere :/[abc]+/g
pas de chiffre "/[^1-9]/g;";
int <100:^[1-9][0-9]?$|^100$
*/
import * as myHeader from "../module/header.js";
import * as myFooter from "../module/footer.js";

import * as myParam from "../module/parametres.js";

let url1 = "http://localhost:3000/api/products/order";
let arrayKey = [];
//let unClient = myParam.unClient;
let lePanier = JSON.parse(localStorage.getItem("panier")) ?? [];
//let leProduit = "";

let preRemplir = 1;
//let listProd = ["107fb5b75607497b96722bda5b504926"];

init_cart();

function init_cart() {
 /* const chemin = window.location.pathname == "/front/index.html" ? "./" : "../";

  document.getElementById("header").innerHTML = myHeader.ecrireHeader(
    myParam.adresse,
    chemin
  );
  document.getElementById("footer").innerHTML = myFooter.ecrireFooter(
    myParam.adresse,
    chemin
  );
*/
  let info_cli = [];

  //edit_titre("votre panier");

  //info_cli = localStorage.getItem("contact");
  //if (info_cli != "") {
  //unClient = JSON.parse(info_cli);
  //let aa = document.getElementById("truc");

  //return;
  let tt = "";

  for (let key in unClient) {
    if (unClient.hasOwnProperty(key)) {
      let valeur = unClient[key];
      // console.log("mon t " + key);
      arrayKey.push(key);
      let lexemple = preRemplir == 1 ? "value='" + valeur.exemple + "'" : "";
      tt += `<div class="cart__order__form__question">
        <label for="${key}">${valeur.entete}: </label>
       <input type="${valeur.type}" id="${key}" name="${key}" placeholder="${valeur.pholder}" ${lexemple} >
        <p id="${key}ErrorMsg">${valeur.pholder}</p> `;
    }
  }

  document.getElementById("formulaire").innerHTML = tt;

  if (lePanier.length != 0) {
    initPanier();
  }

  //document.getElementById("order").addEventListener("click", order_panier);
  //if(){'<input type="checkbox" id="condtions_acept" name="vehicle1" value="accepter nos conditions'/>}
}

function initPanier() {
  let tt = "";
  let total = 0;
  let i = 0;

  for (const leProduit of lePanier) {
    let tt_lig = "";
    i++;

    let vm = leProduit.listeLigneCde.length; //lePanier.listeLigneCde.length;

    for (let j = 0; j < vm; j++) {
      let liste = leProduit.listeLigneCde[j];
      let qte = liste.qty;
      let temps = liste.temps;
      let couleur = leProduit.colors[liste.color];
      let prix = (qte * leProduit.price) / 100;

      total += prix;
      tt_lig += editLigne(i, j, qte, prix, couleur, temps);
    }
    let lig_raz = vm > 1 ? "supprimer les " + vm + " lignes" : "";

    tt += ` <section id="cart__items">
    <!-- -->
    <article class="cart__item" id ="article_${i}" data-id="{product-ID}">
      <div class="cart__item__img">
        <img
          src="${leProduit.imageUrl}"
          alt="${leProduit.altTxt}"
        />
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${leProduit.name}</h2>
          <p>${leProduit.price / 100} €(PU.)</p>
        </div>
        ${tt_lig}
        </div>
      </div>
    </article>
  </section>
    
    `;
  }
  document.getElementById("cart__items").innerHTML = tt;
  //document.getElementById("totalPrice").innerHTML = total + " €.";
  console.log("total cde " + total);
}

function editLigne(i, j, qte, prix, couleur, temps) {
  //une iigne de Cde..
  let rustine = "";
  if (qte < 99) {
    rustine = `<div class="bton_nbr" onclick="ajout(1,${i},${j})">+</div>`;
  }
  let tt = `
  <div class="cart__item__content__settings"id="ligneCde_${i}_${j}">
          <div class="cart__item__content__settings__quantity">
          <p >couleur : ${couleur}</p><br>
            <p >Qté : 
            <input
              type="number"
              class="itemQuantity"
              id="itemQuantity_${i}_${j}" 
              onchange="modif(this.value,${i},${j})"
              min="1"
              max="100"
              value="${qte}"
            /></p>
          </div>
          <p id="prix_${i}_${j}">prix : ${prix} € </p>
         <div class="bton_nbr" onclick="ajout(-1,${i},${j})">-</div>
         ${rustine}
         à ${temps[0]} min. ${temps[1]} sec.
         <div class="cart__item__content__settings__delete">
            <p class="deleteItem" onclick="annuler_lig(${i},${j})">Supprimer</p>
          </div>
  `;

  // for (let i = 0; i < lignes.length; i++) {
  // tt += ", qte : " + qte + "color- num " + couleur + "<br";
  // }
  //console.log(tt);
  return tt;
}

function annuler_lig(i, j) {
  return;
  console.log("ligneCde_" + i + "_" + j);
  lePanier[i].listeLigneCde.splice(j, 1);

  let nNbC = lePanier[i].listeLigneCde.length;
  let innerH = nNbC == 0 ? "article_" + i : "ligneCde_" + i + "_" + j;
  console.log(innerH);
  document.getElementById(innerH).innerHTML = "";
}
function ajout(sens, i, j) {
	 return;
  let bb = parseInt(
    document.getElementById("itemQuantity_" + i + "_" + j).value
  );
  let nQte = sens + bb;
  // lePanier[i].listeLigneCde[j].qty;
  modif(nQte, i, j);
}
function modif(nQte, i, j) {
	 return;
	
  //console.log("nbre  " + nQte);
  if (nQte > 0) {
    lePanier[i].listeLigneCde[j].qty = nQte;
    let pu = lePanier[i].price;
    let nPrix = (nQte * pu) / 100;
    //somme = somme + (sens * pu) / 100;
    //console.log("prix_" + i + "_" + j);
    document.getElementById("prix_" + i + "_" + j).innerHTML = nPrix;
    document.getElementById("itemQuantity_" + i + "_" + j).value = nQte;
    document.getElementById("total").innerHTML = somme + "€";
  } else {
    annuler_lig(i, j);
  }
}

function razForm() {
  //  patt = /[^1-9]/g;
  //var result = patt.test(str);
  // alert(patt.test("Hello world!89"));
  const vm = arrayKey.length;
  for (let i = 0; i < vm; i++) {
    document.getElementById(arrayKey[i]).value = "";
  }
}
//function valder() {}
function estValide(value) {
  let regle = /[^1-9]/g;
  regle = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return regle.test(value);
}

function test_order() {
  let vm = arrayKey.length;
  let cptErreur = 0;
  for (let i = 0; i < vm; i++) {
    key = arrayKey[i];
    valeur = document.getElementById(key).value;
    let inner1 = document.getElementById(key + "ErrorMsg");

    if (contact.hasOwnProperty(key)) {
      //console.log(valeur + " : " + controleValeur(valeur));
      if (estValide(valeur)) {
        console.log(valeur + "ok");
        inner1.innerHTML = "PARFAIT";
        contact.key = valeur;
      } else {
        cptErreur++;
        contact.key = valeur + "-faux";
        inner1.innerHTML = "C'est FAUX";
      }

      console.log(key + " ; " + contact.key);
    }
  }
  contact = {};

  const envoiPoster = {
    contact: contact,
    products: [],
    /* 
     
      "107fb5b75607497b96722bda5b504926",
    ], */
    //listProd,
  };

  // console.log(envoiPoster.contact);

  // return;

  valider(envoiPoster);
  //localStorage.setItem("contact", JSON.stringify(contact));
}

function valider(envoiPoster) {
  fetch(url1, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(envoiPoster),
  })
    .then((res) => {
      console.log("Reponse:  " + JSON.stringify(res));
      // alert(res);
    })
    .catch(function (error) {
      console.log("erreur:  " + error);

      //myModProduit.editErreur(error);
    });
}
//event.stopPropagation();
/*  console.log("panier");
  vm = arrayKey.length;
  for (i = 0; i < vm; i++) {
    console.log(i);
  }
} */
