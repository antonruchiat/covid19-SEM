let defaultChart = {
  series: [{
      name: "Actual Data",
      data: [31, 40, 28, 51],
    },
    {
      name: "SES",
      data: [11, 32, 45, 32],
    },
  ],
  chart: {
    id: "default",
    height: 420,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "month",
    categories: [
      "January",
      "February",
      "March",
      "April",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
}

let areaOptionsMonth = {
  series: [{
      name: "Actual Data",
      data: [31, 40, 28, 51],
    },
    {
      name: "SES",
      data: [11, 32, 45, 32],
    },
  ],
  chart: {
    height: 420,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "month",
    categories: [
      "January",
      "February",
      "March",
      "April",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

let areaOptionsYear = {
  series: [{
      name: "Actual Data",
      data: [51, 40, 28],
    },
    {
      name: "SES",
      data: [32, 45, 11],
    },
  ],
  chart: {
    height: 420,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "year",
    categories: [
      "2020",
      "2021",
      "2022",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

let areaMonthly = new ApexCharts(document.getElementById("area"), defaultChart);
// let areaYearly = new ApexCharts(document.querySelector("#area"), areaOptionsYear);
areaMonthly.render();
let defaultBtn1 = document.querySelector(".month-btn");
let defaultBtn2 = document.querySelector(".year-btn");
defaultBtn1.classList.add("chart-active");

function showChart(e) {
  let checkElClass = e.classList;

  if (checkElClass.contains("month-btn")) {
    if (checkElClass.contains("chart-active")) {
      areaMonthly.updateOptions(areaOptionsMonth);
    } else {
      areaMonthly.updateOptions(areaOptionsMonth);
      e.classList.add("chart-active");
      defaultBtn2.classList.remove("chart-active");

    }
  } else if (checkElClass.contains("year-btn")) {
    if (checkElClass.contains("chart-active")) {
      areaMonthly.updateOptions(areaOptionsYear);
    } else {
      areaMonthly.updateOptions(areaOptionsYear);
      e.classList.add("chart-active");
      defaultBtn1.classList.remove("chart-active");
    }

  } else {
    alert("maybe there is an error")
  }
}