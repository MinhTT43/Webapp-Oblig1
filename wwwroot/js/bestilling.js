

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


