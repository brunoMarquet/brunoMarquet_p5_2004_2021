const unClient = {
  firstName: {
    type: "string",
    entete: "Votre prénom !",
    pholder: "mettre son prénom SVP.. ",
    regle:
      "Votre prénom ne peut pas contenir de chiffres ou de sigle tel que (, ° +} etc ...",
    exemple: "Jean - Michel 148",
  },
  lastName: {
    type: "string",
    entete: "Votre nom, merci",
    pholder: "il nous faut un nom .. ",
    regle:
      "Votre nom ne peut pas contenir de chiffres ou de sigle tel que (, ° +} etc ...",
    exemple: "Vaàéùl.jean-titi hùe",
  },
  address: {
    type: "string",
    entete: " Votre adresse qui doit commencer par un chiffre",
    pholder: "Merci de renseigner votre adresse.. ",
    regle: "Votre adresse ... doit commencer par un chiffre",
    exemple: "A148 rue des Martyrs",
  },
  city: {
    type: "integer",
    entete: "Votre code postal (5 chiffres exactement)",
    pholder: "Ca alors ! vous avez un code postal SVP ?",
    regle: " code postal doit etre composé de 5 chiffres exactement !",
    exemple: 75019,
  },
  email: {
    type: "email",
    entete: "Votre émail ",
    pholder: "vous devez bien avoir un MAIL !",
    regle: " l'email n'est pas valide",
    exemple: "jeanValjean222@free.fr",
  },
};
export { unClient };
