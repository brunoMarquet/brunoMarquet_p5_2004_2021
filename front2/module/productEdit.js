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
  image.src = leProduit.imageUrl;
  image.alt = leProduit.altTxt;
  titre.textContent = leProduit.name;
  prix.textContent = leProduit.price / 100;

  descript.textContent = leProduit.description;

  fragment1.appendChild(clone);
  return fragment1;
}
function editLignesCde(lesLines) {
  let texte = "";
  if (lesLines) {
    //const PrixUnit = leProd.price;
    // const colors = leProd.colors;
    texte = "Votre Commande :<ul>";
    let total = 0;

    for (const [color, qty] of Object.entries(lesLines)) {
      total += 1 * qty;
      texte += `<ol id ="ligne_${color}" >Qté : <span id="qty_${color}">${qty}</span> de couleur : ${colors[color]}  . </ol>`;
    }
    texte += `</ul>total : <span id="qty_totale">${total}</span>
     article(s), montant :<span id=prix_total> 
     ${((total * PrixUnit) / 100).toFixed(2)}
     </span> €.`;
  }
  document.getElementById("lesCdes").innerHTML = texte;
}
export { ecrireTemplate, editLignesCde };
