// Import *
import * as myModule from "./editHtml.js";

const Coord = {
  nom: "kanap",
  tel: "01 23 45 67 89",
  mail: "support@name.com",
  ville: "Paris 19",
  adresse: "10 quai de la Charente",
  credit:
    "© Copyright 2021 - 2042 | Openclassrooms by Openclassrooms | All Rights Reserved | Powered by &lt;3",
  latitude: 48.82,
  longitude: 2.29,
  messageMail: "Vous_avez_besoin_d_un_crédit",
};
//alert(myModule.ecrireFooter(Coord));
//document.getElementById("header").innerHTML = ecrireHeader(Coord);
document.getElementById("header").innerHTML = myModule.ecrireHeader(Coord);
document.getElementById("footer").innerHTML = myModule.ecrireFooter(Coord);
