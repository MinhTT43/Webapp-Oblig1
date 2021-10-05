$(() => {
    console.log("index.js ready")
    hentRuter();
})


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
    $("#title").html(changeTitle);

}

const formaterRuter = (data) => {
    let deck = "";

    for (d of data) {
        let card = `
        <div class="col-lg-4 col-md-6 mb-2 ">
            <div class="card fade-in-card">
                <img class="card-img-top card-img-cover  d-none d-sm-block" style="height: 150px;"
                src="https://images.unsplash.com/photo-1543169108-32ac15a21e05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80"
                alt="Card image cap card-img-cover">
                <div class="card-body">
                <h5 href="#" class="" style="color: black; font-weight: bold;">
                <span id="avreiseSted">${d.avreisested}</span>
                <span> - </span>
                <span id="avreiseDestinasjon">${d.destinasjon}</span>
                </h5>
                <div id="tripDates${d.id}"></div>
                </div>
                <div class="card-footer">
                <button class="btn btn-cta btn-sm m-0" onclick="hentReiser(${d.id})">Se reiser</button>
                </div>
            </div>
        </div>
        `;
        deck += card;
    }
    window.location.hash = "#ticketFirst";
    $("#ticketOffice").html(deck);
};

// Hent reise informasjon
const hentReiser = (id) => {
    var date = new Date($("#kalender").val());
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    url = `reise/valgtAvreisetid?id=${id}&day=${dd}&month=${mm}&year=${yyyy}`;
    url = `reise/valgtAvreisetid?id=1&day=29&month=9&year=2021`;

    $.get(url, (data) => {
        console.log(data)
    })

};

const formaterReiser = () => {

};


// Hent avreise informasjon

function hentDato(id) {
    var date = new Date($('#datoinput').val());
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    let url = "reise/valgtAvreisetid?" + id + "&day=" + day + "&month=" + month + "&year=" + year;
    $.get(url, function (data) {
        console.log(data)
        formaterAvreiseDato(data);
    })
}

function formaterAvreiseDato(data) {
    let print
    `
    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" checked>
    <label className="btn btn-outline-primary" htmlFor="btnradio1">Radio 1</label>
    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off">
    <label className="btn btn-outline-primary" htmlFor="btnradio2">Radio 2</label>
    <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off">
    <label className="btn btn-outline-primary" htmlFor="btnradio3">Radio 3</label>
    </div>
    `;

    const måneder = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni'
        , 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']
    const dager = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']

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
            '<label><input type="radio" value="' + dato.avreisetid + '" name="datoAvreise"/>' + '<p>' +
            dag + "<br> " + dagdato + "." + måned + '</p></label></div>'
    }

    $("#printAvreise").html(print);

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

const showDate = () => {
        //HTML for inputboks
        let visibleHTML = `
    <div class="col-4"></div>
    <div class="col-5">
    <input id="kalender2" type="date" class="form-control " value=""
    placeholder="Date">
    </div>
    `;

        if ($("#tur").is(':checked')) {
            $("#calendarDiv").html(visibleHTML);

        } else {
            $("#calendarDiv").html("");
            $("#kalender").val("");
        }

    }
;