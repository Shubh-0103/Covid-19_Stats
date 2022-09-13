function collapse() {
  document.getElementById("parent").style.display = "none";
}
currchart1;
currchart2; //the current chart variables
function makepie(x, y, can, title) {
  var ctx = document.getElementById(can).getContext("2d");
  var chart = new Chart(ctx, {
    type: "pie",

    data: {
      labels: x,
      datasets: [
        {
          data: y,
          backgroundColor: ["#90EE90", "#e420208f", "#ffa368"],
          borderColor: ["#29ab87", "#cd5c5c", "#FF6700"],
          borderWidth: 1
        },
      ],
    },
    options: {
      responsive: true,
      cutoutPercentage: 50,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: title,
      },
    },
  });
  return chart;
}
