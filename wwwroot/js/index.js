$(() => {
   console.log("index.js ready")
   hentData();
})
const testCards = () => {
   let testCards = `
            <div class="col-lg-4 col-md-6 mb-2 ">
               <div class="card card-hover">
                  <a href="">
                     <img class="card-img-top card-img-cover  d-none d-sm-block" style="height: 80px;"
                          src="https://images.unsplash.com/photo-1543169108-32ac15a21e05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80"
                          alt="Card image cap card-img-cover">
                     <div class="card-body">
                        <h5 href="#" class="" style="color: black; font-weight: bold;">Oslo - Kiel</h5>
                        <a href="#ticketSecond" class="a-hover m-0">Se reiser</a>
                     </div>
                  </a>
               </div>
            </div>
   `;

   return testCards;
}

const validateDate = () => {
   let date = $("#dateSelected").val();

   $("#header-title").html(testCards());
   console.log("true")
}

const date = () => {
   let date = $("#dateSelected").val();
   let text = "";
   if (date === "") {
      text = "inden dato valgtAvreisetid";
      console.log("not ok");
   }
}