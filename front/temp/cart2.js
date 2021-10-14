//resource https://regex101.com/
/*
caractere :/[abc]+/g
pas de chiffre "/[^1-9]/g;";
int <100:^[1-9][0-9]?$|^100$
*/
let url1 = "http://localhost:3000/api/teddies/order";
let arrayKey = [];

let preRemplir = 1;
let listProd = ["cacb65d43b2b5c1ff70f3393ad1"];

let contact = {
  firstName: "",
  lastName: "",
  address: "3",
  city: "",
  email: "",
};

const unClient = {
  firstName: {
    type: "string",
    entete: "Votre prénom",
    pholder: "mettre son prénom SVP.. ",
    regle: "/[^1-9]/g;",
    exemple: "Jean - Michel",
  },
  lastName: {
    type: "string",
    entete: "Votre nom, merci",
    pholder: "il nous faut un nom .. ",
    regle: "/[^1-9]/g;",
    exemple: "Valjean",
  },
  address: {
    type: "string",
    entete: " Votre adresse",
    pholder: "merci de renseigner votre adresse.. ",
    regle: "/[^1-9]/g;",
    exemple: "14 rue des Martyrs",
  },
  city: {
    type: "integer",
    entete: "Votre code postal",
    pholder: "Ca alors ! vous avez un code postal ?",
    regle: "^[w-.]+@([w-]+.)+[w-]{2,4}$/",
    exemple: 75019,
  },
  email: {
    type: "email",
    entete: "Votre email ",
    pholder: "vous devez avoir un MAIL !",
    regle: "^[w-.]+@([w-]+.)+[w-]{2,4}$/",
    exemple: "jeanValjean222@free.fr",
  },
};

init_cart();

function init_cart() {
  let info_cli = [];

  //edit_titre("votre panier");

  //info_cli = localStorage.getItem("contact");
  //if (info_cli != "") {
  //unClient = JSON.parse(info_cli);
  aa = document.getElementById("truc");
  tt = "";

  for (let key in unClient) {
    if (unClient.hasOwnProperty(key)) {
      valeur = unClient[key];
      arrayKey.push(key);
      let lexemple = preRemplir == 1 ? "value='" + valeur.exemple + "'" : "";
      tt += `<div class="cart__order__form__question">
        <label for="${key}">${valeur.entete}: </label>
       <input type="${valeur.type}" id="${key}" name="${key}" placeholder="${valeur.pholder}" 
       onchange="verif(' /^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/')" ${lexemple} >
        <p id="${key}ErrorMsg">${valeur.pholder}</p>

        `;
    }
  }

  aa.innerHTML = tt;

  //document.getElementById("order").addEventListener("click", order_panier);
  //if(){'<input type="checkbox" id="condtions_acept" name="vehicle1" value="accepter nos conditions'/>}
}
function razForm() {
  patt = /[^1-9]/g;
  //var result = patt.test(str);
  // alert(patt.test("Hello world!89"));
  const vm = arrayKey.length;
  for (i = 0; i < vm; i++) {
    document.getElementById(arrayKey[i]).value = "";
  }
}
//function valder() {}
function controleValeur(value) {
  let regle = /[^1-9]/g;
  regle = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (regle.test(value)) {
    return true;
  } else {
    return false;
  }
}

function test_order() {
  //console.log("test " + controleValeur("jeanValjean222@free.fr"));
  let vm = arrayKey.length;
  let cpterreur = 0;
  for (let i = 0; i < vm; i++) {
    key = arrayKey[i];
    valeur = document.getElementById(key).value;
    let inner1 = document.getElementById(key + "ErrorMsg");
    //console.log(key + "ErrorMsg");
    if (contact.hasOwnProperty(key)) {
      //console.log(valeur + " : " + controleValeur(valeur));
      if (controleValeur(valeur)) {
        console.log(valeur + "ok");
        inner1.innerHTML = "PARFAIT";
        contact.key = valeur;
      } else {
        contact.key = "pas défini";
        inner1.innerHTML = "C'est FAUX";
      }

      console.log(key + " ; " + contact.key);
      //valider(contact, listProd);
    }
  }
  //localStorage.setItem("contact", JSON.stringify(contact));
}

function valider() {
  fetch(url1, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(contact, listProd),
  })
    .then((res) => {
      alert(res);
    })
    .catch(function (error) {
      myModProduit.editErreur(error);
    });
}
//event.stopPropagation();
/*  console.log("panier");
  vm = arrayKey.length;
  for (i = 0; i < vm; i++) {
    console.log(i);
  }
} */
