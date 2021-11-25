function ligneCommande(id, qte, color, temps) {
  this._id = id;
  this.qty = qte;
  this.color = color;
  this.temps = temps;
  console.log(
    "ref: " + this._id + "," + this.temps + "," + this.color + ", " + this.qty
  );
}
function afficheLigne(unProduit) {
  console.log("afficheLigne");

  return "";
}

function titi() {
  console.log("2222222222222___RRRRRRR");
}

export { titi, afficheLigne };
