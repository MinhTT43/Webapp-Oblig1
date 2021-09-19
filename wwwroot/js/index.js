$(() => {
    console.log("ready")
    hentReiser();
})

function hentReiser() {
    const url = "reise/ruter"
    $.get(url, function (data) {
        formatReiser(data);
    })
}

function formatReiser(reiser) {
    let print = "";
    for (let reise of reiser) {
        print += '<div class="col-lg-3 card"> ' +
            reise.reiseFra + " " + reise.reiseTil + '</div>'
    }
    $("#printReiser").html(print);
}