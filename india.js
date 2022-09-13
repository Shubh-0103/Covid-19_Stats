function indian_data(choice) {
  document.getElementById("extra").style.display = "flex";

  myxml.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      var indian, foreign, okay, dead, name, live;
      document.getElementById("statelist").style.display = "block";
      if (choice == 0) {
        var base = JSON.parse(this.response).data.summary;
        var all = base.total;
        indian = base.confirmedCasesIndian;
        foreign = base.confirmedCasesForeign;
        okay = base.discharged;
        dead = base.deaths;
        live = all - (okay + dead);

        document.getElementById("header2").innerHTML =
          "Total Cases(India)=" + all;
        document.getElementById("states").selectedIndex = 0;
        document.getElementById("extra").style.display = "flex";
      } else {
        var base = JSON.parse(this.response).data.regional[choice - 1];
        all = base.totalConfirmed;
        indian = base.confirmedCasesIndian;
        foreign = base.confirmedCasesForeign;
        okay = base.discharged;
        dead = base.deaths;
        live = all - (okay + dead);
        document.getElementById("header3").style.display = "block";
        document.getElementById("header3").innerHTML =
          base.loc + " : " + base.totalConfirmed;
        //alert(dead);
        document.getElementById("extra").style.display = "none";
      }
      var label1 = ["Indian", "Foreign"];
      var label2 = ["Discharged", "Deaths", "Ongoing treatment"];
      var data1 = [indian, foreign];
      var data2 = [okay, dead, live];
      currchart1.destroy();
      currchart2.destroy();
      currchart1 = makepie(label1, data1, "c1", "Citizens affected");
      currchart2 = makepie(label2, data2, "c2", "Condition");
    } else {
      document.getElementById("c1").innerHTML =
        "ERROR CONNECTING TO API. KINDLY REFRESH THE PAGE!" +
        " HTTP code:" +
        this.status;
    }
  };
  myxml.open("GET", "https://api.rootnet.in/covid19-in/stats/latest", true);
  myxml.send();
}
