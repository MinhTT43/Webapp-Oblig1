/*-----Variabler------*/
/*-----Variabler------*/

var idTracker = 0;
const måneder = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni'
    , 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];
const dager = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag'
    , 'Lørdag'];
var turRetur = false;
var datoFram;
var datoTilbake;

/*-----Funksjoner------*/
/*-----Funksjoner------*/

// On-page-load
$(() => {
    console.log("index.js ready")
})

// Gå videre til bestilling 
const videreTilBestilling = () => {
    var valgtDato = new Date($('input[name="datochecked"]:checked').val())
    console.log(valgtDato)

    if (isNaN(valgtDato)) {
        $("#errorNeste").html("Mangler valg av dato");
    } else {
        $("#errorNeste").html("");
        window.location.href = "bestilling.html?id=" + idTracker;
    }
}

// Videre for å velge returdato
const velgReturDato = () => {

}

// Hent rute informasjon
const hentRuter = () => {

    // Sjekk om det er en-veis-tur  
    if (turRetur == false) {
        validerKalender();
        if (validerKalender() == true) {
            $.get("Reise/Reiser", (data) => {
                console.log(data)
                formaterRuter(data);
            })
                .fail(() => {
                    $("#errorDato").html("Ingen reiser funnet!")
                })
        }
    }
    // Sjekk om det er to-veis-tur
    else if (turRetur == true) {
        validerKalender2();
        if (validerKalender2() == true) {
            $.get("Reise/Reiser", (data) => {
                console.log(data)
                formaterRuter(data);
            });
        }
    }
}

// Formater reiseruter som printes i HTML 
const formaterRuter = (data) => {
    let deck = "";
    let printTittel = `
    <h2 class="text-uppercase" style="font-weight: bold; color: #ff6600">Reiser funnet!</h2>
    <h4 id="subtitle" class="pb-4">Du vil få reisevalg baser på dato valgt over.</h4>`;

    for (d of data) {
        deck += `
        <div class="col-lg-4 col-md-6 mb-2 ">
            <div class="card fade-in-card">
                <div class="card-body">
                <h5 href="#" class="text-center" style="color: black; font-weight: bold;">
                <span id="avreiseSted">${d.avreisested}</span>
                <span> - </span>
                <span id="avreiseDestinasjon">${d.destinasjon}</span>
                </h5>
                <div id="tripDates${d.id}" hidden></div>
                <div id="avreisetid${d.id}" class="row p-3">
                <button class="btn btn-cta m-0" onclick="hentReiserTider(${d.id})">Se reiser</button>
                </div>
                </div>
            </div>
        </div>
        `
    }

    if (turRetur == false) {
        deck += `<div><button class="btn btn-cta btn-lg" onclick="videreTilBestilling()" style="width: 150px">Neste</button></div>
                <p id="errorNeste" style="color: red"></p>
                `
    } else if (turRetur == true) {
        deck += `<div><button class="btn btn-cta btn-sm m-0" onclick="velgReturDato()">Velg retur dato</button></div>`
    }

    $("#billettTittel").html(printTittel);
    $("#billettBoks").html(deck);
    $("#ticketFirst")[0].scrollIntoView();

};

// Hent reise informasjon for en-veis-reiser 
const hentReiserTider = (id) => {
    idTracker = id;

    var date = new Date($("#kalender").val());
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    url = `reise/valgtAvreisetid?id=${id}&day=${dd}&month=${mm}&year=${yyyy}`;
    $.get(url, (data) => {
        formaterEnVeiReiseDato(data)
    })
        .fail((data) => {
            $("#errorNeste").html(data)
        })

};

function formaterEnVeiReiseDato(datoListe) {
    let printDato = `<div class="btn-group-vertical" role="group" aria-label="Basic radio toggle button group">`;

    for (var dato of datoListe) {

        // Sjekk om dato er null 
        if (dato != null) {
            // Konvert DateTime
            let enDato = new Date(dato.avreisetid);
            let månedIndex = enDato.getMonth();
            let dagIndex = enDato.getDay();
            let time = enDato.getHours();
            let minutter = enDato.getMinutes();
            let måned = måneder[månedIndex];
            let dag = dager[dagIndex];
            let dagdato = enDato.getDate();

            // HTML som skal printes 
            printDato += ` 
            <input type="radio" class="btn-check" name="datochecked" id="btnradio${dato.avreiseId}" autocomplete="off" value="${dato.avreisetid}">
            <label class="btn btn-outline-primary col-lg-12 " for="btnradio${dato.avreiseId}">${dag}(${dagdato}.${måned})</label>
            `;
        }
    }

    printDato += `</div>`
    $(`#avreisetid${idTracker}`).html(printDato);
}

function formaterToVeisDato(datoListe) {

}