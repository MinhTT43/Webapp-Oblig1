$(() => {
   console.log("valider.js ready")
   hentData();
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
      $("#errorTelefon").html("Telefonnummer må bestå av 2-20 bokstaver");
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
      console.log("pass")
      return true;
   }
}