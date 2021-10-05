$(() => {
    console.log("bestilline.js ready")
    hentData();
    setTimeout(totalpris, 500); // Beregn pris på onload

})

// Variabler
var barn_billett = 0;
var voksen_billett = 0;
var standard = 0;
var premium = 0;
var dagsreise = false;


function lagreData() {

    var today = new Date(); // Henter dagens dato
    validerEpost(); // Valider epost
    validerTelefonnr(); // Valider telefonnr
    validerFornavn();  // Valider fornavn
    validerEtternavn(); // Valider etternavn

    const bestilling = {
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefon: $("#telefon").val(),
        epost: $("#epost").val(),

        avreiseSted: $("#fra").val(),
        destinasjon: $("#til").val(),
        avreisetid: $('input[name="datoAvreise"]:checked').val(),

        antallBarn: $("#antallBarn").val(),
        antallVoksen: $("#antallVoksen").val(),
        antallStandLugar: $("#antallStandLugar").val(),
        antallPremLugar: $("#antallPremLugar").val(),
        datoBestilt: today.toISOString(),


        totalPris: $("#pris").val(),
    }

    console.log(bestilling)

    $.post("billett/lagre", bestilling, function (id) {
        console.log("Bestilling funket")
        window.location.href = "kvittering.html?id=" + id;
    });


}

// Hent data for rute
// Print html utifra dagstur true/false
function hentData() {
    const id = window.location.search.substring(1);
    const url = "reise/reiserute?" + id;
    $.get(url, function (ruter) {
        $("#fra").val(ruter.avreisested)
        $("#til").val(ruter.destinasjon)

        $("#fraText").html(`<h1>${ruter.avreisested}-</h1>`)
        $("#tilText").html(`<h1>${ruter.destinasjon}</h1>`)

        barn_billett = ruter.prisBarn;
        voksen_billett = ruter.prisVoksen;
        $("#barnbillett").html(barn_billett)
        $("#voksenbillettt").html(voksen_billett)

        if (ruter.dagstur == false) {
            standard = ruter.standardLugar;
            premium = ruter.premiumLugar;

            var print1 = '<div class="row">' +
                '<input readonly class="no-border col-2 text-center" type="number" value="1" min="0"' +
                'id="standLugarTeller" />' +
                '<p class="col-10  m-0">Standard Lugar(er)</p>' +
                '</div>' +
                '<div class="row">' +
                '<input readonly class="no-border col-2 text-center" type="number" value="0"' +
                'id="premLugarTeller" />' +
                '<p class="col-10  m-0">Premium Lugar(er)</p>' +
                '</div>';

            $("#luggarTrue").html(print1);

            var print2 = '<div id="lugarInformasjon" class="card mb-2 p-4">' +
                '<div class="card-body">' +
                '<h2 class="card-title ">Bestill lugar</h2>' +
                '<hr>' +
                '<div class="row mb-3">' +
                '<div class="col p-3">' +
                '<h4>Standard lugar</h4>' +
                '<p>' +
                'Commodorelugarene inkluderer en dobbeltseng med myke sengeklær, håndklær, bad med dusj og' +
                'toalett, hårføner, tilgang til wifi, flatskjerm-TV og herlig havutsikt.' +
                '</p>' +
                '<form class="needs-validation" novalidate="">' +
                '<div class="input-group">' +
                '<button type="button" onclick="fjernStandLugar()" class="btn btn-dark">' +
                '<i class="bi bi-dash"></i>' +
                '</button>' +
                '<input readonly id="antallStandLugar" type="number" min="1" value="1" class="form-control text-center"' +
                'placeholder="0" size="4">' +
                '<button type="button" onclick="leggTilStandLugar()" class="btn btn-dark">' +
                '<i class="bi bi-plus"></i>' +
                '</button>' +
                '</div>' +
                '<p class="card-text mt-3">' +
                '<small class="text-muted">' +
                'kr.  <span id="standardLuggarPris"></span>,- per lugar / 4 personer' +
                '</small>' +
                '</p>' +
                '</form>' +
                '</div>' +
                '<div class="col p-3 d-md-none d-sm-none d-lg-block">' +
                '<img style="object-fit: cover; height: 250px; width: 100%" class="img-fluid "' +
                'src="https://images.unsplash.com/photo-1600488999129-e49662f4020c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80"' +
                'alt="Responsive image">' +
                '</div>' +
                '</div>' +

                ' <div class="row  mb-4">' +
                '<div class="col p-3">' +
                '<h4>Premium lugar</h4>' +
                '<p>' +
                'Commodorelugarene inkluderer en dobbeltseng med myke sengeklær, håndklær, bad med dusj og' +
                'toalett, hårføner, tilgang til wifi, flatskjerm-TV og herlig havutsikt.' +
                '</p>' +
                ' <form class="needs-validation" novalidate="">' +
                '<div class="input-group">' +
                '<button type="button" onclick="fjernPremLugar()" class="btn btn-dark">' +
                '<i class="bi bi-dash"></i>' +
                '</button>' +
                '<input readonly id="antallPremLugar" type="number" min="0" class="form-control text-center"' +
                'value="0" size="4">' +
                '<button type="button" onclick="leggTilPremLugar()" class="btn btn-dark">' +
                '<i class="bi bi-plus"></i>' +
                '</button>' +
                '</div>' +
                '   <p class="card-text mt-3">' +
                '<small class="text-muted">' +
                'kr.  <span id="premiumLuggarPris"></span>,- per lugar / 4 personer' +
                '</small>' +
                '</p>' +
                '</form>' +
                '</div>' +
                ' <div class="col p-3 d-md-none d-sm-none d-lg-block">' +
                '<img style="object-fit: cover; height: 250px; width: 100%" class="img-fluid "' +
                'src="https://images.unsplash.com/photo-1587874522487-fe10e954d035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"' +
                'alt="Responsive image">' +
                '</div>' +
                '   </div>' +
                '</div>' +
                '</div>';
            $("#luggarinfo").html(print2);

            $("#standardLuggarPris").html(standard);
            $("#premiumLuggarPris").html(premium);

        } else if (ruter.dagsreise == true) {
            dagsreise = true;
        }
    })
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
    let barnPris = antallBarn * barn_billett;

    let antallVoksen = $("#voksenTeller").val();
    let voksenPris = antallVoksen * voksen_billett;

    let antallStandLugar = $("#standLugarTeller").val();
    let standLugar = antallStandLugar * standard;


    let antallPremLugar = $("#premLugarTeller").val();
    let premLugar = antallPremLugar * premium;

    let totalPris = barnPris + voksenPris + premLugar + standLugar;

    $("#pris").val(totalPris);
    $("#pris").html(totalPris);
}

