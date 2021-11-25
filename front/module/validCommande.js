function titi() {
  console.log("TTIIIITT");
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

function test_order() {
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

export { titi, valider, test_order };
