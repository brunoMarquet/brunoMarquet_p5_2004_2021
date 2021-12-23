function nombreValide(qty) {
  if (qty > 0 && Number.isInteger(qty * 1)) {
    return parseInt(qty);
  } else {
    return -1;
  }
}
//et =zero !
function nombreValide2(qty) {
  if (qty >= 0 && Number.isInteger(qty * 1)) {
    return parseInt(qty);
  } else {
    return -1;
  }
}

function formaterPrix(qte, pu) {
  return ((qte * pu) / 100).toFixed(2);
}
