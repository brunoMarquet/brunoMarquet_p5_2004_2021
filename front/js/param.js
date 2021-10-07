//init_param();

let color_json =
  '{"--main-color":"#3498db","--secondary-color": "#2c3e50","--text-color": "#3d4c68","--footer-text-color": "#a6b0b3","--footer-main-color": " #3d424f","--footer-secondary-color": " #2d2f3e"}';
let color_array = [];
let color_obj = JSON.parse(color_json);
let param_array = [];
/*aa =
  " © Copyright 2021 - 2042 | Openclassrooms by Openclassrooms | All Rights Reserved | Powered by &lt;3";
let coord_json =
  '{"tel":"01 23 45 67 89","mail":"support@name.com<","ville":"Paris 19","adresse":"10 quai de la charente","copyrigt"="© Copyright 2021 - 2042 | Openclassrooms by Openclassrooms","info__address"="46,46"}';
//JSON.parse(color_json);*/

function edit_Parametres() {
  tt = "";

  for (let key in Parametres) {
    if (Parametres.hasOwnProperty(key)) {
      param_array.push(key);
      valeur = Parametres[key];
      // console.log(key, valeur);
      tt +=
        '<label for="' +
        key +
        '">' +
        key +
        ' : <input type="text" name="' +
        key +
        '", id="' +
        key +
        '" value="' +
        valeur +
        '"/></label><br/>';
    }
  }
}
function save_Parametres() {
  vm = param_array.length;
  for (i = 0; i < vm; i++) {
    key = param_array[i];
    valeur = document.getElementById(key).value;
    if (Parametres.hasOwnProperty(key)) {
      // param_array.push(key);
      Parametres[key] = "toto" + valeur;
    }
  }
  localStorage.setItem("coordonnes", JSON.stringify(Parametres));
}

tt = "";
for (let key in color_obj) {
  if (color_obj.hasOwnProperty(key)) {
    color_array.push(key);
    valeur = color_obj[key];

    tt +=
      "<div id='param_color'> " +
      key +
      "<input type='color' id='" +
      key +
      "' value='" +
      valeur +
      "' /> </div>";
    //onchange='coloriser("+key+","+this.value+")'
  }
}
edit_Parametres();
document.getElementById("change_color").innerHTML = tt;
document.getElementById("change_coord").innerHTML = "";
function init_param() {
  edit_titre("paramètres kanap");

  //let = tab = "";
}
function changer_color() {
  tt = "";
  //alert("ii");
  vm = color_array.length;
  for (let i = 0; i < vm; i++) {
    clef = color_array[i];
    valeur = document.getElementById(clef).value;
    //console.log(clef + " : " + valeur);
    document.documentElement.style.setProperty(clef, valeur);
  }
}
