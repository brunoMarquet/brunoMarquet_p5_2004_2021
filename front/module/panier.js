function ecrireFormulaire(preRemplir, unClient) {
  let tt = "";
  let arrayKey = [];

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
  return [tt, arrayKey];
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
      console.log("Cde  : " + res.orderId);
      localStorage.setItem("orderId", res.orderId);
      window.location = "./confirmation.html";
    })
    .catch(function (error) {
      alert("Impossible d'envoyer la requête");
    });
}

export { ecrireFormulaire, valider };
