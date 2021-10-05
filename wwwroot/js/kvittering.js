$(() => {
    console.log("kvittering.js => ok");
    hentBillett();
})

const hentBillett = () => {

    const id = window.location.search.substring(1); // hent id

    const url = "billett/billett?" + id; // url med id

    $.get(url, (data) => { // hent billett fra databasen
        formaterKvittering(data);
    })
}

const formaterKvittering = (d) => {

    let print = ""; // string som printes i HTML

    print += `<div class="border border-primary py-3 px-5">
            <h1 class="my-3 py-3 border-bottom">Oppsummering</h1>
            <div class="row my-3">
                <div class="col-lg-6">
                    <small>Destinasjon :</small>
                    <h1>${d.avreisested} → ${d.destinasjon}</h1>
                </div>
                <div class="col-lg-6 position-relative">
                    <div class="position-absolute bottom-0 end-0">
                        <p class="m-0 p-0">Dato bestilt : ${d.datoBestilt}</p>
                    </div>
                </div>
            </div>

            <small class="mt-5"> Navn : </small>
            <h3>${d.fornavn} ${d.etternavn}</h3>

            <br />

            <p>Barn : ${d.antallBarn}</p>
            <p>Voksen : ${d.antallVoksen}</p>
            <p>Standard luggar(er) : ${d.antallStandLugar}</p>
            <p>Premium luggar(er) : ${d.antallPremLugar}</p>
        </div>`

    $("#kvitteringPrint").html(print);


}

