var main = 'mainPages',
    globalDomOverlay = '',
    dataTabel = [],
    dataResultSelectProv = [],
    dataResultMeinKosu2 = [];

const meinKosuTemplate = (data, order) => {
    return new Promise((resolve) => {
        resolve(function () {}());
    });
}

const meinKosu = async () => {
    try {
        const dataUpdateCovid19 = await gettingUpdateDataCovid19();
        let dataProvinces = await gettingProvince('https://data.covid19.go.id/public/api/prov_list.json');
        let individualData = await individualProvince(dataProvinces.makeDefaultProvinsi);
        const requiredData = await dataRequired(dataProvinces.resultProvinsi, individualData);
        let actualDataProv = await gettingActualCovid19(requiredData);
        let actualGlobal = await gettingActualCovid19Global(actualDataProv);

        let forecastMonthGlobal = await startingSESglobalByMonth(actualGlobal, 2022);
        let montlyChartData = await geetingMonthlyChart(forecastMonthGlobal);


        // provinsi
        let forecastYearlyProv = await startingSESprovByYear(actualDataProv, 2023);

        // console.log(individualData);
        // console.log(requiredData);
        // console.log(actualDataProv);
        // console.log(actualGlobal);
        // console.log(dataUpdateCovid19);
        // console.log(forecastYearlyProv);

        await renderSummaryCovid19(dataUpdateCovid19);
        await renderChartAsync(montlyChartData, 'monthly');
        await renderMapsProv(actualDataProv, dataUpdateCovid19);
        return await renderCovid19Prov(individualData, forecastYearlyProv);
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const renderSummaryCovid19 = data => {
    return new Promise((resolve) => {
        $("#summaryLatesDataCovid").html('');
        let labelCard = ['Coronavirus Cases', 'Total Recovered', 'Total Death', 'Active Cases'];
        let collection = data.update.total;
        let rows = '';
        Object.entries(collection).map((item, index) => {
            let numberIndex;
            if (index === 1) {
                numberIndex = 3;
            } else {
                numberIndex = 1;
            }
            if (index === 0) {
                rows += `<div class="col-xl-3">
                            <div class="cases-card dashboard-cases">
                                <div class="tracker-block border-card">
                                    <div class="tracker-block__icon">
                                        <img src="./assets/img/Group ${numberIndex}.svg" alt="corona-icon"/>
                                    </div>
                                    <div class="tracker-block__content">
                                        <h4>${labelCard[index]}</h4>
                                        <h2>
                                            <span class="cases-no infected">${item[1]}</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            } else if (index === 1) {
                rows += `<div class="col-xl-3">
                            <div class="cases-card dashboard-cases">
                                <div class="tracker-block border-card">
                                    <div class="tracker-block__icon">
                                        <img src="./assets/img/Group ${numberIndex}.svg" alt="corona-icon"/>
                                    </div>
                                    <div class="tracker-block__content">
                                        <h4>${labelCard[index]}</h4>
                                        <h2>
                                            <span class="cases-no infected">${Object.entries(collection)[2][1]}</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            } else if (index === 2) {
                rows += `<div class="col-xl-3">
                            <div class="cases-card dashboard-cases">
                                <div class="tracker-block border-card">
                                    <div class="tracker-block__icon">
                                        <img src="./assets/img/Group ${numberIndex}.svg" alt="corona-icon"/>
                                    </div>
                                    <div class="tracker-block__content">
                                        <h4>${labelCard[index]}</h4>
                                        <h2>
                                            <span class="cases-no infected">${Object.entries(collection)[3][1]}</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            } else if (index === 3) {
                rows += `<div class="col-xl-3">
                            <div class="cases-card dashboard-cases">
                                <div class="tracker-block border-card">
                                    <div class="tracker-block__icon">
                                        <img src="./assets/img/Group ${numberIndex}.svg" alt="corona-icon"/>
                                    </div>
                                    <div class="tracker-block__content">
                                        <h4>${labelCard[index]}</h4>
                                        <h2>
                                            <span class="cases-no infected">${Object.entries(collection)[1][1]}</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            }
        });
        resolve(function () {
            $(`#summaryLatesDataCovid`).html(rows);
        }())
    });
}

const renderMapsProv = (data, dataSummary) => {
    return new Promise((resolve) => {
        $("#summaryUpdateCovid").html('');
        $("#floatingMapsProv").html('');
        $("#indicatorMapsProv").html('');

        let dataResult = [];
        let total = 0;
        data.forEach(element => {
            for (let key in element) {
                if (element.hasOwnProperty(key)) {
                    if (key === 'list_perkembangan') {
                        total = 0;
                        for (let key1 in element[key]) {
                            if (element[key].hasOwnProperty(key1)) {
                                total += element[key][key1].totalYear;
                            }
                        }
                    }
                }
            }
            dataResult.push({
                provinsi: element.provinsi,
                total: total,
            });
        });

        let rows = `<div class="tracker-block__top flex-left">
                        <h4>Coronavirus (COVID-19)</h4>
                        <p>Updated <span class="last-update"></span> minutes ago</p>
                        <h2 class="tracker-block__top-total-cases infected">${dataSummary.update.total.jumlah_positif}
                        </h2>
                        <h6 class="new-no">+<span class="today_infected">${dataSummary.update.penambahan.jumlah_positif}</span>
                            (24h)</h6>
                    </div>

                    <div class="tracker-block__bottom flex-right">
                        <div class="tracker-block__bottom-wrap">
                            <div class="tracker-block__bottom__item">
                                <h5 class="tracker-block__bottom__item-title title-deaths">
                                    Deaths</h5>
                                <h2 class="tracker-block__bottom__item-no deaths">
                                    ${dataSummary.update.total.jumlah_meninggal}</h2>
                                <h6 class="new-no">+<span class="today_deaths">${dataSummary.update.penambahan.jumlah_meninggal}</span> (24h)</h6>
                            </div>
                            <div class="tracker-block__bottom__item">
                                <h5 class="tracker-block__bottom__item-title title-active">
                                    Active Cases</h5>
                                <h2 class="tracker-block__bottom__item-no current_cases">
                                    ${dataSummary.update.total.jumlah_dirawat}</h2>
                                <h6 class="new-no">+<span class="today_active_cases">${dataSummary.update.penambahan.jumlah_dirawat}</span>
                                    (24h)</h6>
                            </div>
                            <div class="tracker-block__bottom__item recovered-item">
                                <h5 class="tracker-block__bottom__item-title title-recovered">
                                    Recovered</h5>
                                <h2 class="tracker-block__bottom__item-no recovered">
                                </h2>
                                <h6 class="new-no">+<span class="today_recovered">${dataSummary.update.penambahan.jumlah_sembuh}</span> (24h)
                                </h6>
                            </div>
                        </div>

                    </div>`;
        let rows1 = indoMaps;
        let rows2 = `<li><span class="minCovid"></span>&#60;9000000</li>
                     <li><span class="midCovid"></span>&#62;9000000</li>
                     <li><span class="maxCovid"></span>&#62;15500000</li>`;

        resolve(function () {
            $(`#summaryUpdateCovid`).html(rows);
            $(`#floatingMapsProv`).html(rows1);
            $(`#indicatorMapsProv`).html(rows2);

            dataResult.forEach(element => {
                $(`#${element.provinsi.replaceAll(" ", "_")}`).removeClass('stDef');

                if (element.total > 15500000) {
                    $(`#${element.provinsi.replaceAll(" ", "_")}`).addClass('st3');
                }

                if ((element.total > 9000000)) {
                    $(`#${element.provinsi.replaceAll(" ", "_")}`).addClass('st2');
                }

                if (element.total > 1000000) {
                    $(`#${element.provinsi.replaceAll(" ", "_")}`).addClass('st1');
                }

                if (element.total <= 1000000) {
                    $(`#${element.provinsi.replaceAll(" ", "_")}`).addClass('st0');
                }

            });
        }())
    });
}

const renderCovid19Prov = (individualData, dataForecast) => {
    return new Promise((resolve) => {
        $("#caseCovidProvince").html('');
        let rows = '',
            row1 = '';

        dataForecast.forEach(element => {
            let total = 0;
            for (const key in element.list_forecast) {
                if (element.list_forecast.hasOwnProperty.call(element.list_forecast, key)) {
                    if (element.list_forecast[key].actual === null) {
                        element.list_forecast[key].actual = 0;
                    }
                    total += element.list_forecast[key].actual
                }
            }
            element.total_kasus = total;
        });

        individualData.forEach(element => {
            dataForecast.forEach(element1 => {
                if (element.provinsi === element1.provinsi) {
                    element1.kasus_baru = element.kasus_total;
                    element1.meninggal_persen = element.meninggal_persen;
                    element1.sembuh_persen = element.sembuh_persen;
                    element1.last_date = element.last_date;
                }
            });
        });

        dataForecast.forEach(element => {
            rows += `<li>
                        <h6 class="country-name">${element.provinsi}</h6>
                        <span class="cases-no infected">${element.total_kasus}</span>
                     </li>`;

            row1 += `<tr class="country-item odd" role="row">
                        <td class="sorting_1">
                            ${element.provinsi}
                        </td>
                        <td>${element.total_kasus}</td>
                        <td>${element.list_forecast[2023].forecast}</td>
                        <td>${element.meninggal_persen.toFixed(2)}%</td>
                        <td>${element.sembuh_persen.toFixed(2)}%</td>
                        <td>${element.kasus_baru}</td>
                     </tr>`;
        });

        resolve(function () {
            $(`#caseCovidProvince`).html(`<div class="col-lg-3">
                                                <div class="cases-by-country radius" id="cases-by-country">
                                                    <div class="cases-by-country__top">
                                                        <div class="header-content d-flex">
                                                            <h4>Cases by Province</h4>
                                                        </div>
                                                    </div>

                                                    <div class="cases-by-country__bottom">
                                                        <ul class="cases-country-lists">
                                                            ${rows}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="col-lg-9">
                                                <div class="list-view table-responsive" id="list-view">
                                                    <table class="list-view__table display table">
                                                        <thead class="list-view__head">
                                                            <tr>
                                                                <th>Province</th>
                                                                <th>Total Cases</th>
                                                                <th>Forecasting</th>
                                                                <th>Deaths %</th>
                                                                <th>Recovered %</th>
                                                                <th>New Cases</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody class="list-view__body">
                                                            ${row1}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>`);
        }());
    });
}

const meinKosu1 = async () => {
    try {
        let dataProvinces = await gettingProvince('https://data.covid19.go.id/public/api/prov_list.json');
        let individualData = await individualProvince(dataProvinces.makeDefaultProvinsi);
        const requiredData = await dataRequired(dataProvinces.resultProvinsi, individualData);
        let actualDataProv = await gettingActualCovid19(requiredData);
        let forecastYearlyProv = await startingSESprovByYear(actualDataProv, 2023);
        return await renderMapsProvTab(actualDataProv, individualData, forecastYearlyProv);
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const renderMapsProvTab = (actualData, individualData, dataForecast) => {
    return new Promise((resolve) => {
        let dataResult = [];
        let total = 0,
            rows1 = `<option data-id="anruc">
                        select province
                     </option>`;


        dataForecast.forEach(element => {
            let total = 0;
            for (const key in element.list_forecast) {
                if (element.list_forecast.hasOwnProperty.call(element.list_forecast, key)) {
                    if (element.list_forecast[key].actual === null) {
                        element.list_forecast[key].actual = 0;
                    }
                    total += element.list_forecast[key].actual
                }
            }
            element.total_kasus = total;
        });

        individualData.forEach(element => {
            dataForecast.forEach(element1 => {
                if (element.provinsi === element1.provinsi) {
                    element1.kasus_baru = element.kasus_total;
                    element1.meninggal_persen = element.meninggal_persen;
                    element1.sembuh_persen = element.sembuh_persen;
                    element1.last_date = element.last_date;
                }
            });
        });


        actualData.forEach(element => {
            for (let key in element) {
                if (element.hasOwnProperty(key)) {
                    if (key === 'list_perkembangan') {
                        total = 0;
                        for (let key1 in element[key]) {
                            if (element[key].hasOwnProperty(key1)) {
                                total += element[key][key1].totalYear;
                            }
                        }
                    }
                }
            }
            dataResult.push({
                provinsi: element.provinsi,
                total: total,
            });
        });

        dataResult.forEach(element => {
            rows1 += `<option data-id="${element.provinsi}">
                              ${element.provinsi}
                      </option>`;
        });

        let rows = `<li><span class="minCovidTab"></span>&#60;9000000</li>
                     <li><span class="midCovidTab"></span>&#62;9000000</li>
                     <li><span class="maxCovidTab"></span>&#62;15500000</li>`;

        resolve(function () {
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="map-widget map-report position-relative map-report" style="display: flex; flex-direction: row-reverse">

                                    <div class="corona-map-tracker">
                                        ${myMAPv}

                                        <div class="map-status-colors status-menu" style="margin-top: -30px;">
                                            <ul class="colors d-flex">
                                                ${rows}
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="map-content-wrap tracker-block tracker-block--4">
                                        <div class="tracker-block__body">
                                            <div class="select-country">
                                                <label for="selectProv" class="sr-only">Country</label>
                                                <select class="country" id="selectProv" onchange="gettingSelectProv()">
                                                    ${rows1}
                                                </select>
                                            </div>

                                            <div id="forAnrucDev">
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
                                            </div>
                                            
                                        </div>
                                    </div>
            
                                </div>`);


            dataResult.forEach(element => {
                $(`#${element.provinsi.replaceAll(" ", "_")}`).removeClass('mapTabDef');

                if (element.total > 15500000) {
                    $(`#${element.provinsi.replaceAll(" ", "_")}`).addClass('mapTab3');
                }

                if ((element.total > 9000000)) {
                    $(`#${element.provinsi.replaceAll(" ", "_")}`).addClass('mapTab2');
                }

                if (element.total > 1000000) {
                    $(`#${element.provinsi.replaceAll(" ", "_")}`).addClass('mapTab1');
                }

                if (element.total <= 1000000) {
                    $(`#${element.provinsi.replaceAll(" ", "_")}`).addClass('mapTab0');
                }
            });

            dataResultSelectProv = dataForecast;
        }());
    });
}

const gettingSelectProv = async () => {
    try {
        let data = $("#selectProv").val();
        let dataId = $("#selectProv").find('option:selected').data('id');

        if (dataId !== 'anruc' || data !== 'select province') {
            let indexProv = dataResultSelectProv.findIndex(ai => ai.provinsi === dataId);
            dataResultSelectProv.forEach(element => {
                $(`#${element.provinsi.replaceAll(" ", "_")}`).removeClass('mapTabSelected3');
                $(`#${element.provinsi.replaceAll(" ", "_")}`).removeClass('mapTabSelected2');
                $(`#${element.provinsi.replaceAll(" ", "_")}`).removeClass('mapTabSelected1');
            });


            if (dataResultSelectProv[indexProv].total_kasus > 15500000) {
                $(`#${dataId.replaceAll(" ", "_")}`).addClass('mapTabSelected3');
            }

            if ((dataResultSelectProv[indexProv].total_kasus > 9000000)) {
                $(`#${dataId.replaceAll(" ", "_")}`).addClass('mapTabSelected2');
            }

            if (dataResultSelectProv[indexProv].total_kasus > 1000000) {
                $(`#${dataId.replaceAll(" ", "_")}`).addClass('mapTabSelected1');
            }

            let rows = `<div class="track-item">
                            <p class="track-item__title">Total Cases</p>
                            <h4 class="track-item__no infected">${dataResultSelectProv[indexProv].total_kasus}</h4>
                        </div>
                        <div class="track-item">
                            <p class="track-item__title">Forecasting (2023)</p>
                            <h4 class="track-item__no today_infected">${dataResultSelectProv[indexProv].list_forecast[2023].forecast}</h4>
                        </div>
                        <div class="track-item">
                            <p class="track-item__title">New Cases (${dataResultSelectProv[indexProv].last_date})</p>
                            <h4 class="track-item__no today_deaths">${dataResultSelectProv[indexProv].kasus_baru}</h4>
                        </div>
                        <div class="track-item">
                            <p class="track-item__title">Deaths <span>(${dataResultSelectProv[indexProv].last_date})</span></p>
                            <h4 class="track-item__no deaths">${dataResultSelectProv[indexProv].meninggal_persen.toFixed(2)}<span class="deaths-rate"></span> %</h4>
                        </div>
                        <div class="track-item">
                            <p class="track-item__title">Recovered <span>(${dataResultSelectProv[indexProv].last_date})</span></p>
                            <h4 class="track-item__no recovered">${dataResultSelectProv[indexProv].sembuh_persen.toFixed(2)}<span class="recover-rate"></span> %</h4>
                        </div>`;

            return $("#forAnrucDev").html(rows);
        } else {
            return toastr.warning('Please Select the Province First!')
        }
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const meinKosu2 = async () => {
    try {
        const dataUpdateCovid19 = await gettingUpdateDataCovid19();
        let dataProvinces = await gettingProvince('https://data.covid19.go.id/public/api/prov_list.json');
        let individualData = await individualProvince(dataProvinces.makeDefaultProvinsi);
        const requiredData = await dataRequired(dataProvinces.resultProvinsi, individualData);
        let actualDataProv = await gettingActualCovid19(requiredData);
        let actualGlobal = await gettingActualCovid19Global(actualDataProv);

        let forecastMonthGlobal = await startingSESglobalByMonth(actualGlobal, 2022);
        let forecastYearGlobal = await startingSESglobalByYear(actualGlobal, 2022);


        // provinsi
        let forecastYearlyProv = await startingSESprovByYear(actualDataProv, 2023);

        // console.log(individualData);
        // console.log(requiredData);
        // console.log(actualDataProv);
        // console.log(actualGlobal);
        console.log(forecastMonthGlobal);
        console.log(forecastYearGlobal);
        console.log(dataUpdateCovid19);
        // console.log(forecastYearlyProv);

        // await renderSummaryCovid19(dataUpdateCovid19);
        // await renderChartAsync(montlyChartData, 'monthly');
        // await renderMapsProv(actualDataProv, dataUpdateCovid19);
        // return await renderCovid19Prov(individualData, forecastYearlyProv);
        await renderMeinKosu2(dataUpdateCovid19, forecastMonthGlobal, forecastYearGlobal);
        return [];
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const renderMeinKosu2 = (dataUpdate, monthForecast, yearForecast) => {
    return new Promise((resolve) => {

        let rows = `<div class="badge-item__body">
                        <div class="badge-item__block">
                            <p>Active cases: <span class="infected">${dataUpdate.update.total.jumlah_positif}</span></p>
                        </div>
                        <div class="badge-item__block">
                            <p>Deaths: <span class="deaths">${dataUpdate.update.total.jumlah_meninggal}</span></p>
                        </div>
                        <div class="badge-item__block">
                            <p>Recovered: <span class="recovered">${dataUpdate.update.total.jumlah_sembuh}</span></p>
                        </div>
                        <div class="badge-item__block">
                            <p>New: <span class="today_infected">${dataUpdate.update.penambahan.jumlah_positif}</span></p>
                        </div>
                    </div>`;

        resolve(function () {
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="badge-tracker-wrap">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-12 m-auto">
                            
                                                <div class="badge-tracker-item">
                                                    <div class="title-top" style="margin-top: 30px;">
                                                        <h3>Forecasting COVID-19 Indonesian Using SES (Single Exponential Smoothing)</h3>
                                                    </div>
                                                
                                                    <div class="badge-item badge-bg-yellow worldwide-stats">
                                                        <div class="badge-item__title badge-item__title--3 badge-title-bg-black">
                                                            <p style="font-size: 14px;">COVID-19 Country Update</p>
                                                        </div>
                                                        ${rows}
                                                    </div>

                                                    <div class="badge-content-wrapper">
                                                        <div class="badge-item worldwide-stats">
                                                            <div class="badge-item__title">
                                                                <div class="tracker-block__header with-option">
                                                                    <div class="select-country">
                                                                        <label for="countrySESTab" class="sr-only">Select Type</label>
                                                                        <select class="country" name="countrySESTab" id="countrySESTab" onchange="gettingSelectCountrySES()">
                                                                            <option data-id="month">
                                                                                By Month
                                                                            </option>
                                                                            <option data-id="year">
                                                                                By Year
                                                                            </option>
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
                                                                </div>
                                                            </div>

                                                            
                                                            <div class="badge-item__body">
                                                                <div class="list-view-border table-responsive" id="list-view">
                                                                    <table class="display table">
                                                                        <thead class="list-view-head">
                                                                            <tr>
                                                                                <th>Cases Date</th>
                                                                                <th>Confirmed Cases</th>
                                                                                <th>Forecasting Using Alpha X</th>
                                                                            </tr>
                                                                        </thead>
                            
                                                                        <tbody class="list-view-ses">
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                        </tbody>
                            
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="badge-tracker-item">
                                                    <div class="title-top" style="margin-top: 30px;">
                                                        <h3>Forecasting COVID-19 Using Single Exponential Smoothing Method</h3>
                                                    </div>
                                                
                                                    <div class="badge-item badge-bg-yellow worldwide-stats">
                                                        <div class="badge-item__title badge-item__title--3 badge-title-bg-black">
                                                            <p style="font-size: 14px;">COVID-19 Province Update</p>
                                                        </div>
                                                        <div class="badge-item__body">
                                                            <div class="badge-item__block">
                                                                <p>Active cases: <span class="infected">00,000</span></p>
                                                            </div>
                                                            <div class="badge-item__block">
                                                                <p>Deaths: <span class="deaths">00,000</span></p>
                                                            </div>
                                                            <div class="badge-item__block">
                                                                <p>Recovered: <span class="recovered">00,000</span></p>
                                                            </div>
                                                            <div class="badge-item__block">
                                                                <p>New: <span class="today_infected">00,000</span></p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="badge-content-wrapper">
                                                        <div class="badge-item worldwide-stats">
                                                            <div class="badge-item__title">
                                                                <div class="tracker-block__header with-option">
                                                                    <div class="select-country">
                                                                        <label for="forecastProvince" class="sr-only">Select Province</label>
                                                                        <select class="country" name="country" id="forecastProvince"></select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="badge-item__body">
                                                                <div class="list-view-border table-responsive" id="list-view">
                                                                    <table class="display table">
                                                                        <thead class="list-view-head">
                                                                            <tr>
                                                                                <th>Cases Date</th>
                                                                                <th>Confirmed Cases</th>
                                                                                <th>Forecasting Using Alpha X</th>
                                                                            </tr>
                                                                        </thead>
                            
                                                                        <tbody class="list-view-ses">
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                                <td>asdsafsafa</td>
                                                                            </tr>
                                                                        </tbody>
                            
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                            
                                                <div class="badge-tracker-item">
                                                    <div class="title-top">
                                                        <h2>Chart</h2>
                                                    </div>
                            
                                                    <div class="mini-chart-content" id="country-report">
                                                        <div class="tracker-block tracker-block--6">
                                                            <div class="tracker-block__body">
                                                                <div class="track-item">
                                                                    <div class="track-item-report">
                                                                        <p class="track-item__title track-item__title-active">Active Cases</p>
                                                                        <h4 class="track-item__no current_cases">00,000,0</h4>
                                                                    </div>
                                                                    <div class="track-item-chart">
                                                                        <canvas id="active_cases_chart"></canvas>
                                                                    </div>
                                                                </div>
                            
                                                                <div class="track-item">
                                                                    <div class="track-item-report">
                                                                        <p class="track-item__title track-item__title-deaths">Deaths</p>
                                                                        <h4 class="track-item__no deaths">00,000,0</h4>
                                                                    </div>
                            
                                                                    <div class="track-item-chart">
                                                                        <canvas id="deaths_chart"></canvas>
                                                                    </div>
                                                                </div>
                            
                                                                <div class="track-item">
                                                                    <div class="track-item-report">
                                                                        <p class="track-item__title track-item__title-recovered">Recovered</p>
                                                                        <h4 class="track-item__no recovered">00,000,0</h4>
                                                                    </div>
                            
                                                                    <div class="track-item-chart">
                                                                        <canvas id="recovered_chart"></canvas>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);

            dataResultMeinKosu2 = {
                dataUpdate,
                monthForecast,
                yearForecast
            }
        }());
    });
}

const gettingSelectCountrySES = async () => {
    try {
        let data = $("#countrySESTab").val();
        let dataId = $("#countrySESTab").find('option:selected').data('id');

        if (dataId !== 'month' && data !== 'month') {

            // let rows = `<div class="track-item">
            //                 <p class="track-item__title">Total Cases</p>
            //                 <h4 class="track-item__no infected">${dataResultSelectProv[indexProv].total_kasus}</h4>
            //             </div>
            //             <div class="track-item">
            //                 <p class="track-item__title">Forecasting (2023)</p>
            //                 <h4 class="track-item__no today_infected">${dataResultSelectProv[indexProv].list_forecast[2023].forecast}</h4>
            //             </div>
            //             <div class="track-item">
            //                 <p class="track-item__title">New Cases (${dataResultSelectProv[indexProv].last_date})</p>
            //                 <h4 class="track-item__no today_deaths">${dataResultSelectProv[indexProv].kasus_baru}</h4>
            //             </div>
            //             <div class="track-item">
            //                 <p class="track-item__title">Deaths <span>(${dataResultSelectProv[indexProv].last_date})</span></p>
            //                 <h4 class="track-item__no deaths">${dataResultSelectProv[indexProv].meninggal_persen.toFixed(2)}<span class="deaths-rate"></span> %</h4>
            //             </div>
            //             <div class="track-item">
            //                 <p class="track-item__title">Recovered <span>(${dataResultSelectProv[indexProv].last_date})</span></p>
            //                 <h4 class="track-item__no recovered">${dataResultSelectProv[indexProv].sembuh_persen.toFixed(2)}<span class="recover-rate"></span> %</h4>
            //             </div>`;

            // return $("#forAnrucDev").html(rows);
        } else if (dataId !== 'month' && data !== 'month') {
            // 
        } else {
            return toastr.warning('Please Select the Type Option First!')
        }
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const meinKosu2iii = (data, order) => {
    return new Promise((resolve) => {
        $(".main-content-wrapper").removeClass('p-0');
        resolve(function () {
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="badge-tracker-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 m-auto">
    
                        <div class="badge-tracker-item">
                            <div class="title-top" style="margin-top: 30px;">
                                <h3>Forecasting COVID-19 Using Single Exponential Smoothing Method</h3>
                            </div>
                        
                            <div class="badge-item badge-bg-yellow worldwide-stats">
                                <div class="badge-item__title badge-item__title--3 badge-title-bg-black">
                                    <p style="font-size: 14px;">COVID-19 Country Update</p>
                                </div>
                                <div class="badge-item__body">
                                    <div class="badge-item__block">
                                        <p>Active cases: <span class="infected">00,000</span></p>
                                    </div>
                                    <div class="badge-item__block">
                                        <p>Deaths: <span class="deaths">00,000</span></p>
                                    </div>
                                    <div class="badge-item__block">
                                        <p>Recovered: <span class="recovered">00,000</span></p>
                                    </div>
                                    <div class="badge-item__block">
                                        <p>New: <span class="today_infected">00,000</span></p>
                                    </div>
                                </div>
                            </div>

                            <div class="badge-content-wrapper">
                                <div class="ses-global-btn">
                                    <button class="ses-global-month-btn ses-global-active" onclick="sesGlobal(this)" data-toggle="tooltip" data-placement="top" title="Monthly">M</button>
                                    <button class="ses-global-year-btn" onclick="sesGlobal(this)" data-toggle="tooltip" data-placement="bottom" title="Yearly"">Y</button>
                                </div> 
                                <div class="badge-item worldwide-stats">
                                    <div class="badge-item__title">
                                            <div id="forAnrucDev">
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
                                            </div>
                                    </div>
                                    <div class="badge-item__body">
                                        <div class="helper"></div>
                                        <div class="list-view table-responsive" id="targetGlobal">
                                            <table class="display table global-table">
                                                <thead class="list-view-head">
                                                    <tr>
                                                        <th id="globalHeading">Cases Date</th>
                                                        <th>Confirmed Cases</th>
                                                        <th>Forecasting Using Alpha X</th>
                                                    </tr>
                                                </thead>
                    
                                                <tbody class="list-view-ses">
                                                    <tr>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                        <td class="row-data">asdsafsafa</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="badge-tracker-item">
                            <div class="title-top" style="margin-top: 30px;">
                                <h3>Forecasting COVID-19 Using Single Exponential Smoothing Method</h3>
                            </div>
                        
                            <div class="badge-item badge-bg-yellow worldwide-stats">
                                <div class="badge-item__title badge-item__title--3 badge-title-bg-black">
                                    <p style="font-size: 14px;">COVID-19 Province Update</p>
                                </div>
                                <div class="badge-item__body">
                                    <div class="badge-item__block">
                                        <p>Active cases: <span class="infected">00,000</span></p>
                                    </div>
                                    <div class="badge-item__block">
                                        <p>Deaths: <span class="deaths">00,000</span></p>
                                    </div>
                                    <div class="badge-item__block">
                                        <p>Recovered: <span class="recovered">00,000</span></p>
                                    </div>
                                    <div class="badge-item__block">
                                        <p>New: <span class="today_infected">00,000</span></p>
                                    </div>
                                </div>
                            </div>

                            <div class="badge-content-wrapper">
                                <div class="ses-province-btn ">
                                    <button class="ses-province-month-btn ses-global-active" onclick="sesProvince(this)" data-toggle="tooltip" data-placement="top" title="Monthly">M</button>
                                    <button class="ses-province-year-btn" onclick="sesProvince(this)" data-toggle="tooltip" data-placement="bottom" title="Yearly"">Y</button>
                                </div> 
                                <div class="badge-item worldwide-stats">
                                    <div class="badge-item__title">
                                        <div class="tracker-block__header with-option">
                                            <div class="select-country">
                                                <label for="forecastProvince" class="sr-only">Select Province</label>
                                                <select class="country" name="country" id="forecastProvince"></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="badge-item__body">
                                        <div class="list-view-border table-responsive" id="targetProvince">
                                            <table class="display table global-table">
                                                <thead class="list-view-head">
                                                    <tr>
                                                        <th id="provinceHeading">Cases Date</th>
                                                        <th>Confirmed Cases</th>
                                                        <th>Forecasting Using Alpha X</th>
                                                    </tr>
                                                </thead>
                    
                                                <tbody class="list-view-ses">
                                                    <tr>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                        <td class="row-data-province">asdsafsafa</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div class="badge-tracker-item">
                            <div class="title-top">
                                <h2>Chart</h2>
                            </div>
    
                            <div class="mini-chart-content" id="country-report">
                                <div class="tracker-block tracker-block--6">
                                    <div class="tracker-block__body">
                                        <div class="track-item">
                                            <div class="track-item-report">
                                                <p class="track-item__title track-item__title-active">Active Cases</p>
                                                <h4 class="track-item__no current_cases">00,000,0</h4>
                                            </div>
                                            <div class="track-item-chart">
                                                <canvas id="active_cases_chart"></canvas>
                                            </div>
                                        </div>
    
                                        <div class="track-item">
                                            <div class="track-item-report">
                                                <p class="track-item__title track-item__title-deaths">Deaths</p>
                                                <h4 class="track-item__no deaths">00,000,0</h4>
                                            </div>
    
                                            <div class="track-item-chart">
                                                <canvas id="deaths_chart"></canvas>
                                            </div>
                                        </div>
    
                                        <div class="track-item">
                                            <div class="track-item-report">
                                                <p class="track-item__title track-item__title-recovered">Recovered</p>
                                                <h4 class="track-item__no recovered">00,000,0</h4>
                                            </div>
    
                                            <div class="track-item-chart">
                                                <canvas id="recovered_chart"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`);


        miniChart();
        }())
    });
}