//Products recovery
fetch(url, { method: "GET" })
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    built(products);
  })
  .catch(function (error) {
    edit_erreur(error);
  });
