const måneder = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni'
    , 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];

const dager = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];

$(() => {
    console.log("kvittering.js => ok");
    hentBillett();
})

const hentBillett = () => {


    var innUrl = new URL(window.location.href);

    const params = new URLSearchParams(innUrl.search)


    const url = "billett/billett?id=" + params.get('id'); // url med id

    $.get(url, (data) => { // hent billett fra databasen
        formaterKvittering(data);
    })
        .fail(function () {

            print = `        <div class="text-center vh-75">
            <h2 class="text-danger">
            <i class="bi bi-emoji-dizzy"></i> Oops!<br> 
            Det har oppstått en feil. <br>
            Vennligst kontakt kundeservice</h2>
            </div>`

            $("#kvitteringPrint").html(print);
        })
}

const formaterKvittering = (d) => {

    let d_best = new Date(d.datoBestilt);
    let d_best_mnd_index = d_best.getMonth();
    let d_best_dag_index = d_best.getDay();
    let d_best_time = d_best.getHours();
    let d_best_minutter = d_best.getMinutes();
    let d_best_mnd = måneder[d_best_mnd_index];
    let d_best_dag = dager[d_best_dag_index];
    let d_best_dd = d_best.getDate();
    let d_best_yyyy = d_best.getFullYear();


    let a_best = new Date(d.avreisetid);
    let a_best_mnd_index = a_best.getMonth();
    let a_best_dag_index = a_best.getDay();
    let a_best_time = a_best.getHours();
    let a_best_minutter = a_best.getMinutes();
    let a_best_mnd = måneder[a_best_mnd_index];
    let a_best_dag = dager[a_best_dag_index];
    let a_best_dd = a_best.getDate();
    let a_best_yyyy = a_best.getFullYear();

    let print = ""; // string som printes i HTML

    print += `        <div class="shadow-none p-3 mb-5 bg-light rounded p-5">
            <h1 class="my-3 py-3 border-bottom">Oppsummering (Kvittering)</h1>
            <div class="row">
                <div class="col-lg-8 col-md-12">
                    <p class="m-0 p-0">Destinasjon :</p>
                    <h1>${d.avreisested} → ${d.destinasjon}</h1>
                    <p class="fw-bold">Avreise - 
                            ${a_best_dd} .${a_best_mnd}
                             Kl.${a_best_time}:${a_best_minutter} </p>
                </div>
                <div class="col-lg-4 col-md-12 position-relative">
                    <div class=text-center"">
                        <p class="m-0 py-3 fw-bold text-end">Dato bestilt <br>
                              ${d_best_dd} .${d_best_mnd}
                             Kl.${d_best_time}:${d_best_minutter}</p>
                    </div>
                </div>
            </div>
            <div class="d-flex my-4">
                <div>
                    <p class="m-0 p-0">Fullt navn :</p>
                    <h3>${d.fornavn} ${d.etternavn}</h3>
                </div>
            </div>
            <div class="my-4 row">
                <div class="col-lg-6">
                    <p class="m-0 p-0">Person(er) :</p>
                    <div>
                        <h3>Barn x ${d.antallBarn} </h3>
                    </div>
                    <div>
                        <h3>Voksen(e) x ${d.antallVoksen}</h3>
                    </div>
                </div>
                <div class="col-lg-6">
                    <p>Luggar(er) :</p>
                    <div>
                        <h3>Standard luggar x ${d.antallStandLugar}</h3>
                    </div>
                    <div>
                        <h3>Premium luggar x ${d.antallPremLugar}</h3>
                    </div>
                </div>
            </div>
            <div class="border-top row">
                <div class="my-4 col-lg-6">
                    <h2>Totalbeløp : </h2>
                </div>
                <div class="col-lg-6 position-relative">
                    <div class="position-absolute end-0 my-4 ">
                        <h2>Kr. ${d.totalPris},-</h2>
                    </div>
                </div>
            </div>
        </div>`

    $("#kvitteringPrint").html(print);
}

