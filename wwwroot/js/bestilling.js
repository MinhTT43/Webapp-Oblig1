// Variabler
var prisBarn = 0;
var prisVoksen = 0;
var prisStandardLuggar = 0;
var prisPremiumLuggar = 0;
var erDagsreise = false;
var reiseruteNr;
const måneder = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni'
    , 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];

const dager = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag'
    , 'Lørdag'];

$(() => {
    console.log("bestilline.js ready")
    hentData();
    setTimeout(totalpris, 500);
})

// Post-kall for å lagre billetten i db     
function lagreData() {
    console.log(erDagsreise)

    validerEpost();
    validerTelefonnr();
    validerFornavn();
    validerEtternavn();
    validerPersoner();

    if (erDagsreise == false) {
        validerLuggarPersonRatio();
        if (validerEpost() == true && validerTelefonnr() == true
            && validerFornavn() == true && validerEtternavn() == true &&
            validerLuggarPersonRatio() == true && validerPersoner() == true) {
            funksjonLagreBestilling();
        }
    } else if (erDagsreise == true) {
        if (validerEpost() == true && validerTelefonnr() == true
            && validerFornavn() == true && validerEtternavn() == true && validerPersoner() == true) {
            funksjonLagreBestilling();
        }

    }
}

const funksjonLagreBestilling = () => {

    var today = new Date();

    // Oppretter bestilling objekt
    const bestilling = {

        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefon: $("#telefon").val(),
        epost: $("#epost").val(),

        avreiseSted: $("#fraHidden").val(),
        destinasjon: $("#tilHidden").val(),
        avreisetid: $("#dato").val(),

        antallBarn: $("#antallBarn").val(),
        antallVoksen: $("#antallVoksen").val(),
        antallStandLugar: $("#antallStandLugar").val(),
        antallPremLugar: $("#antallPremLugar").val(),
        datoBestilt: today.toISOString(),

        totalPris: $("#prisHidden").val(),
    }

    console.log(bestilling)

    $.post("billett/lagre", bestilling, function (id) {
        window.location.href = "kvittering.html?id=" + id
    })
        .fail(function () {
            $("#errorFailHTML").html("Feil oppstod vennligst prøv igjen!")
        });
}


// Hente informasjon som skal printes til HTML-siden
function hentData() {


    const id = window.location.search.substring(1);
    const url = "reise/reiserute?" + id;

    // Hent informasjon om reiseruten 
    $.get(url, function (ruter) {

        reiseruteNr = ruter.ruteNr

        $("#fraText").html(`${ruter.avreisested}`)
        $("#tilText").html(`${ruter.destinasjon}`)
        $("#fra").html(`<h1>${ruter.avreisested}-</h1>`)
        $("#til").html(`<h1>${ruter.destinasjon}</h1>`)
        $("#fraHidden").val(ruter.avreisested);
        $("#tilHidden").val(ruter.destinasjon);
        prisBarn = ruter.prisBarn;
        prisVoksen = ruter.prisVoksen;

        $("#barnbillett").html(prisBarn)
        $("#voksenbillettt").html(prisVoksen)

        if (ruter.dagstur == false) {

            prisStandardLuggar = ruter.standardLugar;
            prisPremiumLuggar = ruter.premiumLugar;

            $("#luggarOversiktHTML").html(luggarOversiktHTML);
            $("#luggarInfoHTML").html(luggarInfoHTML);

            $("#standardLuggarPris").html(prisStandardLuggar);
            $("#premiumLuggarPris").html(prisPremiumLuggar);

        } else {
            erDagsreise = true;
            console.log(erDagsreise)
        }
    })

    // Hent avreisetiden
    const url2 = "reise/avreise?" + id;
    $.get(url2, function (data) {

        // Konverter DateTime
        let enDato = new Date(data.avreisetid);
        let månedIndex = enDato.getMonth();
        let dagIndex = enDato.getDay();
        let time = enDato.getHours();
        let minutter = enDato.getMinutes();
        let måned = måneder[månedIndex];
        let dag = dager[dagIndex];
        let dagdato = enDato.getDate();

        var avreiseDatoHTML = `${dag} (${dagdato} .${måned}) <br>
                                Kl. ${time}.${minutter}`

        $("#datoPrint").html(avreiseDatoHTML);
        $("#dato").val(data.avreisetid);

        console.log($("#dato").val())

        console.log(data.rute.dagstur)

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
    let barnPris = antallBarn * prisBarn;

    let antallVoksen = $("#voksenTeller").val();
    let voksenPris = antallVoksen * prisVoksen;

    let antallStandLugar = $("#standLugarTeller").val();
    let standLugar = antallStandLugar * prisStandardLuggar;


    let antallPremLugar = $("#premLugarTeller").val();
    let premLugar = antallPremLugar * prisPremiumLuggar;

    let totalPris = barnPris + voksenPris + premLugar + standLugar;


    $("#pris").html(totalPris);
    $("#prisHidden").val(totalPris);
}


// HTML-kode som printes ut på html-doc
var luggarOversiktHTML = '<div class="row">' +
    '<input readonly class="no-border col-2 text-center" type="number" value="1" min="0"' +
    'id="standLugarTeller" />' +
    '<p class="col-10  m-0">Standard Lugar(er)</p>' +
    '</div>' +
    '<div class="row">' +
    '<input readonly class="no-border col-2 text-center" type="number" value="0"' +
    'id="premLugarTeller" />' +
    '<p class="col-10  m-0">Premium Lugar(er)</p>' +
    '</div>';

var luggarInfoHTML = '<div id="lugarInformasjon" class="card mb-4 p-4">' +
    '<div class="card-body">' +
    '<h2 class="card-title fw-bold"><i class="bi bi-columns"></i> Bestill lugar</h2>' +
    '<hr>' +
    '<div class="row mb-3">' +
    '<div class="col p-3">' +
    '<h4 class="fw-bold">Standard lugar</h4>' +
    '<p>' +
    'Commodorelugarene inkluderer en dobbeltseng med harde sengeklær, håndklær, bad uten dusj og ' +
    'toalett.' +
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
    '<img style="object-fit: cover; height: 220px; width: 100%" class="img-fluid "' +
    'src="https://images.unsplash.com/photo-1600488999129-e49662f4020c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80"' +
    'alt="Responsive image">' +
    '</div>' +
    '</div>' +

    ' <div class="row  mb-4">' +
    '<div class="col p-3">' +
    '<h4 class="fw-bold">Premium lugar</h4>' +
    '<p>' +
    'Commodorelugarene inkluderer en dobbeltseng med myke sengeklær, håndklær, bad med dusj og ' +
    'toalett.' +
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
    '<img style="object-fit: cover; height: 220px; width: 100%" class="img-fluid "' +
    'src="https://images.unsplash.com/photo-1587874522487-fe10e954d035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"' +
    'alt="Responsive image">' +
    '</div>' +
    '   </div>' +
    '</div>' +
    '</div>';

var luggarDisabledHTML = `
    <div id="luggarInfoHTML">
    <div id="lugarInformasjon" class="card mb-4 p-4">
    <div class="card-body">
    <h2 class="card-title class="fw-bold">Bestill lugar</h2><hr> </div>
    </div>
    </div>`;
