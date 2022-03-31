// const renderChartAsync = data => {
//   return new Promise((resolve) => {
//     $("#removePadding").html('');


//     resolve(function () {
//       $(`#removePadding`).html('');
//     }());
//   });
// }


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
  console.log(e);
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
    console.log("maybe there is an error")
  }
}

const geetingMonthlyChart = data => {
  return new Promise((resolve) => {

    let gettingMonth = gettingRequireMonth();
    let gettingDataRequire = [];
    data.forEach(element => {
      for (const key in element) {
        if (element.hasOwnProperty.call(element, key)) {
          if (key === 'list_forecast') {
            for (const key1 in element[key]) {
              if (element[key].hasOwnProperty.call(element[key], key1)) {
                element[key][key1].forEach(element1 => {
                  gettingDataRequire.push({
                    stringMonth: convertNumMonth(element1.month.split('-')[1]),
                    month: element1.month,
                    actual: element1.actual,
                    forecast: element1.forecast,
                  });
                });
              }
            }
          }
        }
      }
    });

    let dataActual = gettingDataRequire.map(item => item.actual);
    dataActual.forEach((element, index) => {
      if (element === null) {
        dataActual[index] = 0;
      }
    });

    let dataForecast = gettingDataRequire.map(item => item.forecast);

    let areaOptionsMonth = {
      series: [{
          name: "Actual Data",
          data: dataActual,
        },
        {
          name: "SES (Single Exponential Smoothing)",
          data: dataForecast,
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
        categories: gettingMonth.missedMonth,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    };

    resolve(areaOptionsMonth);
  });
}

const geetingYearlyChart = data => {
  return new Promise((resolve) => {
    console.log(data);
    let gettingDataRequire = [];
    data.forEach(element => {
      for (const key in element) {
        if (element.hasOwnProperty.call(element, key)) {
          if (key === 'list_forecast') {
            for (const key1 in element[key]) {
              if (element[key].hasOwnProperty.call(element[key], key1)) {
                gettingDataRequire.push({
                  year: key1,
                  actual: element[key][key1].actual,
                  forecast: element[key][key1].forecast,
                });
              }
            }
          }
        }
      }
    });

    console.log(gettingDataRequire);
    let dataYear = gettingDataRequire.map(item => parseInt(item.year));
    let dataActual = gettingDataRequire.map(item => item.actual);
    dataActual.forEach((element, index) => {
      if (element === null) {
        dataActual[index] = 0;
      }
    });
    let dataForecast = gettingDataRequire.map(item => item.forecast);

    let areaOptionsYear = {
      series: [{
          name: "Actual Data",
          data: dataActual,
        },
        {
          name: "SES (Single Exponential Smoothing)",
          data: dataForecast,
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
        type: "year",
        categories: dataYear,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    };

    resolve(areaOptionsYear);
  });
}

const renderChartAsync = (data, type) => {
  return new Promise((resolve) => {
    $("#removePadding").html('');
    let rows = `<div class="card" id="borderRmv">
                    <div class="header-card-wrapper">
                        <h4 class="card-title-chart">Forecasting Line Chart</h4>
                        <span class="switch-btn">
                            <button class="line-btn month-btn" id="btnMonth">Monthly</button>
                            <button class="line-btn year-btn" id="btnYear">Yearly</button>
                        </span>
                    </div>
                    <div class="card-body" id="broken1">
                        <div id="area"></div>
                    </div>
                </div>`;
    $("#removePadding").html(rows);
    resolve(function () {
      let apexChart = new ApexCharts(document.getElementById("area"), data);
      apexChart.render();

      if (type === 'monthly') {
        $("#btnYear").removeClass('chart-active');
        $("#btnMonth").addClass('chart-active');
      } else {
        $("#btnMonth").removeClass('chart-active');
        $("#btnYear").addClass('chart-active');
      }
    }());
  });
}

const renderChartOption = async typeChart => {
  try {
    let chartData;

    let dataProvinces = await gettingProvince('https://data.covid19.go.id/public/api/prov_list.json');
    let individualData = await individualProvince(dataProvinces.makeDefaultProvinsi);
    const requiredData = await dataRequired(dataProvinces.resultProvinsi, individualData);
    let actualDataProv = await gettingActualCovid19(requiredData);
    let actualGlobal = await gettingActualCovid19Global(actualDataProv);

    if (typeChart === 'monthly') {
      let forecastMonthGlobal = await startingSESglobalByMonth(actualGlobal, 2022);
      chartData = await geetingMonthlyChart(forecastMonthGlobal);
    } else {
      let areCurrentYearMonth = currentYearMonth();
      let forecastYearGlobal = await startingSESglobalByYear(actualGlobal, parseInt(areCurrentYearMonth.year + 1));
      chartData = await geetingYearlyChart(forecastYearGlobal);
    }

    return await renderChartAsync(chartData, typeChart);
  } catch (rejectedReason) {
    console.log(rejectedReason);
    return toastr.error('Error NetWork');
  }
}