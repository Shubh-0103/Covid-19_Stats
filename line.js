//time series
now = "0";
function newchart(x, y) {
  var ctx = document.getElementById("c3").getContext("2d");
  var chart = new Chart(ctx, {
    type: "line",

    data: {
      labels: x,
      datasets: [
        {
          data: y,
          label: "CASES IN INDIA",
          backgroundColor: "#e420208f",
          borderColor: "#cd5c5c",
          borderWidth: 1
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "RISE IN CASES IN INDIA OVER PAST 15 DAYS as on " + now,
      },
    },
  });
  //return chart;
}

var myxml = new XMLHttpRequest();
myxml.onreadystatechange = function () {
  if (this.status == 200 && this.readyState == 4) {
    var base = JSON.parse(this.response).cases_time_series;
    l = base.map(function (e) {
      var t = e.date.slice(0, 6);
      return t;
    });

    l.reverse();
    var label = l.slice(0, 15);
    now = label[0];
    label.reverse();
    d = base.map(function (e) {
      return e.totalconfirmed;
    });
    d.reverse();
    var data = d.slice(0, 15);
    data.reverse();

    newchart(label, data);
  } else {
    document.getElementById("c1").innerHTML =
      "ERROR CONNECTING TO API. KINDLY REFRESH THE PAGE!" +
      " HTTP code:" +
      this.status;
  }
};
myxml.open("GET", "https://api.covid19india.org/data.json", true);
myxml.send();
