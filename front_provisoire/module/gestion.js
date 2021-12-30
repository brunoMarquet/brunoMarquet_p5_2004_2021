let lePanier = JSON.parse(localStorage.getItem("panier")) ?? {};

function editErreur(erreur) {
  console.log("Ressource non trouvée, erreur : " + erreur);
}

function commander(leId, qte, couleur) {
  if (lePanier[leId]) {
    //modification
    if (lePanier[leId][couleur]) {
      const newQ = 1 * lePanier[leId][couleur] + qte;
      if (newQ > 0) {
        lePanier[leId][couleur] = newQ;
      } else {
        /* on delete le produit ou la ligne mais ici !
        les negatifs sont filtrés en amont donc on ne passe pas dans cette boucle */
        delete lePanier[leId][couleur];
        if (Object.keys(lePanier).length == 0) {
          delete lePanier[leID];
          if (lePanier == 0) {
            lePanier = {};
          }
        }
      }
    } else {
      // on ajoute une couleur
      lePanier[leId][couleur] = qte;
    }
  } else {
    //ajout un produit
    let ligne1 = {};
    lePanier[leId] = {}; // couleur: qte };
    lePanier[leId][couleur] = qte;
  }
  localStorage.setItem("panier", JSON.stringify(lePanier));

  if (lePanier[leId]) {
    return lePanier[leId];
  } else {
    return {};
  }
}

export { editErreur, commander, lePanier };