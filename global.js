function global_data1() {
  document.getElementById("statelist").style.display = "none";
  document.getElementById("header3").style.display = "none";
  document.getElementById("extra").style.display = "none";
  function makechart(x, y) {
    var ctx = document.getElementById("c1").getContext("2d");
    var chart = new Chart(ctx, {
      type: "horizontalBar",

      data: {
        labels: x,
        datasets: [
          {
            data: y,
            label: "COVID-19 Cases",
            backgroundColor: "#e420208f",
            borderColor: "#cd5c5c",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "TOP 10 COUNTRIES BY CASES",
        },
      },
    });
    return chart;
  }
  //this is the javascript file to show the graphs
  //the ajax part(to get response fromm the  api)

  var myxml = new XMLHttpRequest();
  myxml.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      var base = JSON.parse(this.response).locations;
      base.sort(function (a, b) {
        return b.latest.confirmed - a.latest.confirmed;
      });
      var l = base.map(function (x) {
        return x.country;
      });

      var label = l.slice(0, 10);

      var d = base.map(function (x) {
        return x.latest.confirmed;
      });
      var data = d.slice(0, 10);

      //alert(typeof(currchart1));
      if (typeof currchart1 === "undefined") {
        currchart1 = makechart(label, data);
      } else {
        currchart1.destroy();
        currchart1 = makechart(label, data);
      }
    } else {
      document.getElementById("c1").innerHTML =
        "ERROR CONNECTING TO API. KINDLY REFRESH THE PAGE!" +
        " HTTP code:" +
        this.status;
    }
  };
  myxml.open(
    "GET",
    "https://coronavirus-tracker-api.herokuapp.com/v2/locations",
    true
  );
  myxml.send();
}
