import * as myHeader from "../module/header.js";
import * as myFooter from "../module/footer.js";

import * as myParam from "../module/parametres.js";
import * as myMetier from "../module/gestion.js";

initLeProduit();
let leProduit = "";
const page = "produit";
let estDansPanier = false;
let indicePanier = -1;
//let lesCdes = [];
//leProduit.listeLigneCde = [{}];
let lePanier = JSON.parse(localStorage.getItem("panier")) ?? [];

function initLeProduit() {
  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("id");
  const url = "http://localhost:3000/api/products/" + product_id;

  fetch(url, { method: "GET" })
    .then((data) => {
      return data.json();
    })
    .then((product) => {
      afficheProd(product);
    })
    .catch(function (error) {
      console.log(error);
      //  edit_erreur(error);
    });

  const chemin = window.location.pathname == "/front/index.html" ? "./" : "../";

  document.getElementById("header").innerHTML = myHeader.ecrireHeader(
    myParam.adresse,
    chemin
  );
  document.getElementById("footer").innerHTML = myFooter.ecrireFooter(
    myParam.adresse,
    chemin
  );
}
function afficheProd(unProduit) {
  leProduit = unProduit;
  document.title = leProduit.name;
  const fragment = myMetier.ecrireTemplate(leProduit);
  document.getElementById("theItem").appendChild(fragment);

  if (lePanier.length != 0) {
    for (let j = 0; j < lePanier.length; j++) {
      if (lePanier[j]._id == leProduit._id) {
        // veifier ou non la lig cde
        estDansPanier = true;
        indicePanier = j;
        leProduit.listeLigneCde = lePanier[j].listeLigneCde;
        //
        console.log(
          "ref.trouvée " +
            indicePanier +
            "nbre cde:" +
            lePanier[j].listeLigneCde.length
        );

        myMetier.afficheLignes(unProduit);
      }
    }
  }
  if (estDansPanier == false) {
    leProduit.listeLigneCde = [];
  }

  document.getElementById("addToCart").addEventListener("click", ajoutPanier);
  document.getElementById("myCheck").addEventListener("change", function () {
    myMetier.afficheLignes(unProduit);
  });
}

function ajoutPanier() {
  let vtt = "";
  let v_err = 0;
  const leMessage = document.getElementById("infoCde"); // bof

  const qte = document.getElementById("quantity").value;
  const couleur = document.getElementById("colors").value;
  if (Number.isInteger(qte) && qte > 0) {
    vtt += "Merci de choisir une quantité svp !<br>";
    //v_err++;
  }
  if (couleur == -1) {
    vtt += "Merci de choisir la couleur svp !";
    v_err++;
  }

  if (v_err == 0) {
    estDansPanier = commander(qte, couleur);
  } else {
    //erreur
    let pluriel, v1;

    v_err == 2 ? (pluriel = "s") : (pluriel = "");
    v1 = "Nous avons " + v_err + " problème" + pluriel + " :<br>" + vtt;
    leMessage.innerHTML = v1;
  }
}
function commander(qte, couleur) {
  //const d = new Date();
  // let temps = new Date().toLocaleString();
  const unId = leProduit.listeLigneCde.length + 1000;

  let b = new ligne_c(unId, new Date().toLocaleString(), qte, couleur);
  leProduit.listeLigneCde.push(b);
  if (estDansPanier == false) {
    lePanier.push(leProduit);
    estDansPanier = true;
  } else {
    if (indicePanier != -1) {
      lePanier[indicePanier].listeLigneCde = leProduit.listeLigneCde;
    } else {
      console.log("ERREUR " + leProduit.listeLigneCde.length);
    }
  }
  localStorage.setItem("panier", JSON.stringify(lePanier));
  myMetier.afficheLignes(leProduit);
}
function ligne_c(id, temps, qte, color) {
  (this._id = id), (this.qty = qte);
  this.color = color;
  this.temps = temps;
  console.log(
    "ref: " + this._id + "," + this.temps + "," + this.color + ", " + this.qty
  );
}
