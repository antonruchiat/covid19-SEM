$(document).on('click', '#SESMonthGlobal', () => {
  console.log(dataResultMeinKosu2);
  let rows = `<option data-id="anruc1">
                  Select Year
              </option>`;
  $("#sideCardMonthOps").html('');
  $("#SESYearGlobal").removeClass("ses-global-active");
  $("#targetGlobal").removeClass("animate");
  window.requestAnimationFrame(function () {
    $("#targetGlobal").addClass("animate");
  });
  $("#SESMonthGlobal").addClass("ses-global-active");

  let yearOptions = dataResultMeinKosu2.actualGlobal.list_perkembangan;
  for (const key in yearOptions) {
    if (yearOptions.hasOwnProperty.call(yearOptions, key)) {
      rows += `<option data-id="${key}">
                  ${key}
               </option>`;
    }
  }

  $("#sideCardMonthOps").html(`<div class="tracker-block__header with-option">
                                  <div class="select-country">
                                      <label for="forecastMonthGlobal" class="sr-only">Select Year</label>
                                      <select class="country" name="forecastMonthGlobal" id="forecastMonthGlobal" onchange="gettingSelectMonthSES()">
                                        ${rows}
                                      </select>
                                  </div>
                               </div>
                               <div id="forAnrucDev1">
                                  <div class="track-item">
                                      <p class="track-item__title">Total Cases</p>
                                      <h4 class="track-item__no infected">00,000</h4>
                                  </div>
                                  <div class="track-item">
                                      <p class="track-item__title">Last 24 Hours</p>
                                      <h4 class="track-item__no today_infected">00,000</h4>
                                  </div>
                                  <div class="track-item">
                                      <p class="track-item__title">Deaths <span>(<span class="deaths-rate"></span>%)</span></p>
                                      <h4 class="track-item__no deaths">00,000</h4>
                                  </div>
                                  <div class="track-item">
                                      <p class="track-item__title">New Deaths</p>
                                      <h4 class="track-item__no today_deaths">00,000</h4>
                                  </div>
                                  <div class="track-item">
                                      <p class="track-item__title">Recovered <span>(<span class="recover-rate"></span>%)</span></p>
                                      <h4 class="track-item__no recovered">00,000</h4>
                                  </div>
                               </div>`);
});

$(document).on('click', '#SESYearGlobal', () => {
  console.log(dataResultMeinKosu2);

  $("#sideCardMonthOps").html('');
  $("#SESMonthGlobal").removeClass("ses-global-active");
  $("#targetGlobal").removeClass("animate");
  window.requestAnimationFrame(function () {
    $("#targetGlobal").addClass("animate");
  });
  $("#SESYearGlobal").addClass("ses-global-active");
  let lastProp = Object.keys(dataResultMeinKosu2.forecastYearGlobal[0].list_forecast).pop();
  console.log(lastProp);
  $("#sideCardMonthOps").html(`<div class="tracker-block__header with-option">
                                  <div id="forAnrucDev1">
                                    <div class="track-item">
                                        <p class="track-item__title">Total Cases</p>
                                        <h4 class="track-item__no infected">${dataResultMeinKosu2.dataUpdateCovid19.update.total.jumlah_positif}</h4>
                                    </div>
                                    <div class="track-item">
                                        <p class="track-item__title">Forecast</p>
                                        <h4 class="track-item__no today_infected">${dataResultMeinKosu2.forecastYearGlobal[0].list_forecast[lastProp].forecast}</h4>
                                    </div>
                                    <div class="track-item">
                                        <p class="track-item__title">Deaths</p>
                                        <h4 class="track-item__no deaths">${dataResultMeinKosu2.dataUpdateCovid19.update.total.jumlah_meninggal}</h4>
                                    </div>
                                    <div class="track-item">
                                        <p class="track-item__title">Recovered</p>
                                        <h4 class="track-item__no recovered">${dataResultMeinKosu2.dataUpdateCovid19.update.total.jumlah_sembuh}</h4>
                                    </div>
                                    <div class="track-item">
                                        <p class="track-item__title">Active Cases</p>
                                        <h4 class="track-item__no recovered">${dataResultMeinKosu2.dataUpdateCovid19.update.total.jumlah_dirawat}</h4>
                                    </div>
                                    <div class="track-item">
                                        <p class="track-item__title">New Cases</p>
                                        <h4 class="track-item__no today_deaths">${dataResultMeinKosu2.dataUpdateCovid19.update.penambahan.jumlah_positif}</h4>
                                    </div>
                                    <div class="track-item">
                                        <p class="track-item__title">Last Update</p>
                                        <h4 class="track-item__no today_deaths">${dataResultMeinKosu2.dataUpdateCovid19.update.penambahan.created}</h4>
                                    </div>
                                  </div>
                               </div>`);


  let rows1 = '';
  dataResultMeinKosu2.forecastYearGlobal.forEach(element => {
    Object.entries(element.list_forecast).map((item, index) => {
      if (index === 0) {
        rows1 += `<tr>
                    <td class="row-data">${item[0]}</td>
                    <td class="row-data">${element.list_forecast[item[0]].actual === null ? 0 : element.list_forecast[item[0]].actual}</td>
                    <td class="row-data">${element.list_forecast[item[0]].actual}</td>
                    <td class="row-data">${element.list_forecast[item[0]].forecast}</td>
                  </tr>`;
      } else {
        rows1 += `<tr>
                    <td class="row-data">${item[0]}</td>
                    <td class="row-data">${element.list_forecast[item[0]].actual === null ? 0 : element.list_forecast[item[0]].actual}</td>
                    <td class="row-data">${element.list_forecast[item[0]-1].forecast} + 0.9 ( ${element.list_forecast[item[0]-1].actual} - ${element.list_forecast[item[0]-1].forecast} )</td>
                    <td class="row-data">${element.list_forecast[item[0]].forecast}</td>
                  </tr>`;
      }
    });
  });

  $("#targetGlobal").html(`<table class="display table global-table">
                            <thead class="list-view-head">
                                <tr>
                                    <th id="globalHeading">Cases Year</th>
                                    <th>Confirmed Cases</th>
                                    <th>Forecasting Using Alpha ${0.9}</th>
                                    <th>Result Forecast</th>
                                </tr>
                            </thead>

                            <tbody class="list-view-ses">
                                ${rows1}
                            </tbody>
                          </table>`);
});

$(document).on('click', '#SESMonthProv', () => {
  console.log(dataResultMeinKosu2);

  $("#sectionForecastProvTab3").html('');
  $("#sectionForecastProvTab3").html(defaultTab3_month);

  $("#sideCardMonthOpsProv").html('');
  $("#SESYearProv").removeClass("ses-global-active");
  $("#targetProvince").removeClass("animate");
  window.requestAnimationFrame(function () {
    $("#targetProvince").addClass("animate");
  });
  $("#SESMonthProv").addClass("ses-global-active");


  let yearOptions = dataResultMeinKosu2.actualGlobal.list_perkembangan;
  let areProvinces = dataResultMeinKosu2.dataProvinces.resultProvinsi;
  let rows = `<option data-id="anruc3">
                  Select Year
              </option>`;

  let rows1 = `<option data-id="anruc2">
                 Select Province
               </option>`;

  for (const key in yearOptions) {
    if (yearOptions.hasOwnProperty.call(yearOptions, key)) {
      rows += `<option data-id="${key}">
                  ${key}
               </option>`;
    }
  }

  areProvinces.forEach(element => {
    rows1 += `<option data-id="${element}">
                ${element}
              </option>`;
  });

  $("#SelectforecastMonthGlobal").html(rows);

  $("#sideCardMonthOpsProv").html(`<div class="tracker-block__header with-option">
                                      <div class="select-country">
                                          <label for="selectForecastProvince" class="sr-only">Select Province</label>
                                          <select class="country" name="country" id="selectForecastProvince" onchange="gettingSelectProvSES('month')">
                                            ${rows1}
                                          </select>
                                      </div>
                                   </div>

                                  <div id="forAnrucDev2">
                                      <div class="track-item">
                                          <p class="track-item__title">Total Cases</p>
                                          <h4 class="track-item__no infected">00,000</h4>
                                      </div>
                                      <div class="track-item">
                                          <p class="track-item__title">Last 24 Hours</p>
                                          <h4 class="track-item__no today_infected">00,000</h4>
                                      </div>
                                      <div class="track-item">
                                          <p class="track-item__title">Deaths <span>(<span class="deaths-rate"></span>%)</span></p>
                                          <h4 class="track-item__no deaths">00,000</h4>
                                      </div>
                                      <div class="track-item">
                                          <p class="track-item__title">New Deaths</p>
                                          <h4 class="track-item__no today_deaths">00,000</h4>
                                      </div>
                                      <div class="track-item">
                                          <p class="track-item__title">Recovered <span>(<span class="recover-rate"></span>%)</span></p>
                                          <h4 class="track-item__no recovered">00,000</h4>
                                      </div>
                                   </div>`);
});

$(document).on('click', '#SESYearProv', () => {
  console.log(dataResultMeinKosu2);

  $("#sectionForecastProvTab3").html('');
  $("#sectionForecastProvTab3").html(defaultTab3_year);

  $("#sideCardMonthOpsProv").html('');
  $("#SESMonthProv").removeClass("ses-global-active");
  $("#targetProvince").removeClass("animate");
  window.requestAnimationFrame(function () {
    $("#targetProvince").addClass("animate");
  });
  $("#SESYearProv").addClass("ses-global-active");


  let rows = `<div class="badge-item__body">
                <div class="badge-item__block">
                <p>Active cases: <span class="infected">${dataResultMeinKosu2.dataUpdateCovid19.update.total.jumlah_positif}</span></p>
                </div>
                <div class="badge-item__block">
                  <p>Deaths: <span class="deaths">${dataResultMeinKosu2.dataUpdateCovid19.update.total.jumlah_meninggal}</span></p>
                </div>
                <div class="badge-item__block">
                  <p>Recovered: <span class="recovered">${dataResultMeinKosu2.dataUpdateCovid19.update.total.jumlah_sembuh}</span></p>
                </div>
                <div class="badge-item__block">
                  <p>New: <span class="today_infected">${dataResultMeinKosu2.dataUpdateCovid19.update.penambahan.jumlah_positif}</span></p>
                </div>
              </div>`;


  let areProvinces = dataResultMeinKosu2.dataProvinces.resultProvinsi;
  let rows1 = `<option data-id="anruc2">
                 Select Province
               </option>`;

  areProvinces.forEach(element => {
    rows1 += `<option data-id="${element}">
                ${element}
              </option>`;
  });

  $("#summaryCovid19Prov").html(rows);
  $("#sideCardMonthOpsProv").html(`<div class="tracker-block__header with-option">
                                      <div class="select-country">
                                          <label for="selectForecastProvince" class="sr-only">Select Province</label>
                                          <select class="country" name="country" id="selectForecastProvince" onchange="gettingSelectProvSES()">
                                              ${rows1}
                                          </select>
                                      </div>
                                   </div>

                                   <div id="forAnrucDev2">
                                      <div class="track-item">
                                          <p class="track-item__title">Total Cases</p>
                                          <h4 class="track-item__no infected">${00,00}</h4>
                                      </div>
                                      <div class="track-item">
                                          <p class="track-item__title">Forecast</p>
                                          <h4 class="track-item__no today_infected">${00,00}</h4>
                                      </div>
                                      <div class="track-item">
                                          <p class="track-item__title">Deaths</p>
                                          <h4 class="track-item__no deaths">${00,00}</h4>
                                      </div>
                                      <div class="track-item">
                                          <p class="track-item__title">Recovered</p>
                                          <h4 class="track-item__no recovered">${00,00}</h4>
                                      </div>
                                      <div class="track-item">
                                          <p class="track-item__title">Active Cases</p>
                                          <h4 class="track-item__no recovered">${00,00}</h4>
                                      </div>
                                      <div class="track-item">
                                          <p class="track-item__title">New Cases</p>
                                          <h4 class="track-item__no today_deaths">${00,00}</h4>
                                      </div>
                                      <div class="track-item">
                                          <p class="track-item__title">Last Update</p>
                                          <h4 class="track-item__no today_deaths">${00,00}</h4>
                                      </div>
                                   </div>`);
});