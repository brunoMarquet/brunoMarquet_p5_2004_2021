let Les_produits; //s = new lesCanapes();
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
/* 
function afficheLignes(leProduit) {
  if (document.getElementById("myCheck").checked == true) {
    afficheLignes_2(leProduit);
  } else {
    afficheLignes_1(leProduit);
  }
} 

function afficheLignes(leProduit) {
  let texte = "Votre Commande;<ul>";
  let total = 0;
  //for (let i = 0; i < leProduit.listeLigneCde.length; i++) {
  for (let b of leProduit.listeLigneCde) {
    //let b = leProduit.listeLigneCde[i];

    total += 1 * b.qty;

    texte += `<ol>Qté : ${b.qty} couleur : ${
      leProduit.colors[b.color]
    }  . </ol>`;
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
} */

export { editErreur };
