$(() => {
    console.log("Ready")
    hentData();
    hentAvreiseDato();

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

function validering() {
    // Boolean validering for html.
}

// Hent data for rute
function hentData() {
    const id = window.location.search.substring(1);
    const url = "reise/reiserute?" + id;
    $.get(url, function (ruter) {
        $("#fra").val(ruter.avreisested)
        $("#til").val(ruter.destinasjon)

        $("#fraText").html(`<h1>${ruter.avreisested}</h1>`)
        $("#tilText").html(`<h1>${ruter.destinasjon}</h1>`)
    })
}

// Hent avreise datoer
function hentAvreiseDato() {
    const id = window.location.search.substring(1);
    console.log(id)
    let url = "reise/avreisetid?" + id;
    $.get(url, function (data) {
        formaterAvreiseDato(data)
        console.log("test")
    })
}


// Øker antall barn
function fjernBarn() {
    var kvantitet = $("#antallBarn").val();
    if (kvantitet > 0) {
        kvantitet--;
        $("#antallBarn").val(kvantitet);
    }
}

// Reduserer antall barn
function leggTilBarn() {
    var kvantitet = $("#antallBarn").val();
    kvantitet++;
    $("#antallBarn").val(kvantitet);
}


// Øker antall voksne
function fjernVoksen() {
    var kvantitet = $("#antallVoksen").val();
    if (kvantitet > 0) {
        kvantitet--;
        $("#antallVoksen").val(kvantitet);
    }
}

// Reduserer antall voksne
function leggTilVoksen() {
    var kvantitet = $("#antallVoksen").val();
    kvantitet++;
    $("#antallVoksen").val(kvantitet);
}

// Øker antall luggarer
function fjernLuggar() {
    var kvantitet = $("#antallLuggar").val();
    if (kvantitet > 0) {
        kvantitet--;
        $("#antallLuggar").val(kvantitet);
    }
}

// Reduserer antall luggarer
function leggTilLuggar() {
    var kvantitet = $("#antallLuggar").val();
    kvantitet++;
    $("#antallLuggar").val(kvantitet);
}

// Formatering*

function formaterAvreiseDato(avreiseDato) {
    console.log(avreiseDato);
}