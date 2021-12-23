/*Edition index */
let templateProduit = document.getElementById("produitTemplate");
function ecrireListe(listeProduit) {
  console.log("Index :  " + listeProduit.length);
  let fragmentSom = new DocumentFragment();
  for (let element of listeProduit) {
    fragmentSom.appendChild(ecrireUnProduit(element));
  }
  return fragmentSom;
}

function ecrireUnProduit(element) {
  let fragment1 = new DocumentFragment();
  const clone = document.importNode(templateProduit.content, true);
  const lien = clone.querySelector("a");
  const nom = clone.querySelector("h3");
  const image = clone.querySelector("img");
  const descript = clone.querySelector("p");
  image.src = element.imageUrl;
  image.alt = element.altTxt;
  lien.href = "pages/produit.html?id=" + element._id;
  nom.textContent = element.name;
  descript.textContent = element.description;
  fragment1.appendChild(clone);
  return fragment1;
}
/*Fin Edition index */
export { ecrireListe };
