import * as moduleEdit from "../module/edition.mjs";
import * as myParam from "../module/parametres.js";
import * as myPanier from "../module/panier.js";

let url1 = "http://localhost:3000/api/products/order";
let arrayKey = [];
let unClient = myParam.unClient;
let lePanier = JSON.parse(localStorage.getItem("panier")) ?? [];
let ligCommande = [];
let qtyByColor = [];
let qtyCommand = 0;
let prixTotal = 0;
let qtyTotale = 0;

const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");

//let leProduit = "";

let preRemplir = 0; // a revoir
let i = -1;
init_cart();

function init_cart() {
  moduleEdit.ecrireHeaderFooter();
  let rep = moduleEdit.ecrireFormulaire(preRemplir, unClient);
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
    const fragment = initPanier();
    document.getElementById("cart__items").appendChild(fragment);
  }

  //document.getElementById("order").addEventListener("click", order_panier);
  //if(){'<input type="checkbox" id="condtions_acept" name="vehicle1" value="accepter nos conditions'/>}
}
function templateLigColor() {}

function initPanier() {
  lePanier = myPanier.refactoriserCde(lePanier);

  let fragmentSomme = new DocumentFragment();

  let compteur = -1;
  for (const leProduit of lePanier) {
    compteur++; //indice panier
    qtyTotale += 1 * leProduit.qtyCommand;
    prixTotal += (1 * leProduit.qtyCommand * leProduit.price) / 100;

    let k = -1; //indice couleur
    let fragmentColors = new DocumentFragment();

    for (const couleur of leProduit.colors) {
      k++;
      console.log(
        couleur +
          "___" +
          compteur +
          "___" +
          k +
          "-qt-" +
          leProduit.qtyByColor[k]
      );

      // const fragmentColor = templateCouleur(couleur, leProduit, compteur, k);
      // fragmentColors.appendChild(fragmentColor);
    }
    const fragmentArticle = myPanier.templateArticle(leProduit, compteur);
    fragmentSomme.appendChild(fragmentArticle);
  }
  modifTotal();
  return fragmentSomme;
}

function templateCouleur(couleur, leProduit, indexPanier, indexColor) {
  const titi = leProduit.ligCommande[indexColor];
  console.log("rr " + titi.qty);
  // debugger;
  const arrayLeColorLesCdes = leProduit.arrayLeColorLesCdes[indexColor];
  let fragColorCde = tempplateCdes(
    arrayLeColorLesCdes,
    leProduit.price,
    indexPanier,
    indexColor
  );
  return fragColorCde;
  return "";
}
function tempplateCdes(arrayLeColorLesCdes, prix, indexPanier, y) {
  let nnum = -1;
  let fragmentLignes = new DocumentFragment();
  for (const ligne of arrayLeColorLesCdes) {
    num++;
    console.log(+"cde" + indexPanier + ": " + y + ":" + num); //+ ", qty:" + ligne.qty);
    break;
    let templateLigne = document.getElementById("templateLigne");
    const cloneLigne = document.importNode(templateLigne.content, true);

    const arti = cloneLigne.querySelector("article");
    arti.id = `ligCde_${indexPanier}_${y}_${num}`;

    const qte = cloneLigne.querySelector(".qteLigneCde");
    qte.textContent = ligne.qty;
    qte.id = "qty_${indexPanier}_${y}_${num}";

    const prix = cloneLigne.querySelector(".prixLigne");
    prix.textContent = (ligne.qty * prix) / 100;
    //prix.id = "prix_" + x + "_" + y + "_" + num;
    prix.id = `prix_${indexPanier}_${y}_${num}`;
    const z = num;

    prix.addEventListener("click", function () {
      supprimLiCde(indexPanier, y, z);
    });
    const idCde = cloneLigne.querySelector("#idLigCde");
    //idCde.textContent = "id : " + ligne._id + " , le " + ligne.temps;
    idCde.textContent = `id :  ${ligne._id}  , le ${ligne.temps}`;

    const supprimer = cloneLigne.querySelector(".supLigne");
    supprimer.addEventListener("click", function () {
      supprimLigne(indexPanier, y, z);
    });
    const btM = cloneLigne.querySelector("#btonMoins");
    btM.addEventListener("click", function () {
      ajouterUn(-1, indexPanier, y, z);
    });
    const btP = cloneLigne.querySelector("#btonPlus");
    btP.addEventListener("click", function () {
      ajouterUn(1, indexPanier, y, z);
    });

    const leInput = cloneLigne.querySelector(".itemQuantity");
    leInput.value = ligne.qty;
    //leInput.id = "inQty_" + x + "_" + y + "_" + num;
    leInput.id = `inQty_${indexPanier}_${y}_${num}`;
    /*alternative
    
     */
    leInput.addEventListener("change", function () {
      modifCde(this.value, indexPanier, y, z);
    });

    fragmentLignes.appendChild(cloneLigne);
  }
  return fragmentLignes;
}

// partie metier....

function ajouterUn(sens, indexPanier, y, z) {
  const nQte = sens + 1 * lePanier[indexPanier].ligCommande[y][z].qty;
  modifCde(nQte, indexPanier, y, z);
}

function modifCde(nQte, indexPanier, y, z) {
  if (nQte > 0) {
    //const old1 = lePanier[x].ligCommande[y][z];

    const delta = nQte - 1 * lePanier[indexPanier].ligCommande[y][z].qty;
    const qte2Nouv = lePanier[indexPanier].qtyByColor[y] + delta;
    const qtyCommand = lePanier[indexPanier].qtyCommand + delta;

    lePanier[indexPanier].ligCommande[y][z].qty = nQte;
    lePanier[indexPanier].qtyByColor[y] = qte2Nouv;
    lePanier[indexPanier].qtyCommand = qtyCommand;
    qtyTotale = qtyTotale + delta;

    const prixU = lePanier[indexPanier].price / 100;
    prixTotal += delta * prixU;
    lePanier[indexPanier].ligCommande[y][z].nQte;

    //edition
    modifTotal();
    modifArticle(indexPanier, qtyCommand, 1 * qtyCommand * prixU);
    modifColor(indexPanier + "_" + y, qte2Nouv, 1 * qte2Nouv * prixU);
    modifLigne(indexPanier + "_" + y + "_" + z, nQte, 1 * nQte * prixU);
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
  const qtDelete = lePanier[a].qtyByColor[b];

  qtyTotale -= qtDelete;
  prixTotal -= (qtDelete * lePanier[a].price) / 100;
  qtyTotale -= qtDelete;
  lePanier[a].qtyCommand -= qtDelete;

  // actu le prix aussi

  lePanier[a].qtyByColor[b] = 0;
  lePanier[a].ligCommande[b] = [];
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

  //lePanier[a].ligCommande[b]

  modifTotal();
  document.getElementById("ligneCouleur_" + a + "_" + b).innerHTML = "";
}
function supprimArticle(indexPanier) {
  console.log(indexPanier);
  qtyTotale -= lePanier[indexPanier].qtyCommand;
  priindexPanierTotal -=
    (lePanier[indexPanier].qtyCommand * lePanier[indexPanier].price) / 100;
  lePanier[indexPanier].ligCommande = "";
  lePanier[indexPanier].qtyByColor = "";
  lePanier[indexPanier].qtyCommand = 0;
  modifTotal();
  document.getElementById("article_" + indexPanier).innerHTML = "";
}
//fonction d'affichage basique!
function modifArticle(indexPanier, qt, priindexPanier) {
  document.getElementById("qte_" + indexPanier).innerHTML = qt;
  document.getElementById("priindexPanier_" + indexPanier).innerHTML =
    priindexPanier.toFiindexPaniered(2);
  ///tout part en sucette
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
  //Event.preventDefault();
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
