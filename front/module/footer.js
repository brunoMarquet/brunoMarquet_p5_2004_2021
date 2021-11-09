function ecrireFooter(Coord, chemin) {
  const tt = `

      <div class="limitedWidthBlockContainer footerMain">
        <div class="limitedWidthBlock">
          <div>
            <img
              class="logo"
              src="${chemin}images/logo.png"
              alt="Logo de l'entreprise${Coord.nom} "
            />
          </div>
          <div>
            <p>${Coord.adresse}<br />${Coord.ville}</p>
          </div>
          <div>
            <p>Téléphone : ${Coord.tel}</p>
          </div>
          <div>
          <p><a href="mailto:${Coord.mail}?subject=:${Coord.messageMail}">Email :${Coord.mail}</a></p>
          </div>
        </div>
      </div>
      <div class="limitedWidthBlockContainer footerSecondary">
        <div class="limitedWidthBlock">
        ${Coord.credit}
          </p>
        </div>
      </div>
    
`;
  return tt;
}

// Export a Module
export { ecrireFooter };
