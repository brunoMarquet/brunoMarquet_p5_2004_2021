let tab_prop = [];
let unClient = "";
let somme = 0;
// let gestionPanier;
let lePanier = JSON.parse(localStorage.getItem("panier")) ?? [];
if (lePanier.length != 0) {
  initPanier();
}

init_cart();
function annuler_lig(i, j) {
  console.log("ligneCde_" + i + "_" + j);
  lePanier[i].listeLigneCde.splice(j, 1);

  let nNbC = lePanier[i].listeLigneCde.length;
  let innerH = nNbC == 0 ? "article_" + i : "ligneCde_" + i + "_" + j;
  console.log(innerH);
  document.getElementById(innerH).innerHTML = "";
}
function ajout(sens, i, j) {
  bb = parseInt(document.getElementById("itemQuantity_" + i + "_" + j).value);
  nQte = sens + bb;
  // lePanier[i].listeLigneCde[j].qty;
  modif(nQte, i, j);
}
function modif(nQte, i, j) {
  //console.log("nbre  " + nQte);
  if (nQte > 0) {
    lePanier[i].listeLigneCde[j].qty = nQte;
    pu = lePanier[i].price;
    nPrix = (nQte * pu) / 100;
    //somme = somme + (sens * pu) / 100;
    //console.log("prix_" + i + "_" + j);
    document.getElementById("prix_" + i + "_" + j).innerHTML = nPrix;
    document.getElementById("itemQuantity_" + i + "_" + j).value = nQte;
    document.getElementById("total").innerHTML = somme + "€";
  } else {
    annuler_lig(i, j);
  }
}

function editLigne(i, j, qte, prix, couleur) {
  //une iigne de Cde..
  rustine = "";
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

/* function editLignes(lignes, couleurs) {
  let = tt = "";
  i = 0;
  // for (let i = 0; i < lignes.length; i++) {
  tt += ", qte : " + lignes[i].qty + "color- num " + lignes[i].color + "<br";
  // }
  console.log(lignes.length + tt);
  return "";
} */
function initPanier() {
  tt = "";
  let total = 0;

  for (let i = 0; i < lePanier.length; i++) {
    tt_lig = "";
    console.log("total cde " + i);
    vm = lePanier[i].listeLigneCde.length; //lePanier.listeLigneCde.length;

    for (let j = 0; j < vm; j++) {
      let liste = lePanier[i].listeLigneCde[j];
      qte = liste.qty;
      prix = (qte * lePanier[i].price) / 100;
      couleur = lePanier[i].colors[liste.color];
      total += prix;
      tt_lig += editLigne(i, j, qte, prix, couleur);
    }
    let lig_raz = vm > 1 ? "supprimer les " + vm + " lignes" : "";
    /* ou
    let lig_raz = "";
    if (vm > 1) {
      lig_raz = "supprimer les " + vm + " lignes";
    } */

    //console.log("tit " + lePanier[i].listeLigneCde.length);
    // console.log("qtt " + liste.qty);
    //tcd_lig = editLignes(lePanier[i].listeLigneCde, lePanier[i].colors);

    tt += ` <section id="cart__items">
    <!-- -->
    <article class="cart__item" id ="article_${i}" data-id="{product-ID}">
      <div class="cart__item__img">
        <img
          src="${lePanier[i].imageUrl}"
          alt="${lePanier[i].altTxt}"
        />
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${lePanier[i].name}</h2>
          <p>${lePanier[i].price / 100} €(PU.)</p>
        </div>
        ${tt_lig}
        </div>
      </div>
    </article>
  </section>
    
    `;
  }
  document.getElementById("panier").innerHTML = tt;
  document.getElementById("totalPrice").innerHTML = total + " €.";
  console.log("total cde " + total);
}
function init_cart() {
  let info_cli = [];
  url = "http://localhost:3000/api/teddies/order";
  edit_titre("votre panier");

  info_cli = localStorage.getItem("contact");
  if (info_cli != "") {
    unClient = JSON.parse(info_cli);

    for (let key in unClient) {
      if (unClient.hasOwnProperty(key)) {
        valeur = unClient[key];
        tab_prop.push(key);
        console.log(key, valeur);
        document.getElementById(key).value = valeur;
      }
    }
    //document.getElementById("order").addEventListener("click", order_panier);
    //if(){'<input type="checkbox" id="condtions_acept" name="vehicle1" value="accepter nos conditions'/>}
  }

  document.getElementById("header").innerHTML = ecrire_header(Coord);
  document.getElementById("footer").innerHTML = ecrire_footer(Coord);
}
function test_order() {
  vm = tab_prop.length;
  for (i = 0; i < vm; i++) {
    key = tab_prop[i];
    valeur = document.getElementById(key).value;
    console.log(valeur);
    if (unClient.hasOwnProperty(key)) {
      unClient[key] = valeur;
    }
  }
  localStorage.setItem("contact", JSON.stringify(unClient));
}
//event.stopPropagation();
/*  console.log("panier");
  vm = tab_prop.length;
  for (i = 0; i < vm; i++) {
    console.log(i);
  }
} */
