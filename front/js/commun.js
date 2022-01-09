/*quelques fonctions communes
 formatPrix(prix) : fonction perso  
 ou formatPrix1(prix) qui utilise le standart :
  Intl.NumberFormat("fr-FR", ...
*/
const maxProduit = 100;

function nombreValide1(qty) {
  if (Number.isInteger(qty * 1) && qty >= 0 && qty <= maxProduit) {
    return parseInt(qty);
  } else {
    return -1;
  }
}
//et =zero !
function nombreValide2(qty) {
  if (Number.isInteger(qty * 1) && qty >= 0) {
    return parseInt(qty);
  } else {
    return -1;
  }
}

function estValide(value, regle) {
  return regle.test(value);
}
/**fonction standart qui marche !
 * qui est appelée en formatPrix...
 */
function formatPrix__(prix) {
  prix = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(prix / 100);

  return prix;
}

/**___________________________________________ */

function formatPrix(prix) {
  /**pas prévu pour le million /100!
   * en centimes converit en €....
   */

  const millierSep = " ";
  const decimalSep = ",";
  let entier = parseInt(prix / 100);
  let decimal = prix % 100;
  let lesCent = decimalSep + decimal;
  if (decimal == 0) {
    lesCent = "";
  }
  if (decimal < 10) {
    lesCent = decimalSep + "0" + decimal;
  }

  decimal = decimal == 0 ? "" : decimalSep + decimal;

  entier = entier.toString();
  const nbrChiffre = entier.length - 3;

  if (nbrChiffre > 0) {
    entier =
      entier.slice(0, nbrChiffre) + millierSep + entier.slice(nbrChiffre);
  }
  return entier + lesCent + " €";
}
function editErreur(erreur) {
  console.log("Ressource non trouvée, erreur : " + erreur);
}
