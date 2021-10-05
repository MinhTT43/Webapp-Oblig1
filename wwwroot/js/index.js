$(() => {
    console.log("index.js ready")
})


// Hent rute informasjon
const hentRuter = () => {
    validerKalender();

    if (validerKalender() == true) {
        $.get("Reise/Reiser", (data) => {
            console.log(data)
            formaterRuter(data);
        });
    }
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
                <button class="btn btn-cta m-0" onclick="hentReiser(${d.id})">Se reiser</button>
                </div>
            </div>
        </div>
        `;
        deck += card;
    }
    $("#ticketOffice").html(deck);
};

// Hent reise informasjon
const hentReiser = (id) => {
    var date = new Date($("#kalender").val());
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();


    

        url = `reise/valgtAvreisetid?id=${id}&day=${dd}&month=${mm}&year=${yyyy}`;
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
    console.log(data)
    print = '';

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

const getEntries = () => {
    let changeTitle = `
<h2 class="text-uppercase" style="font-weight: bold; color: #ff6600">Funnet reiser!</h2>
<h4 id="subtitle" class="pb-4">Velg en av disse destinasjonene</h4>   `;

    let ok = validerKalender();
    /*
       if (!ok) {
          console.log("false");
          return testCards();
       } else {
          location.hash = "#ticketFirst";
          $("#ticketOffice").append(testCards());
       }
      */
    location.hash = "#ticketFirst";
    $("#title").html(changeTitle);
    $("#ticketOffice").append(hentRuter());
};

const testDates = (id) => {
    let dates = `
<hr>
    <p>newDate</p>
    <p>newDate</p>
    <p>newDate</p>
    `;
    $("#tripDates" + id).html(dates);
};
