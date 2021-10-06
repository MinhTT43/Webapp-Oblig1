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

    // Konvert DateTime
    let enDato = new Date(d.datoBestilt);
    let månedIndex = enDato.getMonth();
    let dagIndex = enDato.getDay();
    let time = enDato.getHours();
    let minutter = enDato.getMinutes();
    let måned = måneder[månedIndex];
    let dag = dager[dagIndex];
    let dagdato = enDato.getDate();
    let år = enDato.getFullYear();

    let print = ""; // string som printes i HTML

    print += `        <div class="border border-primary p-5">
            <h1 class="my-3 py-3 border-bottom">Oppsummering</h1>
            <div class="row">
                <div class="col-lg-10">
                    <p>Destinasjon :</p>
                    <h1>${d.avreisested} → ${d.destinasjon}</h1>
                </div>
                <div class="col-lg-2 position-relative">
                    <div class="position-absolute bottom-0 end-0">
                        <p class="m-0 p-0">Dato bestilt : ${dagdato}.${måned}.${år} Kl.${time}:${minutter}</p>
                    </div>
                </div>
            </div>
            <div class="d-flex my-4">
                <div>
                    <p>Fornavn :</p>
                    <h3>${d.fornavn}</h3>
                </div>
                <div class="mx-5">
                    <p>Etternavn :</p>
                    <h3>${d.etternavn}</h3>
                </div>
            </div>
            <div class="my-4 row">
                <div class="col-lg-6">
                    <p>Person(er) :</p>
                    <div>
                        <h3>Barn → ${d.antallBarn} </h3>
                    </div>
                    <div>
                        <h3>Voksen(e) → ${d.antallVoksen}</h3>
                    </div>
                </div>
                <div class="col-lg-6">
                    <p>Luggar(er) :</p>
                    <div>
                        <h3>Standard luggar → ${d.antallStandLugar}</h3>
                    </div>
                    <div>
                        <h3>Standard luggar → ${d.antallPremLugar}</h3>
                    </div>
                </div>
            </div>
            <div class="border-top row">
                <div class="my-4 col-lg-6">
                    <h2>Totalbeløp </h2>
                </div>
                <div class="col-lg-6 position-relative">
                    <div class="position-absolute end-0 my-4 ">
                        <h2>Kr.${d.totalPris},-</h2>
                    </div>
                </div>
            </div>
        </div>`

    $("#kvitteringPrint").html(print);
}

