/*__________________________
_________TEST
____________
*/

contact = {
  firstName: "Pierre-henry",
  lastName: "Dupont-Telle2",
  address: "3 rue des martyrs,Paris",
  city: "75019",
  email: "dupont456@gmail.com",
};
let listProd = [];
listProd[0] = leProduit._id;

const request = {
  contact: contact,
  products: listProd,
};
let url = "http://localhost:3000/api/products/order";
console.log(request);

const options = {
  method: "POST",
  body: JSON.stringify(request),
  headers: {
    "Content-Type": "application/json",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((res) => {
    let order = JSON.stringify(res);

    console.log(order);
  })
  .catch(function (error) {
    alert("problemo  :" + error);
  });
