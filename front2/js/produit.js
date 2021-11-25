import * as moduleEdit from "../module/edition.mjs";
//import * as myMetier from "../module/gestion.js";

initLeProduit();
let leProduit = "";
//const page = "produit";
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

  moduleEdit.ecrireHeaderFooter();
}
function afficheProd(unProduit) {
  leProduit = unProduit;
  leProduit.listeLigneCde = [];
  document.title = leProduit.name;

  const fragment = moduleEdit.ecrireTemplate(leProduit);
  document.getElementById("theItem").appendChild(fragment);

  if (lePanier.length != 0) {
    for (let j = 0; j < lePanier.length; j++) {
      if (lePanier[j]._id == leProduit._id) {
        estDansPanier = true; // redondant ???
        indicePanier = j;
        leProduit.listeLigneCde = lePanier[j].listeLigneCde;
        console.log(
          "ref " + indicePanier + "nbre cde:" + lePanier[j].listeLigneCde.length
        );
        moduleEdit.afficheLignes(unProduit);
      }
    }
  }
  if (estDansPanier == false) {
    // leProduit.listeLigneCde = [];
  }

  document.getElementById("addToCart").addEventListener("click", ajoutPanier);
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
    // estDansPanier = commander(qte, couleur);
    commander(qte, couleur);
  } else {
    //erreur
    let pluriel, v1;
    v_err == 2 ? (pluriel = "s") : (pluriel = "");
    v1 = "Nous avons " + v_err + " problème" + pluriel + " :<br>" + vtt;
    leMessage.innerHTML = v1;
  }
}
function commander(qte, couleur) {
  //let b = new ligne_c(qte, couleur);
  //leProduit.listeLigneCde.push(b);
  if (estDansPanier == false) {
    let b = new ligne_c(qte, couleur);
    leProduit.listeLigneCde.push(b);
    lePanier.push(leProduit);
    estDansPanier = true;
    indicePanier++; // pas certain!!!
  } else {
    if (indicePanier != -1) {
      let newCommande = false;
      let indice = -1;
      for (ligne of leProduit.listeLigneCde) {
        indice++;
        if (couleur == ligne.color) {
          newCommande = true;
          ligne.qy += 1 * qte;
          if (ligne.qy > 0) {
            leProduit.listeLigneCde[indice] = ligne;
          } else {
            leProduit.listeLigneCde.splice(indice, 1);
            //efacer
          }
        }
      }

      if (newCommande == false) {
        let b = new ligne_c(qte, couleur);
        leProduit.listeLigneCde.push(b);
      }

      lePanier[indicePanier].listeLigneCde = leProduit.listeLigneCde;
    } else {
      console.log("ERREUR " + leProduit.listeLigneCde.length);
    }
  }
  localStorage.setItem("panier", JSON.stringify(lePanier));
  moduleEdit.afficheLignes(leProduit);
}
function ligne_c(qte, color) {
  // this._id = id;
  this.qty = qte;
  this.color = color;
  console.log(this.color + ", " + this.qty);
}
