// Variabler
var idTracker;

$(() => {
    console.log("index.js ready")

})

// Gå videre
function videre() {

    let avreiseId = $('input[name="datochecked"]:checked').val();

    window.location.href = "bestilling.html?id=" + avreiseId;
}

// Hent rute informasjon 
const hentRuter = () => {
    validerKalender();

    if (validerKalender() == true) {
    }
    $.get("Reise/Reiser", (data) => {
        console.log(data)
        formaterRuter(data);
    });

    let changeTitleHTML = `
    <h2 class="text-uppercase" style="font-weight: bold; color: #ff6600">Reiser funnet!</h2>
    <h4 id="subtitle" class="pb-4">Velg en av disse destinasjonene</h4>   
    <button class="btn btn-cta" type="button" onclick="formaterAvreiseDato()">TEST</button>
    <hr>
    `;

    $("#title").html(changeTitleHTML);

}

// Formater reiseruter som printes i HTML
const formaterRuter = (data) => {
    let deck = "";

    for (d of data) {
        deck += `
        <div class="col-lg-4 col-md-6 mb-2 ">
            <div class="card fade-in-card">
                <div class="card-body">
                <h5 href="#" class="" style="color: black; font-weight: bold;">
                <span id="avreiseSted">${d.avreisested}</span>
                <span> - </span>
                <span id="avreiseDestinasjon">${d.destinasjon}</span>
                </h5>
                <div id="tripDates${d.id}"></div>
                <div id="avreisetid${d.id}" class="row p-3"></div>
                <button class="btn btn-cta btn-sm m-0" onclick="hentReiserTider(${d.id})">Se reiser</button>
                </div>
            </div>
        </div>
        `
    }

    deck += `<div><button class="btn btn-cta btn-sm m-0" onclick="videre()">Videre</button></div>`

    $("#title").html(deck);
    document.location.hash = "#ticketFirst"
};

// Hent reise informasjon
const hentReiserTider = (id) => {
    idTracker = id;

    var date = new Date($("#kalender").val());
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    url = `reise/valgtAvreisetid?id=${id}&day=${dd}&month=${mm}&year=${yyyy}`;


    $.get(url, (data) => {
        formaterReiseDato(data)
    })

};

function formaterReiseDato(datoListe) {

    const måneder = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni'
        , 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];

    const dager = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];

    console.log(datoListe)

    let printDato = `<div class="btn-group-vertical" role="group" aria-label="Basic radio toggle button group">`;

    for (var dato of datoListe) {

        if (dato != null) {
            let enDato = new Date(dato.avreisetid);
            let månedIndex = enDato.getMonth();
            let dagIndex = enDato.getDay();
            let time = enDato.getHours();
            let minutter = enDato.getMinutes();
            let måned = måneder[månedIndex];
            let dag = dager[dagIndex];
            let dagdato = enDato.getDate();


            printDato += ` 
            <input type="radio" class="btn-check" name="datochecked" id="btnradio${dato.avreiseId}" autocomplete="off" value="${dato.avreiseId}">
            <label class="btn btn-outline-primary col-lg-12 " for="btnradio${dato.avreiseId}">${dag}, ${dagdato}.${måned}</label>`
        }

        print += `</div>`

        $(`#avreisetid${idTracker}`).html(printDato);

    }

}

const testDates = (id) => {
        let dates = `
            <hr>
            <p>newDate</p>
            <p>newDate</p>
            <p>newDate</p>
            `;
        $("#tripDates" + id).html(dates);
    }
;
const showCalendar = () => {
    //HTML for inputboks
    let visibleHTML = `
        <input id="kalender2" type="date" class="form-control " value=""
        placeholder="Date">
        `;

    if ($("#tur").is(':checked')) {
        $("#calendarDiv").html(visibleHTML);

    } else {
        $("#calendarDiv").html("");
        $("#kalender2").val("");
    }

}
