//import * as myParam from "../module/parametres.js";

const url1 = "http://localhost:3000/api/products/order";
let objRegex = {};

/*********  ecrireFormulaire ***************
 */
//modifLeFormulaire

function ecrireFormulaire(preRemplir, unClient) {
  let text = "";
  for (let key in unClient) {
    if (unClient.hasOwnProperty(key)) {
      let valeur = unClient[key];
      objRegex[key] = valeur.regle;
      let lexemple = preRemplir == 1 ? "value='" + valeur.exemple + "'" : "";
      text += `<div class="cart__order__form__question">
        <label for="${key}">${valeur.entete}: </label>
       <input type="${valeur.type}" id="${key}" name="${key}" placeholder="${valeur.pholder}" ${lexemple} >
        <p id="${key}ErrorMsg"></p> `;
    }
  }
  return text;
}
/*********  ecrireFormulaire ***************
 */
function testOrder(lePanier) {
  event.preventDefault();
  let unContact = verifForm();
  if (
    Object.keys(unContact).length !== 0 &&
    Object.keys(lePanier).length !== 0
  ) {
    let products = [];
    for (const [unId, ligne] of Object.entries(lePanier)) {
      products.push(unId);
    }
    //console.log(JSON.stringify(products));
    const envoiPost = {
      contact: unContact,
      products: products,
    };
    //console.log(JSON.stringify(envoiPost));

    valider(url1, envoiPost);
  }
}

function verifForm() {
  let cptErreur = 0;
  let unContact = {};
  for (const [key, regle] of Object.entries(objRegex)) {
    const inner0 = document.getElementById(key);
    const valeur = inner0.value;

    const inner1 = document.getElementById(key + "ErrorMsg");

    if (estValide(valeur, key)) {
      // console.log(valeur + "PARFAIT ok");
      inner1.innerHTML = "";
      inner0.style.backgroundColor = "green";
    } else {
      cptErreur++;
      inner1.innerHTML = regle;
      inner0.style.backgroundColor = "red";
    }
    unContact[key] = valeur;
  }
  console.log("nbre erreur" + cptErreur);
  if (cptErreur == 0) {
    return unContact;
  } else {
    return {};
  }
}

function estValide(value, key) {
  let regle = /^[a-zA-Z]{1}[A-Za-z'àáâãäåçèéêëìíîïðòóôõöùúûüýÿ -._\s-]*$/;
  if (key == "city") {
    regle = /^\d{5}$/;
  }
  if (key == "address") {
    regle = /^[0-9]{1}[A-Za-z-0-9'àáâãäåçèéêëìíîïðòóôõöùúûüýÿ -._\s-]*$/;
    //([A-Z'àáâãäåçèéêëìíîïðòóôõöùúûüýÿ -._\s-])\w+/g;
  }
  if (key == "email") {
    regle = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  }
  return regle.test(value);
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

// Export a Module
export { ecrireFormulaire, testOrder };
