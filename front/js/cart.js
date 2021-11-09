//resource https://regex101.com/
/*
caractere :/[abc]+/g
pas de chiffre "/[^1-9]/g;";
int <100:^[1-9][0-9]?$|^100$
*/
import * as myHeader from "../module/header.js";
import * as myFooter from "../module/footer.js";

import * as myParam from "../module/parametres.js";
import * as myPanier from "../module/panier.js";

let url1 = "http://localhost:3000/api/products/order";
let arrayKey = [];
let unClient = myParam.unClient;
let lePanier = JSON.parse(localStorage.getItem("panier")) ?? [];
let arrayColorCde = [];
let arrayColorQty = [];
let cdeQte = 0;
let prixTotal = 0;
let qtyTotale = 0;

const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");

//let leProduit = "";

let preRemplir = 1; // a revoir

init_cart();

function init_cart() {
  const chemin = window.location.pathname == "/front/index.html" ? "./" : "../";

  document.getElementById("header").innerHTML = myHeader.ecrireHeader(
    myParam.adresse,
    chemin
  );
  document.getElementById("footer").innerHTML = myFooter.ecrireFooter(
    myParam.adresse,
    chemin
  );

  let rep = myPanier.ecrireFormulaire(preRemplir, unClient);
  document.getElementById("formulaire").innerHTML = rep[0];
  arrayKey = rep[1];

  document
    .getElementById("testProvisoire")
    .addEventListener("click", function () {
      test_order();
    });
  const leForm = document.querySelector("form");
  leForm.addEventListener("submit", function () {
    test_order();
  });

  if (lePanier.length != 0) {
    //initPanier();
    //TESTTTT
    const fragment = initPanier2();
    document.getElementById("cart__items").appendChild(fragment);
  }

  //document.getElementById("order").addEventListener("click", order_panier);
  //if(){'<input type="checkbox" id="condtions_acept" name="vehicle1" value="accepter nos conditions'/>}
}
function initPanier2() {
  let fragmentSomme = new DocumentFragment();
  let fragment1 = new DocumentFragment();
  let template = document.getElementById("templateCde");

  let compteur = -1;
  let i = -1;
  for (const leProduit of lePanier) {
    compteur++;
    cdeQte = 0;

    i++;
    let numColor = -1;
    let j = -1;
    arrayColorCde = [];
    arrayColorQty = [];

    /*
    sequence por retrouver et réapparier les lignes de Cdes par couleur
    */

    for (const couleur of leProduit.colors) {
      numColor++;
      let arrayColor = [];
      let qtyCo = 0;

      for (const ligneC of leProduit.listeLigneCde) {
        if (ligneC.color == numColor) {
          qtyCo += 1 * ligneC.qty;
          arrayColor.push(ligneC);
        }
      }

      cdeQte += 1 * qtyCo;
      arrayColorQty.push(qtyCo);
      arrayColorCde.push(arrayColor);
      qtyTotale += 1 * qtyCo; // (on ajoute poires & pommes)
      prixTotal += (1 * qtyCo * leProduit.price) / 100;
      qtyCo = 0; //oups
    }
    /**
     restitution*/
    leProduit.cdeQte = cdeQte;
    leProduit.arrayColorQty = arrayColorQty;
    leProduit.arrayColorCde = arrayColorCde;
    lePanier[compteur] = leProduit;

    const clone = document.importNode(template.content, true);
    const arti = clone.querySelector("article");
    arti.id = "article_" + compteur;
    const retour = clone.querySelector("#revoirProduit");
    retour.textContent = "<= " + leProduit.name;
    retour.href = "./produit.html?id=" + leProduit._id;
    const nom = clone.querySelector("h2");
    nom.textContent = leProduit.name;
    nom.id = leProduit._id;

    const prixArticle = clone.querySelector("#prixArticle");
    prixArticle.textContent = (
      (leProduit.cdeQte * leProduit.price) /
      100
    ).toFixed(2);

    prixArticle.id = "prix_" + compteur;

    const qteArticle = clone.querySelector("#qteArticle");
    qteArticle.textContent = leProduit.cdeQte;
    qteArticle.id = "qte_" + compteur;

    // ou const image = clone.querySelector(".cart__item__img");
    const image = clone.querySelector("img");
    image.src = leProduit.imageUrl;
    image.alt = leProduit.altTxt;

    const prix = clone.querySelector(".cart__item__content__titlePrice p");
    prix.textContent = leProduit.price / 100 + " €.(PU.)";

    const c = compteur;
    const suprimer = clone.querySelector(".deleteItem");
    //suprimer.textContent = "Supprimer tout (qte : " + totalQte + "),";
    suprimer.addEventListener("click", function () {
      supprimArticle(c);
    });

    const lesCouleurs2 = clone.querySelector("lesCouleurs");

    let k = -1;
    let fragment2 = new DocumentFragment();

    for (const couleur of leProduit.colors) {
      k++;
      if (arrayColorCde[k].length != 0) {
        let template2 = document.getElementById("templateColor");

        const clone2 = document.importNode(template2.content, true);
        const leId = clone2.querySelector("h3");
        leId.id = "ligneCouleur_" + compteur + "_" + k;
        const laCcouleur = clone2.querySelector("#laCouleur");
        laCcouleur.textContent = couleur;

        const qtColor = clone2.querySelector(".maQuantiteColor");
        qtColor.textContent = arrayColorQty[k];
        qtColor.id = "qtColor_" + compteur + "_" + k;

        const prixColor = clone2.querySelector(".monPrixColor");
        prixColor.textContent = (arrayColorQty[k] * leProduit.price) / 100;
        prixColor.id = "prixColor_" + compteur + "_" + k;

        const suprim = clone2.querySelector(".suprimerLigColor");
        suprim.id = "suprim_" + compteur + "_" + k;
        const x = compteur;
        const y = k;
        suprim.addEventListener("click", function () {
          supprimColor(x, y);
        });

        fragment2.appendChild(clone2);

        let fragment3 = new DocumentFragment();
        let num = -1;
        for (const ligne of arrayColorCde[k]) {
          num++;
          // ligne.qty;?? CONNERIE§§§§

          //console.log(ligne.qty);
          let template3 = document.getElementById("templateLigne");
          const clone3 = document.importNode(template3.content, true);

          const arti = clone3.querySelector("article");
          arti.id = "ligCde_" + x + "_" + y + "_" + num;

          const qte = clone3.querySelector(".qteLigneCde");
          qte.textContent = ligne.qty;
          qte.id = "qty_" + x + "_" + y + "_" + num;

          const prix = clone3.querySelector(".prixLigne");
          prix.textContent = (ligne.qty * leProduit.price) / 100;
          prix.id = "prix_" + x + "_" + y + "_" + num;
          const z = num;

          prix.addEventListener("click", function () {
            supprimLiCde(x, y, z);
          });
          const idCde = clone3.querySelector("#idLigCde");
          idCde.textContent = "id : " + ligne._id + " , le " + ligne.temps;

          const supprimer = clone3.querySelector(".supLigne");

          supprimer.addEventListener("click", function () {
            supprimLigne(x, y, z);
          });
          const btM = clone3.querySelector("#btonMoins");
          btM.addEventListener("click", function () {
            ajouterUn(-1, x, y, z);
          });
          const btP = clone3.querySelector("#btonPlus");
          btP.addEventListener("click", function () {
            ajouterUn(1, x, y, z);
          });

          const leInput = clone3.querySelector(".itemQuantity");
          leInput.value = ligne.qty;
          leInput.id = "inQty_" + x + "_" + y + "_" + num;
          leInput.addEventListener("change", function () {
            modifCde(this.value, x, y, z);
          });

          fragment3.appendChild(clone3);
        }
        fragment2.appendChild(fragment3);
      }
      fragment1.appendChild(fragment2);
    }

    fragment1.appendChild(clone); //pas de soucis ici
    fragmentSomme.appendChild(fragment1);
  }

  modifTotal();

  return fragmentSomme;
}

function ajouterUn(sens, x, y, z) {
  const nQte = sens + 1 * lePanier[x].arrayColorCde[y][z].qty;
  modifCde(nQte, x, y, z);
}

function modifCde(nQte, x, y, z) {
  if (nQte > 0) {
    //const old1 = lePanier[x].arrayColorCde[y][z];

    const delta = nQte - 1 * lePanier[x].arrayColorCde[y][z].qty;
    const qte2Nouv = lePanier[x].arrayColorQty[y] + delta;
    const cdeQte = lePanier[x].cdeQte + delta;

    lePanier[x].arrayColorCde[y][z].qty = nQte;
    lePanier[x].arrayColorQty[y] = qte2Nouv;
    lePanier[x].cdeQte = cdeQte;
    qtyTotale = qtyTotale + delta;

    const prixU = lePanier[x].price / 100;
    prixTotal += delta * prixU;
    lePanier[x].arrayColorCde[y][z].nQte;

    //edition
    modifTotal();
    modifArticle(x, cdeQte, 1 * cdeQte * prixU);
    modifColor(x + "_" + y, qte2Nouv, 1 * qte2Nouv * prixU);
    modifLigne(x + "_" + y + "_" + z, nQte, 1 * nQte * prixU);
  } else {
    //Rien qte=0 alors
  }
}
function modifTotal() {
  totalQuantity.innerHTML = qtyTotale;
  totalPrice.innerHTML = prixTotal.toFixed(2);
}

function supprimLigne(a, b, c) {
  //const refId = x + "_" + y + "_" + z;
  console.log(a + ", " + b + ", " + c);
}
function supprimColor(a, b) {
  console.log(a + ", " + b);
  const qtDelete = lePanier[a].arrayColorQty[b];

  qtyTotale -= qtDelete;
  prixTotal -= (qtDelete * lePanier[a].price) / 100;
  qtyTotale -= qtDelete;
  lePanier[a].cdeQte -= qtDelete;

  // actu le prix aussi

  lePanier[a].arrayColorQty[b] = 0;
  lePanier[a].arrayColorCde[b] = [];
  let j = -1;
  for (const lig in lePanier[a].listeLigneCde) {
    j++;
    if (lig.color == b) {
      lePanier[a].listeLigneCde.splice(j, 1);
      console.log(
        "art" + lePanier[a].name + ": " + lePanier[a].colors[b] + "delete"
      );
    }
  }

  //lePanier[a].arrayColorCde[b]

  modifTotal();
  document.getElementById("ligneCouleur_" + a + "_" + b).innerHTML = "";
}
function supprimArticle(x) {
  console.log(x);
  qtyTotale -= lePanier[x].cdeQte;
  prixTotal -= (lePanier[x].cdeQte * lePanier[x].price) / 100;
  lePanier[x].arrayColorCde = "";
  lePanier[x].arrayColorQty = "";
  lePanier[x].cdeQte = 0;

  //lePanier[x].listeLigneCde = 0;

  modifTotal();

  document.getElementById("article_" + x).innerHTML = "";
}
//fonction d'affichage basique!
function modifArticle(x, qt, prix) {
  document.getElementById("qte_" + x).innerHTML = qt;
  document.getElementById("prix_" + x).innerHTML = prix.toFixed(2);
}
function modifColor(x, qt, prix) {
  //const refId2 = x + "_" + y;
  document.getElementById("qtColor_" + x).innerHTML = qt;
  document.getElementById("prixColor_" + x).innerHTML = prix.toFixed(2);
}

function modifLigne(x, qt, prix) {
  document.getElementById("inQty_" + x).value = qt;
  document.getElementById("qty_" + x).innerHTML = qt;
  document.getElementById("prix_" + x).innerHTML = prix.toFixed(2);
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
  event.preventDefault();
  //let vm = arrayKey.length;
  let cptErreur = 0;
  let unContact = {};
  // {};
  //let lesproduitcde=[];
  for (const key of arrayKey) {
    // const key = arrayKey[i];
    const valeur = document.getElementById(key).value;
    const inner1 = document.getElementById(key + "ErrorMsg");

    if (unClient.hasOwnProperty(key)) {
      if (estValide(valeur)) {
        console.log(valeur + "ok");
        inner1.innerHTML = "PARFAIT";

        // unClient.key = valeur;
      } else {
        cptErreur++;
        //valeur = valeur + "-faux";
        inner1.innerHTML = "C'est FAUX";
      }
      unContact[key] = valeur;
      //console.log(key + " "); // + unClient.key);
    }
  }
  cptErreur = 0; //prov

  // console.log(JSON.stringify(unContact));
  if (cptErreur == 0) {
    let products = [];
    for (const leProduit of lePanier) {
      products.push(leProduit._id);
    }

    //console.log(JSON.stringify(products));
    if (products.length != 0) {
      const envoiPost = {
        contact: unContact,
        products: products,
      };
      myPanier.valider(url1, envoiPost);
      return;
    }
  }
}

//event.stopPropagation();
/*  console.log("panier");
  vm = arrayKey.length;
  for (i = 0; i < vm; i++) {
    console.log(i);
  }
} */
