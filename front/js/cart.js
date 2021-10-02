let info_cli = [];
url = "http://localhost:3000/api/teddies/order";
edit_titre("votre panier");

info_cli = localStorage.getItem("info_client");
if (info_cli != "") {
  const itd = localStorage.item_del;
  ki_c = info_cli.split(itd);
  //alert(ki_c[4]);
  let Un_client = new client(ki_c[0], ki_c[1], ki_c[2], ki_c[3], ki_c[4]);
  Un_client.edit_form();
}

function client(nom, prenom, le_mail, ville, adresse) {
  this.nom = nom;
  this.prenom = prenom;
  this.le_mail = le_mail;
  this.ville = ville;
  this.adresse = adresse;

  this.edit_form = function () {
    document.getElementById("lastName").value = this.nom;
    document.getElementById("firstName").value = this.prenom;
    document.getElementById("email").value = this.le_mail;
    document.getElementById("city").value = this.ville;
    document.getElementById("address").value = this.adresse;
  };
  this.modif_client = function () {
    this.nom = document.getElementById("lastName").value;
    this.prenom = document.getElementById("firstName").value;
    this.le_mail = document.getElementById("email").value;
    this.ville = document.getElementById("city").value;
    this.adresse = document.getElementById("address").value;
  };
}

//nom + itd + prenom + itd + le_mail + itd + ville + itd + adresse
/*
let url = "http://localhost:3000/api/teddies/order"
/front/html/cart.html?firstName=Pierre-henry&lastName=Dupont-Telle&address=3+rue+des+Martyrs&city=Paris&email=dupont456%40gmail
        document.getElementById("lastName").value = ki_client[0];
        document.getElementById("firstName").value = ki_client[1];
        document.getElementById("email").value = ki_client[2];
        document.getElementById("address").value = ki_client[3];
        document.getElementById("city").value = ki_client[4];
        //rustine
        le_panier = localStorage.panier;
        */
