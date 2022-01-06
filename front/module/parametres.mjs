/**
 * l'object "unClient" permet d'ecrire et de valider le form.
 * on tire partie du html fournis -tres "structuré"-pour boucler à partir de cet objet
 * 
 *  pour city: {type: "number",
  pour limiter la saisie à des chiffres? */
const unClient = {
  firstName: {
    type: "string",
    entete: "Votre prénom !",
    pholder: "mettre son prénom SVP.. ",
    leRegex: /^[a-zA-Z]{1}[A-Za-z'àáâãäåçèéêëìíîïðòóôõöùúûüýÿ -._\s]*$/,
    UnMessage:
      "Votre prénom ne peut pas contenir de chiffres ou des signes tel que (, ° +} et doit commencer par une lettre non accentuée etc ...",
    exemple: "Jean - Mi.chel 14",
  },
  lastName: {
    type: "string",
    entete: "Votre nom, merci",
    pholder: "il nous faut un nom .. ",
    leRegex: /^[a-zA-Z]{1}[A-Za-z'àáâãäåçèéêëìíîïðòóôõöùúûüýÿ -._\s]*$/,
    UnMessage:
      "Votre nom ne peut pas contenir de chiffres ou de signes tel que (, ° +} etc ...",
    exemple: "Vaàéùl.jean-titi hùe_ìíî",
  },
  address: {
    type: "string",
    entete: " Votre adresse qui doit commencer par un chiffre",
    pholder: "Merci de renseigner votre adresse.. ",
    leRegex: /^[0-9]{1}[A-Za-z-0-9'àáâãäåçèéêëìíîïðòóôõöùúûüýÿ -._\s-]*$/,
    UnMessage: "Votre adresse ... doit commencer par un chiffre",
    exemple: "A148 rue des Martyrs",
  },
  city: {
    type: "number",
    entete: "Votre code postal (5 chiffres exactement!)",
    pholder: "Ca alors ! vous avez un code postal SVP ?",
    leRegex: /^\d{5}$/,
    UnMessage: " code postal doit etre composé de 5 chiffres exactement !",
    exemple: 75019,
  },
  email: {
    type: "email",
    entete: "Votre émail ",
    pholder: "vous devez bien avoir un MAIL !",
    leRegex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    UnMessage: "cet adresse mail n'est pas valide",
    exemple: "jeanValjean222@free.fr",
  },
};
export { unClient };
