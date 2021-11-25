function ecrireFormulaire(preRemplir, unClient) {
  let text = "";
  let arrayKey = [];

  for (let key in unClient) {
    if (unClient.hasOwnProperty(key)) {
      let valeur = unClient[key];
      // console.log("mon t " + key);
      arrayKey.push(key);
      let lexemple = preRemplir == 1 ? "value='" + valeur.exemple + "'" : "";
      text += `<div class="cart__order__form__question">
        <label for="${key}">${valeur.entete}: </label>
       <input type="${valeur.type}" id="${key}" name="${key}" placeholder="${valeur.pholder}" ${lexemple} >
        <p id="${key}ErrorMsg">${valeur.pholder}</p> `;
    }
  }
  return [text, arrayKey];
}
function valider(url, envoiPost) {
  const options = {
    method: "POST",
    body: JSON.stringify(envoiPost),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((res) => {
      //let order = JSON.stringify(res);
      //console.log(order);
      // console.log("Cde  : " + res.orderId);
      localStorage.setItem("orderId", res.orderId);
      window.location = "./confirmation.html";
    })
    .catch(function (error) {
      alert("Impossible d'envoyer la requête");
    });
}
/* */

function refactoriserCde(lePanier) {
  let indexPanier = -1;
  let ligCommande = [];
  let qtyByColor = [];
  let qtyCommand = 0;
  for (const leProduit of lePanier) {
    indexPanier++;
    qtyCommand = 0;
    let numColor = -1;
    ligCommande = [];
    qtyByColor = [];

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
      // ce sont donc des valeurs calculée redondantes !
      qtyCommand += 1 * qtyCo;
      qtyByColor.push(qtyCo);
      ligCommande.push(arrayColor);
    }
    //restitution
    leProduit.qtyCommand = qtyCommand;
    leProduit.qtyByColor = qtyByColor;
    leProduit.ligCommande = ligCommande;
    lePanier[indexPanier] = leProduit;
  }
  return lePanier;
}

function templateArticle(leProduit, indexPanier) {
  let fragmentArticle = new DocumentFragment();
  let template = document.getElementById("templateCde");
  const clone = document.importNode(template.content, true);
  const arti = clone.querySelector("article");
  arti.id = "article_" + indexPanier;
  const retour = clone.querySelector("#revoirProduit");
  retour.textContent = "<= " + leProduit.name;
  retour.href = "./produit.html?id=" + leProduit._id;
  const nom = clone.querySelector("h2");
  nom.textContent = leProduit.name;
  nom.id = leProduit._id;

  const prixArticle = clone.querySelector("#prixArticle");
  prixArticle.textContent = (
    (leProduit.qtyCommand * leProduit.price) /
    100
  ).toFixed(2);
  prixArticle.id = "prix_" + indexPanier;

  const qteArticle = clone.querySelector("#qteArticle");
  qteArticle.textContent = leProduit.qtyCommand;
  qteArticle.id = "qte_" + indexPanier;
  const image = clone.querySelector("img");
  image.src = leProduit.imageUrl;
  image.alt = leProduit.altTxt;

  const prix = clone.querySelector(".cart__item__content__titlePrice p");
  prix.textContent = leProduit.price / 100 + " €.(PU.)";

  const c = indexPanier;
  const suprimer = clone.querySelector(".deleteItem");
  //suprimer.textContent = "Supprimer tout (qte : " + totalQte + "),";
  suprimer.addEventListener("click", function () {
    supprimArticle(c);
  });

  fragmentArticle.appendChild(clone);
  return fragmentArticle;
}

export { refactoriserCde, templateArticle, ecrireFormulaire, valider };
