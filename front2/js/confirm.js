import * as moduleEdit from "../module/edition.mjs";

moduleEdit.ecrireHeaderFooter();

try {
  const Numcde = localStorage.getItem("orderId");
  console.log("type" + typeof Numcde);
  const innerH = document.getElementById("orderId");
  if (Numcde === undefined || Numcde === null || Numcde === void 0) {
    erreurCommance();
  } else {
    localStorage.removeItem("orderId");
    document.getElementById("orderId").innerHTML = "<br/>" + Numcde;
  }
} catch {
  erreurCommance();
}
function erreurCommance() {
  document.getElementsByClassName("confirmation")[0].innerHTML =
    "Desolé <br>il y a une erreur";
}
