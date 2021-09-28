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
        
    }
    
}

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

    let print = `
                <div class="card-title text-muted">Velg reisedato</div>
                <select class="form-select" aria-label="Default select example ">
                <option selected>Velg en dato</option>
                `;
    console.log("test")
    for (let dato of avreiseDato) {
        let enDato = new Date(dato.avreiseTid);
        let månedIndex = enDato.getMonth();
        let dagIndex = enDato.getDay();
        let time = enDato.getHours();
        let minutter = enDato.getMinutes();
        let måned = måneder[månedIndex];
        let dag = dager[dagIndex];

        print += `<option value="${dato.avreiseDato}"> ${dag}, ${dagIndex} ${måned}. </option>`;
    }
    print += `
            </select>
            </div>
            `;
    
    $("#printDato").html(print);
}