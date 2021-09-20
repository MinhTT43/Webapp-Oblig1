$(() => {
    console.log("ready")
    hentReiser();
})

function hentReiser() {
    const url = "reise/ruter"
    $.get(url, function (data) {
        console.log(data)
        formatReiser(data);
    })
}

function formatReiser(reiser) {
    let print = "";
    for (let reise of reiser) {
        console.log(reise.reiseID)
        console.log(reise.reiseFra)
        print += '<a type="button" class="col-lg-5 mx-5 my-4 btn btn-outline-primary" href="bestilling.html?id=' + reise.reiseID + '">' +
            reise.reiseFra + " " + reise.reiseTil + '</a> '
    }
    $("#printReiser").html(print);
}