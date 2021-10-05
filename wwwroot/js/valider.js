$(() => {
    console.log("valider.js ready")
})
const validerFornavn = () => {
    let fornavn = $("#fornavn").val();
    let regex = /^[a-zA-ZæøåÆØÅ\.\ \-]{2,20}$/;
    let ok = regex.test(fornavn);
    if (!ok) {
        $("#errorFornavn").html("Fornavnet må bestå av 2-20 bokstaver");
        return false;
    } else {
        $("#errorFornavn").html("");
        return true;

    }
}

const validerEtternavn = () => {
    let etternavn = $("#etternavn").val();
    let regex = /^[a-zA-ZæøåÆØÅ\.\ \-]{2,20}$/;
    let ok = regex.test(etternavn);
    if (!ok) {
        $("#errorEtternavn").html("Etternavnet må bestå av 2-20 bokstaver");
        return false;
    } else {
        $("#errorEtternavn").html("");
        return true;
    }
}

//https://ihateregex.io/expr/phone/
// Eksempel tlf: +0047 12345678 evt. 12345678.
const validerTelefonnr = () => {
    let telefon = $("#telefon").val();
    let regex = /^[+]?[0-9]{2,4}?[-\s ]?[0-9]{6,8}$/;
    let ok = regex.test(telefon);
    if (!ok) {
        $("#errorTelefon").html("Telefonnummer må bestå av 6-12 tall");
        return false;
    } else {
        $("#errorTelefon").html("");
        return true;
    }
}

//https://ihateregex.io/expr/email/
// Eksempel epost: s1889010@oslomet.no
const validerEpost = () => {
    let epost = $("#epost").val();
    let regex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/
    let ok = regex.test(epost);
    if (!ok) {
        $("#errorEpost").html("Feil epost format.");
        console.log("error")
        return false;
    } else {
        $("#errorEpost").html("");
        return true;
    }
}

const validerPersoner = () => {
    let personer = $("#antallVoksen").val();
    if (personer <= 0) {
        $("#errorBillettinformasjon").html("Minst 1 voksen på denne reisen.");
        return false;
    } else {
        $("#errorBillettinformasjon").html("");
        return true;
    }
}


const validerLuggarPersonRatio = () => {
    var antallStand = parseInt($("#antallStandLugar").val());
    var antallPrem = parseInt($("#premLugarTeller").val());
    var antallBarn = parseInt($("#antallBarn").val());
    var antallVoksen = parseInt($("#antallVoksen").val());

    var personer = antallBarn + antallVoksen;
    var antallPlasser = (antallStand + antallPrem) * 4;

    if (parseInt(antallPlasser) < parseInt(personer)) {
        $("#errorPersonLuggar").html("For mange personer, trenger flere luggarer")
        return true;
    } else {
        return false;
    }
}

// Yoinked kode fra
// https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript

const validerKalender = () => {
    var dato = new Date($('#kalender').val());

    if (Object.prototype.toString.call(dato) === "[object Date]") {
        // it is a date
        if (isNaN(dato.getTime())) {  // d.valueOf() could also work
            console.log("Validation failed")
            return false
        } else {
            console.log("Validation true")
            return true
        }
    } else {
        console.log("VALIDATION FAILED")
        return false
    }

}
