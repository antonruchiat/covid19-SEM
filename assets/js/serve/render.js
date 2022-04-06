var main = 'mainPages',
    dataResultSelectProv = [],
    dataResultMeinKosu2 = [];

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

        console.log(individualData);
        console.log(requiredData);
        console.log(actualDataProv);
        console.log(actualGlobal);
        console.log(dataUpdateCovid19);
        console.log(forecastYearlyProv);

        await renderMeinKosu();
        await renderSummaryCovid19(dataUpdateCovid19);
        await renderChartAsync(montlyChartData, 'monthly');
        await renderMapsProv(actualDataProv, dataUpdateCovid19);
        return await renderCovid19Prov(individualData, forecastYearlyProv);


        // for backup Data if cracsh link
        // const response = await fetchWithTimeout('/games', {
        //     timeout: 6000
        // });
        // const data = await response.json();
        // console.log(data);
        // return response;
    } catch (rejectedReason) {
        // toastr.warning('please wait, redirecting ...');
        // console.log(rejectedReason.name)
        // console.log(rejectedReason.name === 'AbortError');
        // if (rejectedReason.name === 'AbortError') {
        //     return await getRedirecting(reserveMeinKosu, 'meinKosu');
        // }
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const renderMeinKosu = () => {
    return new Promise((resolve) => {

        resolve(function () {
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="content-section-1">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-xl-12" id="">
                                                <div class="mtn-25 worldwide-stats" id="">
                                                    <div class="row grouping" id="summaryLatesDataCovid">

                                                        <div class="col-xl-3">
                                                            <div class="cases-card dashboard-cases">
                                                                <div class="tracker-block border-card">
                                                                    <!-- <div class="tracker-block" id="minMarginFirst"> -->
                                                                    <div class="tracker-block__icon">
                                                                        <img src="assets/img/Group 1.svg" alt="corona-icon" />
                                                                    </div>
                                                                    <div class="tracker-block__content">
                                                                        <h4>Coronavirus Cases</h4>
                                                                        <h2><span class="cases-no infected">0,000,000</span>
                                                                            <div class="new-no">(+<span class="today_infected">000,000</span>)
                                                                            </div>
                                                                        </h2>
                                                                    </div>
                                                                    <!-- </div> -->
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="col-xl-3">
                                                            <div class="cases-card">
                                                                <div class="tracker-block border-card">
                                                                    <div class="tracker-block__icon">
                                                                        <img src="assets/img/Group 3.svg" alt="corona-icon" />
                                                                    </div>
                                                                    <div class="tracker-block__content">
                                                                        <h4>Total Recovered</h4>
                                                                        <h2><span class="cases-no recovered">0,000,000</span>
                                                                            <div class="new-no">(+<span class="today_recovered">000,000</span>)
                                                                            </div>
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="col-xl-3">
                                                            <div class="cases-card">
                                                                <div class="tracker-block border-card">
                                                                    <div class="tracker-block__icon">
                                                                        <img src="assets/img/Group 1.svg" alt="corona-icon" />
                                                                    </div>
                                                                    <div class="tracker-block__content">
                                                                        <h4>Total Death</h4>
                                                                        <h2><span class="cases-no deaths">0,000,000</span>
                                                                            <div class="new-no">(+<span class="today_deaths">000,000</span>)
                                                                            </div>
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="col-xl-3">
                                                            <div class="cases-card">
                                                                <div class="tracker-block border-card">
                                                                    <div class="tracker-block__icon">
                                                                        <img src="assets/img/Group 1.svg" alt="corona-icon" />
                                                                    </div>
                                                                    <div class="tracker-block__content">
                                                                        <h4>Active Cases</h4>
                                                                        <h2><span class="cases-no current_cases">0,000,000</span></h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xl-12 chart-area" id="removePadding">
                                                <div class="card" id="borderRmv">
                                                    <div class="header-card-wrapper">
                                                        <h4 class="card-title-chart">Forecasting Line Chart</h4>
                                                        <span class="switch-btn">
                                                            <button class="line-btn month-btn" onclick="showChart(this)">Monthly</button>
                                                            <button class="line-btn year-btn" onclick="showChart(this)">Yearly</button>
                                                        </span>
                                                    </div>
                                                    <div class="card-body" id="broken1">
                                                        <div id="area"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="content-section-3">
                                    <div class="container">

                                        <div class="row">
                                            <div class="col-lg-12 col-xl-12">
                                                <div class="today-view report-item worldwide-stats">
                                                    <h4>Today's View</h4>

                                                    <div class="tracker-block tracker-block--3 text-center flexing" id="summaryUpdateCovid">
                                                        <div class="tracker-block__top flex-left">
                                                            <h4>Coronavirus (COVID-19)</h4>
                                                            <p>Updated <span class="last-update"></span> minutes ago</p>
                                                            <h2 class="tracker-block__top-total-cases infected">00,000,0
                                                            </h2>
                                                            <h6 class="new-no">+<span class="today_infected">0000</span>
                                                                (24h)</h6>
                                                        </div>

                                                        <div class="tracker-block__bottom flex-right">
                                                            <div class="tracker-block__bottom-wrap">
                                                                <div class="tracker-block__bottom__item">
                                                                    <h5 class="tracker-block__bottom__item-title title-deaths">
                                                                        Deaths</h5>
                                                                    <h2 class="tracker-block__bottom__item-no deaths">
                                                                        00,000,0</h2>
                                                                    <h6 class="new-no">+<span class="today_deaths">00,00</span> (24h)</h6>
                                                                </div>
                                                                <div class="tracker-block__bottom__item">
                                                                    <h5 class="tracker-block__bottom__item-title title-active">
                                                                        Active Cases</h5>
                                                                    <h2 class="tracker-block__bottom__item-no current_cases">
                                                                        00,000,0</h2>
                                                                    <h6 class="new-no">+<span class="today_active_cases">00,00</span>
                                                                        (24h)</h6>
                                                                </div>
                                                                <div class="tracker-block__bottom__item recovered-item">
                                                                    <h5 class="tracker-block__bottom__item-title title-recovered">
                                                                        Recovered</h5>
                                                                    <h2 class="tracker-block__bottom__item-no recovered">
                                                                    </h2>
                                                                    <h6 class="new-no">+<span class="today_recovered">00,00</span> (24h)
                                                                    </h6>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- </div> -->

                                                <!-- <div class="col-xl-12"> -->
                                                <div class="map-status-wrap" id="map-status-report">
                                                    <div class="map-status" id="floatingMapsProv">

                                                    </div>

                                                    <div class="map-status-colors">
                                                        <ul class="colors d-flex" id="indicatorMapsProv">
                                                            <li><span class="min"></span>&#60;50k</li>
                                                            <li><span class="mid"></span>&#60;100k</li>
                                                            <li><span class="max"></span>&#62;100k</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="content-section-5 add-height">
                                    <div class="container">
                                        <div class="row" id="caseCovidProvince">
                                            <div class="col-lg-3">
                                                <div class="cases-by-country radius" id="cases-by-country">
                                                    <div class="cases-by-country__top">
                                                        <div class="header-content d-flex">
                                                            <h4>Cases by Province</h4>
                                                        </div>
                                                    </div>

                                                    <div class="cases-by-country__bottom">
                                                        <ul class="cases-country-lists"></ul>
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
                                                                <th>New Cases</th>
                                                                <th>Total Deaths</th>
                                                                <th>Deaths %</th>
                                                                <th>New Deaths</th>
                                                                <th>Total Recovered</th>
                                                                <th>Recovered %</th>
                                                                <th>Active Cases</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody class="list-view__body">

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
        }());
    });
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
                                                    <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                                                    
                                                        <table class="list-view__table display table dataTable no-footer" id="DataTables_Table_0" role="grid"
                                                        aria-describedby="DataTables_Table_0_info">
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

                                                            <tbody class="list-view__body" id="paginattable">
                                                                ${row1}
                                                            </tbody>
                                                        </table>
                                                        ${rowsPagination()}
                                                    </div>
                                                </div>
                                            </div>`);
            setupTablePagination(11);
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
        let forecastYearGlobal = await startingSESglobalByYear(actualGlobal, 2023);


        // provinsi
        let forecastMonthlyProv = await startingSESprovByMonth(actualDataProv, 2022);
        let forecastYearlyProv = await startingSESprovByYear(actualDataProv, 2023);

        let dataSend = {
            dataUpdateCovid19,
            individualData,
            dataProvinces,
            actualGlobal,
            actualDataProv,
            forecastMonthGlobal,
            forecastYearGlobal,
            forecastMonthlyProv,
            forecastYearlyProv
        }


        // console.log(individualData);
        // console.log(requiredData);
        // console.log(actualDataProv);
        console.log(actualGlobal);
        console.log(forecastMonthGlobal);
        console.log(forecastYearGlobal);
        console.log(dataUpdateCovid19);
        // console.log(forecastYearlyProv);
        return await renderMeinKosu2(dataSend);
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const renderMeinKosu2 = (dataSend) => {
    return new Promise((resolve) => {
        const {
            dataUpdateCovid19,
            individualData,
            dataProvinces,
            actualGlobal,
            actualDataProv,
            forecastMonthGlobal,
            forecastYearGlobal,
            forecastMonthlyProv,
            forecastYearlyProv
        } = dataSend;

        let yearOptions = actualGlobal.list_perkembangan;

        let areProvinces = dataProvinces.resultProvinsi;

        let rows = `<div class="badge-item__body">
                        <div class="badge-item__block">
                            <p>Active cases: <span class="infected">${dataUpdateCovid19.update.total.jumlah_positif}</span></p>
                        </div>
                        <div class="badge-item__block">
                            <p>Deaths: <span class="deaths">${dataUpdateCovid19.update.total.jumlah_meninggal}</span></p>
                        </div>
                        <div class="badge-item__block">
                            <p>Recovered: <span class="recovered">${dataUpdateCovid19.update.total.jumlah_sembuh}</span></p>
                        </div>
                        <div class="badge-item__block">
                            <p>New: <span class="today_infected">${dataUpdateCovid19.update.penambahan.jumlah_positif}</span></p>
                        </div>
                    </div>`;

        let rows1 = '';
        for (const key in yearOptions) {
            if (yearOptions.hasOwnProperty.call(yearOptions, key)) {
                rows1 += `<option data-id="${key}">
                            ${key}
                          </option>`;
            }
        }

        let rows2 = '';
        areProvinces.forEach(element => {
            rows2 += `<option data-id="${element}">
                        ${element}
                      </option>`;
        });

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
                                                        ${rows}
                                                    </div>

                                                    <div class="badge-content-wrapper">
                                                        <div class="ses-global-btn">
                                                            <button class="ses-global-month-btn ses-global-active" id="SESMonthGlobal" data-toggle="tooltip" data-placement="top" title="Monthly">M</button>
                                                            <button class="ses-global-year-btn" id="SESYearGlobal" data-toggle="tooltip" data-placement="bottom" title="Yearly"">Y</button>
                                                        </div> 
                                                        <div class="badge-item worldwide-stats">
                                                            <div class="badge-item__title" id="sideCardMonthOps">
                                                                    <div class="tracker-block__header with-option">
                                                                        <div class="select-country">
                                                                            <label for="forecastMonthGlobal" class="sr-only">Select Year</label>
                                                                            <select class="country" name="forecastMonthGlobal" id="forecastMonthGlobal" onchange="gettingSelectMonthSES()">
                                                                                <option data-id="anruc1">
                                                                                    Select Year
                                                                                </option>
                                                                                ${rows1}
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
                                                                <div class="helper"></div>
                                                                <div class="list-view table-responsive" id="targetGlobal">
                                                                    <table class="display table global-table">
                                                                        <thead class="list-view-head">
                                                                            <tr>
                                                                                <th id="globalHeading">Cases Month</th>
                                                                                <th>Confirmed Cases</th>
                                                                                <th>Forecasting Using Alpha 0.9</th>
                                                                                <th>Forecast Result</th>
                                                                            </tr>
                                                                        </thead>
                                            
                                                                        <tbody class="list-view-ses">
                                                                            <tr>
                                                                                <td class="row-data">2020-03</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-04</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-05</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-06</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-07</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-08</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-09</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-10</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-11</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-12</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
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
                                                        <h3>Forecasting Provinces Covid19 Using Single Exponential Smoothing</h3>
                                                    </div>
                                                
                                                    <div class="badge-item badge-bg-yellow worldwide-stats">
                                                        <div class="badge-item__title badge-item__title--3 badge-title-bg-black">
                                                            <p style="font-size: 14px;">COVID-19 Province Update</p>
                                                        </div>
                                                        <div class="badge-item__body" id="summaryCovid19Prov">
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
                                                            <button class="ses-province-month-btn ses-global-active" id="SESMonthProv" data-toggle="tooltip" data-placement="top" title="Monthly">M</button>
                                                            <button class="ses-province-year-btn" id="SESYearProv" data-toggle="tooltip" data-placement="bottom" title="Yearly"">Y</button>
                                                        </div> 
                                                        <div class="badge-item worldwide-stats" id="sectionForecastProvTab3">
                                                            <div class="badge-item__title" id="sideCardMonthOpsProv">
                                                                <div class="tracker-block__header with-option">
                                                                    <div class="select-country">
                                                                        <label for="selectForecastProvince" class="sr-only">Select Province</label>
                                                                        <select class="country" name="country" id="selectForecastProvince" onchange="gettingSelectProvSES('month')">
                                                                            <option data-id="anruc2">
                                                                                Select Province
                                                                            </option>
                                                                            ${rows2}
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
                                                                </div>
                                                            </div>

                                                            <div class="badge-item__body">
                                                                <div class="select-country" style=" position: absolute; right: 68px; margin-top: -20px;">
                                                                    <label for="SelectforecastMonthGlobal" class="sr-only">Select Year</label>
                                                                    <select class="country" name="SelectforecastMonthGlobal" id="SelectforecastMonthGlobal">
                                                                        <option data-id="anruc3">
                                                                            Select Year
                                                                        </option>
                                                                        ${rows1}
                                                                    </select>
                                                                </div>

                                                                <div class="list-view-border table-responsive" id="targetProvince">
                                                                    <table class="display table global-table">
                                                                        <thead class="list-view-head">
                                                                            <tr>
                                                                                <th id="globalHeading">Cases Month</th>
                                                                                <th>Confirmed Cases</th>
                                                                                <th>Forecasting Using Alpha 0.9</th>
                                                                                <th>Forecast Result</th>
                                                                            </tr>
                                                                        </thead>
                                            
                                                                        <tbody class="list-view-ses">
                                                                            <tr>
                                                                                <td class="row-data">2020-03</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-04</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-05</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-06</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-07</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-08</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-09</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-10</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-11</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="row-data">2020-12</td>
                                                                                <td class="row-data">00,000</td>
                                                                                <td class="row-data">-</td>
                                                                                <td class="row-data">-</td>
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

            dataResultMeinKosu2 = dataSend;
            miniChart();
        }());
    });
}

const defaultTab3_month = `<div class="badge-item__title" id="sideCardMonthOpsProv">
                                <div class="tracker-block__header with-option">
                                    <div class="select-country">
                                        <label for="selectForecastProvince" class="sr-only">Select Province</label>
                                        <select class="country" name="country" id="selectForecastProvince" onchange="gettingSelectProvSES('month')">
                                            <option data-id="anruc2">
                                                Select Province
                                            </option>
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
                                </div>
                            </div>
                            
                            <div class="badge-item__body">
                                <div class="select-country" style=" position: absolute; right: 68px; margin-top: -20px;">
                                    <label for="SelectforecastMonthGlobal" class="sr-only">Select Year</label>
                                    <select class="country" name="SelectforecastMonthGlobal" id="SelectforecastMonthGlobal">
                                        <option data-id="anruc3">
                                            Select Year
                                        </option>
                                    </select>
                                </div>

                                <div class="list-view-border table-responsive" id="targetProvince">
                                    <table class="display table global-table">
                                        <thead class="list-view-head">
                                            <tr>
                                                <th id="globalHeading">Cases Month</th>
                                                <th>Confirmed Cases</th>
                                                <th>Forecasting Using Alpha 0.9</th>
                                                <th>Forecast Result</th>
                                            </tr>
                                        </thead>
            
                                        <tbody class="list-view-ses">
                                            <tr>
                                                <td class="row-data">2020-03</td>
                                                <td class="row-data">00,000</td>
                                                <td class="row-data">-</td>
                                                <td class="row-data">-</td>
                                            </tr>
                                            <tr>
                                                <td class="row-data">2020-04</td>
                                                <td class="row-data">00,000</td>
                                                <td class="row-data">-</td>
                                                <td class="row-data">-</td>
                                            </tr>
                                            <tr>
                                                <td class="row-data">2020-05</td>
                                                <td class="row-data">00,000</td>
                                                <td class="row-data">-</td>
                                                <td class="row-data">-</td>
                                            </tr>
                                            <tr>
                                                <td class="row-data">2020-06</td>
                                                <td class="row-data">00,000</td>
                                                <td class="row-data">-</td>
                                                <td class="row-data">-</td>
                                            </tr>
                                            <tr>
                                                <td class="row-data">2020-07</td>
                                                <td class="row-data">00,000</td>
                                                <td class="row-data">-</td>
                                                <td class="row-data">-</td>
                                            </tr>
                                            <tr>
                                                <td class="row-data">2020-08</td>
                                                <td class="row-data">00,000</td>
                                                <td class="row-data">-</td>
                                                <td class="row-data">-</td>
                                            </tr>
                                            <tr>
                                                <td class="row-data">2020-09</td>
                                                <td class="row-data">00,000</td>
                                                <td class="row-data">-</td>
                                                <td class="row-data">-</td>
                                            </tr>
                                            <tr>
                                                <td class="row-data">2020-10</td>
                                                <td class="row-data">00,000</td>
                                                <td class="row-data">-</td>
                                                <td class="row-data">-</td>
                                            </tr>
                                            <tr>
                                                <td class="row-data">2020-11</td>
                                                <td class="row-data">00,000</td>
                                                <td class="row-data">-</td>
                                                <td class="row-data">-</td>
                                            </tr>
                                            <tr>
                                                <td class="row-data">2020-12</td>
                                                <td class="row-data">00,000</td>
                                                <td class="row-data">-</td>
                                                <td class="row-data">-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>`;


const defaultTab3_year = `<div class="badge-item__title" id="sideCardMonthOpsProv">
                            <div class="tracker-block__header with-option">
                                <div class="select-country">
                                    <label for="selectForecastProvince" class="sr-only">Select Province</label>
                                    <select class="country" name="country" id="selectForecastProvince" onchange="gettingSelectProvSES('year')">
                                        <option data-id="anruc2">
                                            Select Province
                                        </option>
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
                            </div>
                          </div>
                          
                          
                          <div class="badge-item__body">
                            <div class="list-view-border table-responsive" id="targetProvince">
                                <table class="display table global-table">
                                    <thead class="list-view-head">
                                        <tr>
                                            <th id="globalHeading">Cases Month</th>
                                            <th>Confirmed Cases</th>
                                            <th>Forecasting Using Alpha 0.9</th>
                                            <th>Forecast Result</th>
                                        </tr>
                                    </thead>

                                    <tbody class="list-view-ses">
                                        <tr>
                                            <td class="row-data">2020-03</td>
                                            <td class="row-data">00,000</td>
                                            <td class="row-data">-</td>
                                            <td class="row-data">-</td>
                                        </tr>
                                        <tr>
                                            <td class="row-data">2020-04</td>
                                            <td class="row-data">00,000</td>
                                            <td class="row-data">-</td>
                                            <td class="row-data">-</td>
                                        </tr>
                                        <tr>
                                            <td class="row-data">2020-05</td>
                                            <td class="row-data">00,000</td>
                                            <td class="row-data">-</td>
                                            <td class="row-data">-</td>
                                        </tr>
                                        <tr>
                                            <td class="row-data">2020-06</td>
                                            <td class="row-data">00,000</td>
                                            <td class="row-data">-</td>
                                            <td class="row-data">-</td>
                                        </tr>
                                        <tr>
                                            <td class="row-data">2020-07</td>
                                            <td class="row-data">00,000</td>
                                            <td class="row-data">-</td>
                                            <td class="row-data">-</td>
                                        </tr>
                                        <tr>
                                            <td class="row-data">2020-08</td>
                                            <td class="row-data">00,000</td>
                                            <td class="row-data">-</td>
                                            <td class="row-data">-</td>
                                        </tr>
                                        <tr>
                                            <td class="row-data">2020-09</td>
                                            <td class="row-data">00,000</td>
                                            <td class="row-data">-</td>
                                            <td class="row-data">-</td>
                                        </tr>
                                        <tr>
                                            <td class="row-data">2020-10</td>
                                            <td class="row-data">00,000</td>
                                            <td class="row-data">-</td>
                                            <td class="row-data">-</td>
                                        </tr>
                                        <tr>
                                            <td class="row-data">2020-11</td>
                                            <td class="row-data">00,000</td>
                                            <td class="row-data">-</td>
                                            <td class="row-data">-</td>
                                        </tr>
                                        <tr>
                                            <td class="row-data">2020-12</td>
                                            <td class="row-data">00,000</td>
                                            <td class="row-data">-</td>
                                            <td class="row-data">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                          </div>`;


const gettingSelectMonthSES = async () => {
    try {
        let data = $("#forecastMonthGlobal").val();
        let dataId = $("#forecastMonthGlobal").find('option:selected').data('id');
        if (dataId !== 'anruc1' && data !== 'Select Year') {
            let forecastYearGlobal = await startingSESglobalByYear(dataResultMeinKosu2.actualGlobal, parseInt(dataId));
            let rows = `<div class="track-item">
                            <p class="track-item__title">Total Cases</p>
                            <h4 class="track-item__no infected">${forecastYearGlobal[0].list_forecast[dataId].actual}</h4>
                        </div>
                        <div class="track-item">
                            <p class="track-item__title">Forecast</p>
                            <h4 class="track-item__no today_infected">${forecastYearGlobal[0].list_forecast[dataId].forecast}</h4>
                        </div>`;
            $("#forAnrucDev1").html(rows);


            let forecastMonthGlobal = await startingSESglobalByMonth(dataResultMeinKosu2.actualGlobal, parseInt(dataId));
            let rows1 = '';
            forecastMonthGlobal.forEach(element => {
                element.list_forecast[dataId].forEach((element1, idx1) => {
                    if (idx1 === 0) {
                        rows1 += `<tr>
                                <td class="row-data">${element1.month}</td>
                                <td class="row-data">${element1.actual}</td>
                                <td class="row-data">${element1.actual}</td>
                                <td class="row-data">${element1.forecast}</td>
                              </tr>`;
                    } else {
                        rows1 += `<tr>
                                <td class="row-data">${element1.month}</td>
                                <td class="row-data">${element1.actual === null ? 0 : element1.actual}</td>
                                <td class="row-data">${element.list_forecast[dataId][idx1-1].forecast} + 0.9 ( ${element.list_forecast[dataId][idx1-1].actual} - ${element.list_forecast[dataId][idx1-1].forecast} )</td>
                                <td class="row-data">${element1.forecast}</td>
                              </tr>`;
                    }
                });
            });


            $("#targetGlobal").html(`<table class="display table global-table">
                                    <thead class="list-view-head">
                                        <tr>
                                            <th id="globalHeading">Cases Month</th>
                                            <th>Confirmed Cases</th>
                                            <th>Forecasting Using Alpha ${0.9}</th>
                                            <th>Result Forecast</th>
                                        </tr>
                                    </thead>

                                    <tbody class="list-view-ses">
                                        ${rows1}
                                    </tbody>
                                  </table>`);

            return [];
        } else {
            return toastr.warning('Please Select the Type Option First!')
        }
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const gettingSelectProvSES = async type => {
    try {
        if (type == 'month') {
            let data = $("#selectForecastProvince").val();
            let dataId = $("#selectForecastProvince").find('option:selected').data('id');
            let data1 = $("#SelectforecastMonthGlobal").val();
            let dataId1 = $("#SelectforecastMonthGlobal").find('option:selected').data('id');

            if (dataId !== 'anruc2' && data !== 'Select Province' &&
                dataId1 !== 'anruc3' && data1 !== 'Select Year') {

                let totalYear = 0;
                let forecastYearlyProv = await startingSESprovByYear(dataResultMeinKosu2.actualDataProv, parseInt(dataId1));

                let collectionProv = dataResultMeinKosu2.actualDataProv;
                collectionProv.forEach(element => {
                    if (element.provinsi === dataId) {
                        for (const key in element.list_perkembangan) {
                            if (element.list_perkembangan.hasOwnProperty.call(element.list_perkembangan, key)) {
                                if (parseInt(key) === parseInt(dataId1)) {
                                    totalYear += element.list_perkembangan[key].totalYear;
                                }
                            }
                        }
                    }
                });

                let indexProv = dataResultMeinKosu2.individualData.findIndex(ai => ai.provinsi === dataId);
                let areProv = dataResultMeinKosu2.individualData.find(item => item.provinsi === dataId);

                $("#summaryCovid19Prov").html(`<div class="badge-item__body">
                                                    <div class="badge-item__block">
                                                        <p>Active cases: <span class="infected">${totalYear}</span></p>
                                                    </div>
                                                    <div class="badge-item__block">
                                                        <p>Deaths: <span class="deaths">${areProv.meninggal_persen.toFixed(2)}%</span></p>
                                                    </div>
                                                    <div class="badge-item__block">
                                                        <p>Recovered: <span class="recovered">${areProv.sembuh_persen.toFixed(2)}%</span></p>
                                                    </div>
                                                    <div class="badge-item__block">
                                                        <p>New: <span class="today_infected">${areProv.kasus_total}</span></p>
                                                    </div>
                                                </div>`);

                let rows = `<div class="track-item">
                                <p class="track-item__title">Total Cases</p>
                                <h4 class="track-item__no infected">${forecastYearlyProv[0].list_forecast[dataId1].actual}</h4>
                            </div>
                            <div class="track-item">
                                <p class="track-item__title">Forecast</p>
                                <h4 class="track-item__no today_infected">${forecastYearlyProv[0].list_forecast[dataId1].forecast}</h4>
                            </div>`;
                $("#forAnrucDev2").html(rows);

                let forecastMonthlyProv = await startingSESprovByMonth(dataResultMeinKosu2.actualDataProv, parseInt(dataId1));
                let areProvMonthly = forecastMonthlyProv.find(item => item.provinsi === dataId);
                let rows1 = '';
                areProvMonthly.list_forecast[dataId1].forEach((element, index) => {
                    if (index === 0) {
                        rows1 += `<tr>
                                    <td class="row-data">${element.month}</td>
                                    <td class="row-data">${element.actual}</td>
                                    <td class="row-data">${element.actual}</td>
                                    <td class="row-data">${element.forecast.toFixed(2)}</td>
                                  </tr>`;
                    } else {
                        rows1 += `<tr>
                                    <td class="row-data">${element.month}</td>
                                    <td class="row-data">${element.actual === null ? 0 : element.actual}</td>
                                    <td class="row-data">${areProvMonthly.list_forecast[dataId1][index-1].forecast.toFixed(2)} + 0.9 ( ${areProvMonthly.list_forecast[dataId1][index-1].actual} - ${areProvMonthly.list_forecast[dataId1][index-1].forecast.toFixed(2)} )</td>
                                    <td class="row-data">${element.forecast.toFixed(2)}</td>
                                  </tr>`;
                    }
                });

                $("#targetProvince").html(`<table class="display table global-table">
                                            <thead class="list-view-head">
                                                <tr>
                                                    <th id="provinceHeading">Cases Month</th>
                                                    <th>Confirmed Cases</th>
                                                    <th>Forecasting Using Alpha ${0.9}</th>
                                                    <th>Result Forecast</th>
                                                </tr>
                                            </thead>
    
                                            <tbody class="list-view-ses">
                                                ${rows1}
                                            </tbody>
                                        </table>`);

                return [];
            } else {
                if (dataId === 'anruc2' && data === 'Select Province') {
                    return toastr.warning('Please Select the Province First!');
                }

                if (dataId1 === 'anruc3' && data1 === 'Select Year') {
                    return toastr.warning('Please Select the Year First!');
                }
            }
        } else {
            let data2 = $("#selectForecastProvince").val();
            let dataId2 = $("#selectForecastProvince").find('option:selected').data('id');

            if (dataId2 !== 'anruc2' && data2 !== 'Select Province') {
                let dataForecast = dataResultMeinKosu2.forecastYearlyProv;
                // let forecastYearlyProv = await startingSESprovByYear(dataResultMeinKosu2.actualDataProv, parseInt(dataId2));
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

                dataResultMeinKosu2.individualData.forEach(element => {
                    dataForecast.forEach(element1 => {
                        if (element.provinsi === element1.provinsi) {
                            element1.kasus_baru = element.kasus_total;
                            element1.meninggal_persen = element.meninggal_persen;
                            element1.sembuh_persen = element.sembuh_persen;
                            element1.last_date = element.last_date;
                        }
                    });
                });



                let indexProv = dataForecast.findIndex(ai => ai.provinsi === dataId2);
                let rows = `<div class="track-item">
                                <p class="track-item__title">Total Cases</p>
                                <h4 class="track-item__no infected">${dataForecast[indexProv].total_kasus}</h4>
                            </div>
                            <div class="track-item">
                                <p class="track-item__title">Forecasting (2023)</p>
                                <h4 class="track-item__no today_infected">${dataForecast[indexProv].list_forecast[2023].forecast.toFixed(2)}</h4>
                            </div>
                            <div class="track-item">
                                <p class="track-item__title">New Cases (${dataForecast[indexProv].last_date})</p>
                                <h4 class="track-item__no today_deaths">${dataForecast[indexProv].kasus_baru}</h4>
                            </div>
                            <div class="track-item">
                                <p class="track-item__title">Deaths <span>(${dataForecast[indexProv].last_date})</span></p>
                                <h4 class="track-item__no deaths">${dataForecast[indexProv].meninggal_persen.toFixed(2)}<span class="deaths-rate"></span> %</h4>
                            </div>
                            <div class="track-item">
                                <p class="track-item__title">Recovered <span>(${dataForecast[indexProv].last_date})</span></p>
                                <h4 class="track-item__no recovered">${dataForecast[indexProv].sembuh_persen.toFixed(2)}<span class="recover-rate"></span> %</h4>
                            </div>`;


                let areProvYearly = dataResultMeinKosu2.forecastYearlyProv.find(item => item.provinsi === dataId2);
                let rows1 = '';

                Object.entries(areProvYearly.list_forecast).map((item, index) => {
                    if (index === 0) {
                        rows1 += `<tr>
                                    <td class="row-data">${item[0]}</td>
                                    <td class="row-data">${areProvYearly.list_forecast[item[0]].actual === null ? 0 : areProvYearly.list_forecast[item[0]].actual}</td>
                                    <td class="row-data">${areProvYearly.list_forecast[item[0]].actual}</td>
                                    <td class="row-data">${areProvYearly.list_forecast[item[0]].forecast.toFixed(2)}</td>
                                  </tr>`;
                    } else {
                        rows1 += `<tr>
                                    <td class="row-data">${item[0]}</td>
                                    <td class="row-data">${areProvYearly.list_forecast[item[0]].actual === null ? 0 : areProvYearly.list_forecast[item[0]].actual}</td>
                                    <td class="row-data">${areProvYearly.list_forecast[item[0]-1].forecast.toFixed(2)} + 0.9 ( ${areProvYearly.list_forecast[item[0]-1].actual} - ${areProvYearly.list_forecast[item[0]-1].forecast.toFixed(2)} )</td>
                                    <td class="row-data">${areProvYearly.list_forecast[item[0]].forecast.toFixed(2)}</td>
                                  </tr>`;
                    }
                });

                $("#forAnrucDev2").html(rows);

                $("#targetProvince").html(`<table class="display table global-table">
                                            <thead class="list-view-head">
                                                <tr>
                                                    <th id="provinceHeading">Cases Year</th>
                                                    <th>Confirmed Cases</th>
                                                    <th>Forecasting Using Alpha ${0.9}</th>
                                                    <th>Result Forecast</th>
                                                </tr>
                                            </thead>
    
                                            <tbody class="list-view-ses">
                                                ${rows1}
                                            </tbody>
                                        </table>`);

                return [];
            } else {
                if (dataId2 === 'anruc2' || data2 === 'Select Province') {
                    return toastr.warning('Please Select Province First!');
                }
            }
        }
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}