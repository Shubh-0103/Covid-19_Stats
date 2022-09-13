function global_data2() {
  document.getElementById("statelist").style.display = "none";
  document.getElementById("header3").style.display = "none";
  document.getElementById("extra").style.display = "none";
  var myxml = new XMLHttpRequest();
  myxml.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      var base = JSON.parse(this.response);
      var all = base.cases;
      var death = base.deaths;
      var rec = base.recovered;
      var live = all - (death + rec);
      label = ["Recovered", "Deaths", "Ongoing treatment"];
      data = [rec, death, live];
      //alert(typeof(currchart2));
      if (typeof currchart2 === "undefined") {
        currchart2 = makepie(label, data, "c2", "GLOBAL DISTRIBUTION");
      } else {
        currchart2.destroy();
        currchart2 = makepie(label, data, "c2", "GLOBAL DISTRIBUTION");
      }

      document.getElementById("header2").innerHTML =
        "Total Cases(global) = " + all;
    } else {
      document.getElementById("c1").innerHTML =
        "ERROR CONNECTING TO API. KINDLY REFRESH THE PAGE!" +
        " HTTP code:" +
        this.status;
    }
  };
  myxml.open("GET", "https://coronavirus-19-api.herokuapp.com/all", true);
  myxml.send();
}
