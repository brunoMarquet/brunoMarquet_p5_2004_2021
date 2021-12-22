import * as myParam from "../module/parametres.js";

let lesPrix = {};

/*********  ecrireFormulaire ***************
 */

function ecrireFormulaire(preRemplir) {
  let text = "";

  let objRegex = {};
  //??
  const unClient = myParam.unClient;

  for (let key in unClient) {
    if (unClient.hasOwnProperty(key)) {
      let valeur = unClient[key];
      // console.log("mon t " + key);

      objRegex[key] = valeur.regle;
      let lexemple = preRemplir == 1 ? "value='" + valeur.exemple + "'" : "";
      text += `<div class="cart__order__form__question">
        <label for="${key}">${valeur.entete}: </label>
       <input type="${valeur.type}" id="${key}" name="${key}" placeholder="${valeur.pholder}" ${lexemple} >
        <p id="${key}ErrorMsg"></p> `;
    }
  }
  return [text, objRegex];
}
/*********  ecrireFormulaire ***************
 */

function ecrirePanier(listeProduit, lePanier) {
  let fragmentSomme = new DocumentFragment();
  let fragmentArticle = new DocumentFragment();

  for (const [unId, ligne] of Object.entries(lePanier)) {
    console.log(`${unId}`);

    const unProduct = getProdPanier(unId, listeProduit);

    const fragmentArticle = moduleEdit.templateArticle(
      unProduct,
      ligne,
      lesPrix
    );

    fragmentSomme.appendChild(fragmentArticle);
  }

  writeTotal();
  return fragmentSomme;
}

function ecrirePanier____(lePanier, listeProduit) {
  let fragmentSomme = new DocumentFragment();
  let fragmentArticle = new DocumentFragment();
  let compteur = -1;
  for (const [unId, ligne] of Object.entries(lePanier)) {
    console.log(`${unId}`);
    compteur++;
    const unProduct = getProdPanier(unId, listeProduit);
    const fragmentArticle = templateArticle(unProduct, ligne, compteur);

    for (const [color, qty] of Object.entries(ligne)) {
      console.log(`${color} qte : ${qty}`);
    }
    fragmentSomme.appendChild(fragmentArticle);
  }
  return fragmentSomme;

  /*  for (const [color, qty] of Object.entries(ligne)) {
      console.log(`${color} qte :${qty}`);
    }
  } */
  return;
}

function getProdPanier(unId, lesProduits) {
  for (let j = 0; j < lesProduits.length; j++) {
    if (lesProduits[j]._id == unId) {
      return lesProduits[j];
    }
  }
  return {};
}

function templateArticle(leProduit, lignes, lesPrix) {
  let fragmentArticle = new DocumentFragment();
  let template = document.getElementById("templateCde");
  const clone = document.importNode(template.content, true);
  const arti = clone.querySelector("article");
  arti.id = "article_" + leProduit._id;
  const retour = clone.querySelector("#revoirProduit");
  retour.textContent = "<= " + leProduit.name;
  retour.href = "./produit.html?id=" + leProduit._id;
  const nom = clone.querySelector("h2");
  nom.textContent = leProduit.name;

  const image = clone.querySelector("img");
  image.src = leProduit.imageUrl;
  image.alt = leProduit.altTxt;

  const prix = clone.querySelector("#pu");
  prix.textContent = formaterPrix(leProduit.price, 1);

  const suprimer = clone.querySelector(".deleteItem");
  suprimer.addEventListener("click", function () {
    deleteArticle(leProduit._id);
  });

  let QteModele = 0;
  for (const [key, value] of Object.entries(lignes)) {
    QteModele += value;
  }
  const nombremodele = clone.querySelector("#qteArticles");
  nombremodele.textContent = QteModele;
  nombremodele.id = "qte_" + leProduit._id;
  const prixArticle = clone.querySelector("#prixArticle");
  prixArticle.textContent = formaterPrix(leProduit.price, QteModele);
  prixArticle.id = "prix_" + leProduit._id;
  prixArticle.value = leProduit.price;

  lesPrix[leProduit._id] = formaterPrix(leProduit.price, 1);
  total[0] += 1 * QteModele;
  total[1] += leProduit.price * QteModele;

  const lesLignes = clone.querySelector("#lesCouleurs");
  const fragLignes = ecrireLesLignes(leProduit, lignes);

  lesLignes.appendChild(fragLignes);

  fragmentArticle.appendChild(clone);
  return fragmentArticle;
}
function ecrireLesLignes(leProduit, lignes) {
  let fragmentSom = new DocumentFragment();
  //let qte = 0;
  for (const [color, qty] of Object.entries(lignes)) {
    fragmentSom.appendChild(
      ecrireUneLigne(
        leProduit._id,
        leProduit.price,
        color,
        leProduit.colors[color],
        qty
      )
    );
  }

  return fragmentSom;
}
function ecrireUneLigne(unId, pu, indicecolor, color, qty) {
  let fragment1 = new DocumentFragment();
  const cloneLigne = document.importNode(innerLigne.content, true);
  const arti = cloneLigne.querySelector("article");
  arti.id = `ligne_${unId}_${indicecolor}`;

  const uneCouleur = cloneLigne.querySelector("#laCouleur");
  uneCouleur.textContent = color;
  const uneQte = cloneLigne.querySelector(".qteLigneCde");
  uneQte.textContent = qty;
  uneQte.id = `inQte_${unId}_${indicecolor}`;

  const supprimer = cloneLigne.querySelector(".supLigne");
  supprimer.addEventListener("click", function () {
    modifQty(unId, indicecolor, 0);
  });
  const btM = cloneLigne.querySelector("#btonMoins");
  btM.addEventListener("click", function () {
    ajouterUn(unId, indicecolor, -1);
  });
  const btP = cloneLigne.querySelector("#btonPlus");
  btP.addEventListener("click", function () {
    ajouterUn(unId, indicecolor, 1);
  });
  const leInput = cloneLigne.querySelector(".itemQuantity");
  leInput.value = qty;

  leInput.id = `inQty_${unId}_${indicecolor}`;
  // console.log(`${color} qtés : ${qty}`);
  leInput.addEventListener("change", function () {
    checkModifQty(unId, indicecolor, this.value);
  });
  const leprix2 = cloneLigne.querySelector(".monPrixColor");
  leprix2.textContent = formaterPrix(pu, qty);
  leprix2.id = `lignePrix_${unId}_${indicecolor}`;

  fragment1.appendChild(cloneLigne);
  return fragment1;
}

// Export a Module
export { ecrirePanier, ecrireFormulaire, templateArticle };
