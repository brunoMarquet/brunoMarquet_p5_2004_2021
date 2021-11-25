const adresse = {
  nom: "kanap",
  tel: "01 23 45 67 89",
  mail: "support@name.com",
  ville: "Paris 19",
  adresse: "101 quai de la CharenteLIBRE",
  credit:
    "© Copyright 2021 - 2042 | Openclassrooms by Openclassrooms | All Rights Reserved | Powered by &lt;3",
  latitude: 48.82,
  longitude: 2.29,
  messageMail: "Vous_avez_besoin_d_un_crédit",
};

const unClient = {
  firstName: {
    type: "string",
    entete: "Votre prénom",
    pholder: "mettre son prénom SVP.. ",
    regle: "/[^1-9]/g;",
    exemple: "Jean - Michel",
  },
  lastName: {
    type: "string",
    entete: "Votre nom, merci",
    pholder: "il nous faut un nom .. ",
    regle: "/[^1-9]/g;",
    exemple: "Valjean",
  },
  address: {
    type: "string",
    entete: " Votre adresse",
    pholder: "Merci de renseigner votre adresse.. ",
    regle: "/[^1-9]/g;",
    exemple: "148 rue des Martyrs",
  },
  city: {
    type: "integer",
    entete: "Votre code postal",
    pholder: "Ca alors ! vous avez un code postal SVP ?",
    regle: "^[w-.]+@([w-]+.)+[w-]{2,4}$/",
    exemple: 75019,
  },
  email: {
    type: "email",
    entete: "Votre émail ",
    pholder: "vous devez bien avoir un MAIL !",
    regle: "^[w-.]+@([w-]+.)+[w-]{2,4}$/",
    exemple: "jeanValjean222@free.fr",
  },
};
/* let contact = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
}; */

export { adresse, unClient };
