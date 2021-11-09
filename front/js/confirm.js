import * as myHeader from "../module/header.js";
import * as myFooter from "../module/footer.js";
import * as myParam from "../module/parametres.js";

const chemin = window.location.pathname == "/front/index.html" ? "./" : "../";

document.getElementById("header").innerHTML = myHeader.ecrireHeader(
  myParam.adresse,
  chemin
);
document.getElementById("footer").innerHTML = myFooter.ecrireFooter(
  myParam.adresse,
  chemin
);

try {
  const Numcde = localStorage.getItem("orderId");
  if (Numcde === undefined || Numcde === null || Numcde === void 0) {
    alert("ERRRROR");
  } else {
    localStorage.removeItem("orderId");

    document.getElementById("orderId").innerHTML = "<br/>" + Numcde;
  }

  // noSuchVariable; // try...catch gère l'erreur!
} catch {
  alert("error is caught here!");
}
