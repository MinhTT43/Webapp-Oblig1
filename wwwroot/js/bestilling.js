$(() => {
   console.log("bestilline.js ready")
   hentData();


})

// Lagre data for rute
function lagreData() {
   const bestilling = {
      fornavn: $("#fornavn").val(),
      etternavn: $("#etternavn").val(),
      telefon: $("#telefon").val(),
      epost: $("#epost").val(),

      avreiseSted: $("#avreisested").val(),
      destinasjon: $("#destinasjon").val(),
      avreisetid: $("#avreisetid").val(),

      antallBarn: $("#antallBarn").val(),
      antallVoksen: $("#antallVoksen").val(),
      antallStandLugar: $("#antallStandLugar").val(),
      antallPremLugar: $("#antallPremLugar").val(),

      totalPris: $("#totalPris").val(),
   }

   $.post("Bestilling/LagreData", bestilling, function (OK) {
      if (validering) {
         window.location.href = "kvittering.html";
      } else {
         $("#feilMelding").html("Feil oppsto, prøv igjen senere.");
      }
   });
}

// Hent data for rute

function hentData() {
   const id = window.location.search.substring(1);
   const url = "reise/reiserute?" + id;
   $.get(url, function (ruter) {
      $("#fra").val(ruter.avreisested)
      $("#til").val(ruter.destinasjon)

      $("#fraText").html(`<h1>${ruter.avreisested}-</h1>`)
      $("#tilText").html(`<h1>${ruter.destinasjon}</h1>`)
   })
}

// Hent avreise datoer
function getDate() {

   const id = window.location.search.substring(1);

   let date = new Date($('#datoinput').val());
   let day = date.getDate();
   let month = date.getMonth() + 1;
   let year = date.getFullYear();


   let url = "reise/valgtAvreisetid?" + id + "&day=" + day + "&month=" + month + "&year=" + year;
   $.get(url, function (data) {
      console.log(data)
      formaterAvreiseDato(data);
   })
}


function formaterAvreiseDato(data) {
   console.log(data)
   print = '';

   const måneder = [
      'Januar',
      'Februar',
      'Mars',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Desember'
   ]

   const dager = [
      'Søndag',
      'Mandag',
      'Tirsdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lørdag'
   ]


   for (var dato of data) {
      let enDato = new Date(dato.avreisetid);
      let månedIndex = enDato.getMonth();
      let dagIndex = enDato.getDay();
      let time = enDato.getHours();
      let minutter = enDato.getMinutes();
      let måned = måneder[månedIndex];
      let dag = dager[dagIndex];
      let dagdato = enDato.getDate();


      print += '<div class="col-lg-3 card p-4 my-3 text-center hover">' +
            '<label><input type="radio"/>' + '<p>' +
            dag + "<br> " + dagdato + "." + måned + '</p></label></div>'
   }

   $("#printAvreise").html(print);
}


// Øker antall barn
function fjernBarn() {
   let kvantitet = $("#antallBarn").val();
   if (kvantitet > 0) {
      kvantitet--;
      $("#antallBarn").val(kvantitet);
      $("#barnTeller").val(kvantitet);
      totalpris();
   }
}

// Reduserer antall barn
function leggTilBarn() {
   let kvantitet = $("#antallBarn").val();
   kvantitet++;
   $("#antallBarn").val(kvantitet);
   $("#barnTeller").val(kvantitet);
   totalpris();
}


// Øker antall voksne
function fjernVoksen() {
   let kvantitet = $("#antallVoksen").val();
   if (kvantitet > 0) {
      kvantitet--;
      $("#antallVoksen").val(kvantitet);
      $("#voksenTeller").val(kvantitet);
      totalpris();
   }
}

// Reduserer antall voksne
function leggTilVoksen() {
   let kvantitet = $("#antallVoksen").val();
   kvantitet++;
   $("#antallVoksen").val(kvantitet);
   $("#voksenTeller").val(kvantitet);
   totalpris();
}

// Øker antall luggarer
function fjernPremLugar() {
   let kvantitet = $("#antallPremLugar").val();
   if (kvantitet > 0) {
      kvantitet--;
      $("#antallPremLugar").val(kvantitet);
      $("#premLugarTeller").val(kvantitet);
      totalpris();
   }
}

// Reduserer antall luggarer
function leggTilPremLugar() {
   let kvantitet = $("#antallPremLugar").val();
   kvantitet++;
   $("#antallPremLugar").val(kvantitet);
   $("#premLugarTeller").val(kvantitet);
   totalpris();
}

function fjernStandLugar() {
   let kvantitet = $("#antallStandLugar").val();
   if (kvantitet > 0) {
      kvantitet--;
      $("#antallStandLugar").val(kvantitet);
      $("#standLugarTeller").val(kvantitet);
      totalpris();
   }
}

// Reduserer antall luggarer
function leggTilStandLugar() {
   let kvantitet = $("#antallStandLugar").val();
   kvantitet++;
   $("#antallStandLugar").val(kvantitet);
   $("#standLugarTeller").val(kvantitet);
   totalpris();
}

// Beregn pris
function totalpris() {

   let antallBarn = $("#barnTeller").val();
   let barnPris = antallBarn * 490;

   let antallVoksen = $("#voksenTeller").val();
   let voksenPris = antallVoksen * 990;

   let antallStandLugar = $("#standLugarTeller").val();
   let standLugar = antallStandLugar * 1290;


   let antallPremLugar = $("#premLugarTeller").val();
   let premLugar = antallPremLugar * 1990;

   let totalPris = barnPris + voksenPris + premLugar + standLugar;

   $("#pris").html(totalPris);
}

