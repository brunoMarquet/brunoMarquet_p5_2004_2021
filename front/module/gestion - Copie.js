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
  //let fragment = new DocumentFragment();
  let fragment1 = new DocumentFragment();
  let template = document.getElementById("patternProduit");

  this.editer = function () {
    3;
    const indexProduit = this.listeProduit.length;
    let fragmentSom = new DocumentFragment();
    let fragment1 = new DocumentFragment();
    let template = document.getElementById("produitTemplate");
    for (let i = 0; i < indexProduit; i++) {
      const clone = document.importNode(template.content, true);
      const lien = clone.querySelector("a");
      const nom = clone.querySelector("h3");
      const image = clone.querySelector("img");
      const descript = clone.querySelector("p");
      image.src = this.listeProduit[i].imageUrl;
      image.alt = this.listeProduit[i].altTxt;
      lien.href = "pages/produit.html?id=" + this.listeProduit[i]._id;
      nom.textContent = this.listeProduit[i].name;
      descript.textContent = this.listeProduit[i].description;

      fragment1.appendChild(clone);
      fragmentSom.appendChild(fragment1);
    }
    return fragmentSom;
  };
}
//************************
//*/

function ecrireTemplate(leProduit) {
  let fragment1 = new DocumentFragment();
  let template = document.getElementById("templateArticle");
  const clone = document.importNode(template.content, true);
  //const lien = clone.querySelector('#addToCart');
  const image = clone.querySelector("img");
  const titre = clone.querySelector("h1");
  const prix = clone.querySelector("#price");
  const descript = clone.querySelector("#description");

  //test
  let select = clone.querySelector("select");

  //const select = document.importNode(template.content, true);

  for (let i = 0; i < leProduit.colors.length; i++) {
    let choix = document.createElement("option");
    choix.textContent = leProduit.colors[i];
    choix.value = i;
    select.appendChild(choix);
  }

  image.src = leProduit.imageUrl;
  image.alt = leProduit.altTxt;

  titre.textContent = leProduit.name;
  /* titre.addEventListener("click", function () {
    alert("titi" + leProduit.price + " €");
  }); */

  prix.textContent = leProduit.price / 100;
  descript.textContent = leProduit.description;

  fragment1.appendChild(clone);

  return fragment1;
}
function afficheLignes(leProduit) {
  if (document.getElementById("myCheck").checked == true) {
    afficheLignes_2(leProduit);
  } else {
    afficheLignes_1(leProduit);
  }
}

function afficheLignes_1(leProduit) {
  let texte = "Votre Commande;<ul>";
  let total = 0;
  //for (let i = 0; i < leProduit.listeLigneCde.length; i++) {
  for (let b of leProduit.listeLigneCde) {
    //let b = leProduit.listeLigneCde[i];

    total += 1 * b.qty;

    texte += `<ol>Qté : ${b.qty} couleur : ${leProduit.colors[b.color]} à ${
      b.temps
    } . </ol>`;
  }
  //console.log("Q:" + total);
  total = (total * leProduit.price) / 100;
  texte += `</ul>Montant : ${total} €.`;
  document.getElementById("lesCdes").innerHTML = texte;
}

function afficheLignes_2(leProduit) {
  //synthese
  let t = "Votre Commande;<ul>";
  let total = 0;
  for (let i = 0; i < leProduit.colors.length; i++) {
    let cdePat = 0;

    let tableau = []; //pour les dates
    let tabQte = []; // pour qté unitaire

    for (let j = 0; j < leProduit.listeLigneCde.length; j++) {
      let b = leProduit.listeLigneCde[j];
      if (b.color == i) {
        cdePat += 1 * b.qty;
        tabQte.push(b.qty);
        tableau.push(b.temps);
      }
    }

    if (cdePat != 0) {
      total += 1 * cdePat;
      let trucCde = "";
      for (let k = 0; k < tableau.length; k++) {
        trucCde += `<br>Qté : ${tabQte[k]} à ${tableau[k]} .`;
      }
      t += `<li>Qté : ${cdePat} couleur : ${leProduit.colors[i]}:
      ${trucCde}</li>`;
    }
  }

  total = (total * leProduit.price) / 100;
  t += `</ul>Montant : ${total} €.`;
  document.getElementById("lesCdes").innerHTML = t;
}

export { afficher, editErreur, ecrireTemplate, afficheLignes };
