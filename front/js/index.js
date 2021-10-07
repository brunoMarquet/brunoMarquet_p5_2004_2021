//Products recovery
let inner_1 = document.getElementById("items");
let txt_dyn_1 = "";
init_index();

function init_index() {
  fetch(url, { method: "GET" })
    .then((data) => {
      return data.json();
    })
    .then((products) => {
      built(products);
    })
    .catch(function (error) {
      edit_erreur(error);
    });

  //document.getElementsByName("footer")[0]).innerHTM = "tt";
  document.getElementById("header").innerHTML = ecrire_header();
  document.getElementById("footer").innerHTML = ecrire_footer();
}
