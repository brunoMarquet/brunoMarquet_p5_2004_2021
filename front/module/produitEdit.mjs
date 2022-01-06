let colors = [];
let PrixUnit = 0;

function ecrireTemplate(leProduit) {
  /* on renseigne les constantes */
  PrixUnit = leProduit.price;
  colors = leProduit.colors;
  /* fin  */

  let fragment1 = new DocumentFragment();
  let template = document.getElementById("templateArticle");
  const clone = document.importNode(template.content, true);

  const image = clone.querySelector("img");
  const titre = clone.querySelector("h1");
  const prix = clone.querySelector("#price");
  const descript = clone.querySelector("#description");
  let select = clone.querySelector("select");
  for (let i = 0; i < leProduit.colors.length; i++) {
    let choix = document.createElement("option");
    choix.textContent = leProduit.colors[i];
    choix.value = i;
    select.appendChild(choix);
  }

  // if (lesLignes) {
  //   let lesCdes = clone.querySelector("#lesCdes");
  //   lesCdes = editLignesCde(lesLignes);
  // }

  image.src = leProduit.imageUrl;
  image.alt = leProduit.altTxt;
  titre.textContent = leProduit.name;

  prix.textContent = formatPrix(leProduit.price);

  descript.textContent = leProduit.description;

  fragment1.appendChild(clone);
  // console.log(fragment1);
  return fragment1;
}

function editLignesCde(lesLines) {
  const htmlCde = document.getElementById("lesCdes");
  htmlCde.innerHTML = "";

  let total = 0;
  let fragment1 = new DocumentFragment();
  let template = document.getElementById("templateLines");
  const clone = document.importNode(template.content, true);

  const ulListe = clone.querySelector("ul");
  for (const [color, qty] of Object.entries(lesLines)) {
    total += 1 * qty;
    let line = document.createElement("li");
    line.textContent = `Qté : ${qty}, de couleur : ${colors[color]} .`;
    ulListe.appendChild(line);
  }

  const lesQte = clone.querySelector("#qte_totale");
  lesQte.textContent = total;
  const prixTotal = formatPrix(total * PrixUnit);
  const leTotal = clone.querySelector("#prix_total");
  leTotal.textContent = prixTotal;

  fragment1.appendChild(clone);

  //document.getElementById("lesCdes").appendChild(fragment1);

  htmlCde.appendChild(fragment1);
}

function actuQty(qty) {
  document.getElementById("itemQuantity").value = qty;
}
function razLignes() {
  document.getElementById("lesCdes").innerHTML = "";
}
export { ecrireTemplate, editLignesCde, actuQty, razLignes };
