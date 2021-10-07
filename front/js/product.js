//prov
//cacb65d43b2b5c1ff70f3393ad1
//let url = "http://localhost:3000/back/product ";
//url = "http://localhost:3000/api/teddies/id/;
//retrieving the URL parameter

init_produit();

function init_produit() {
  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("id");

  url = "http://localhost:3000/api/teddies/" + product_id;

  //Product
  fetch(url, { method: "GET" })
    .then((data) => {
      return data.json();
    })
    .then((product) => {
      built_un_produit(product);
    })
    .catch(function (error) {
      edit_erreur(error);
    });

  //recup_panier();

  document.getElementById("header").innerHTML = ecrire_header();
  document.getElementById("footer").innerHTML = ecrire_footer();
}

function built_un_produit(ki) {
  edit_titre(ki.name);

  Le_produit = un_produit(ki);
  //let bloc_item = document.querySelector("item");
  let inner_2 = document.getElementsByTagName("article")[0];
  tt_option = "";
  nbre_color = Le_produit.couleurs.length;
  for (i = 0; i < nbre_color; i++) {
    koi = Le_produit.couleurs[i];
    tt_option += `<option value="${i}">${koi}</option>`;
  }

  tt = `<div class="item__img">
  <img src="${Le_produit.image}" alt="${Le_produit.alt_img}">
</div>
<div class="item__content">
<div class="item__content__titlePrice">
    <h1 id="title">${Le_produit.nom}</h1>
    <p>Prix : <span id="price">${Le_produit.prix}</span>€</p>
  </div>
<div class="item__content__description">
    <p class="item__content__description__title">Description :</p>
    <p id="description">${Le_produit.legende}</p>
  </div>
<div class="item__content__settings">
    <div class="item__content__settings__color">
      <label for="color-select">Choisir une taille :</label>
      <select name="color-select" id="colors">
          <option value=-1>--SVP, choisissez parmi ${nbre_color} couleurs  --</option>${tt_option}
 </select>
    </div>
    <div class="item__content__settings__quantity">
      <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
      <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
    </div>
  </div>
    <div class="item__content__addButton">
    <button id="addToCart">Ajouter au panier</button>
  </div>
  <div id="message_info"></div>
  <div id="message_erreur"></div>
</div>`;

  inner_2.innerHTML = tt;

  in_info1 = document.getElementById("message_erreur");
  document.getElementById("addToCart").addEventListener("click", ajout_panier);
}

function ajout_panier() {
  vtt = "";
  v_err = 0;

  qte = document.getElementById("quantity").value;
  couleur = document.getElementById("colors").value;
  if (qte == 0) {
    vtt += "Merci de choisir une quantité svp !<br>";
    v_err++;
  }
  if (couleur == -1) {
    vtt += "Merci de choisir la couleur svp !";
    v_err++;
  }

  if (v_err == 0) {
    //adeplacer
    //Le_produit.choix_couleur = couleur;
    // Le_produit.qty = qte;

    Le_produit.commander(qte, couleur);

    tt =
      qte +
      " " +
      Le_produit.nom +
      " de couleur " +
      couleur +
      " ajouté(s) à votre panier";
    in_info1.innerHTML = tt;

    /*num = localStorage.getItem("num_ligne_cde");
    num++;
    localStorage.setItem("cde." + num, Le_produit.id + "_" + qte + "_" + couleur);
    localStorage.settItem("num_ligne_cde", num);

    //inner_erreur.innerHTML = "";*/
  } else {
    //erreur

    v_err == 2 ? (pluriel = "s") : (pluriel = "");
    v1 = "Nous avons " + v_err + " problème" + pluriel + " :<br>" + vtt;
    in_info1.innerHTML = v1;

    //inner_erreur.innerHTML = vtt;
    //alert(vtt + " pas ok");
    //document.getElementById("mess_erreur").innerHTML = vtt;
  }
  //
}

/*
let basketProducts = JSON.stringify(newBasketObjects)

			//LocalStorage created with the object
			localStorage.setItem('basket', basketProducts) */
