$(() => {
    console.log("Ready")
    hentData();
    hentAvreiseDato();

})

// Hent data for rute
function hentData() {
    const id = window.location.search.substring(1);
    const url = "reise/enrute?" + id;
    $.get(url, function (ruter) {
        $("#fra").val(ruter.reiseFra)
        $("#til").val(ruter.reiseTil)
    })
}

// Hent avreise datoer
function hentAvreiseDato() {
    const id = window.location.search.substring(1);
    console.log(id)
    let url = "reise/avreisedato?" + id;
    $.get(url, function (data) {
        formaterAvreiseDato(data)
    })
}

// Formater avreise dato
function formaterAvreiseDato(avreiseDato) {
    let print = "";
    console.log("test")
    for (let dato of avreiseDato) {
        let datony = new Date(dato.avreiseTid);
        var datestring = moment(datony).format('')
        console.log(dato.avreiseTid)
        print += '<option>' +
            datony + '</option>'
    }
    $("#avreiseDato").html(print);
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

