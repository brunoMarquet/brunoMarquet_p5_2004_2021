const url1 = "http://localhost:3000/api/products/order";

let objetVerif = {};
/* cet objet est une suite de array de style:
[un regex=/^\d{5}$/ et un UnMessage="vous devez mettre votre codepostal" ]
objetVerif[key] = [valeur.leRegex, valeur.UnMessage];*/

/*********  ecrireFormulaire ***************
 */
//modifLeFormulaire

function ecrireFormulaire(preRemplir, unClient) {
  let text = "";
  for (let key in unClient) {
    if (unClient.hasOwnProperty(key)) {
      let valeur = unClient[key];
      objetVerif[key] = [valeur.leRegex, valeur.UnMessage];
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
  for (const [key, arrayVerif] of Object.entries(objetVerif)) {
    const regle = arrayVerif[0];
    const inner0 = document.getElementById(key);
    const valeur = inner0.value;

    const inner1 = document.getElementById(key + "ErrorMsg");

    if (estValide(valeur, regle)) {
      // console.log(valeur + "PARFAIT ok");
      inner1.innerHTML = "";
      inner0.style.backgroundColor = "green";
    } else {
      cptErreur++;
      inner1.innerHTML = arrayVerif[1];
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
      // localStorage.setItem("orderId", res.orderId);
      window.location = `./confirmation.html?idCommande=${res.orderId}`;
    })
    .catch(function (error) {
      alert("Impossible d'envoyer la requête");
    });
}

function valider_old(url, envoiPost) {
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
