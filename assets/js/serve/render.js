var main = 'mainPages',
    globalDomOverlay = '',
    dataTabel = [];

const meinKosuxxx = (data, order) => {
    return new Promise((resolve) => {
        console.log(data);
        // console.log(data);
        // $(`#${main}`).html('');
        // const bgCards = ['text-secondary', 'color-lavender-purple', 'color-light-orange', 'color-careys-pink',
        //     'color-lavender-purple', 'color-light-success'
        // ];
        // const iconCards = ['icofont-patient-file', 'icofont-doctor-alt', 'icofont-icu', 'icofont-hospital',
        //     'icofont-brand-designbump', 'icofont-ui-clock'
        // ];
        // const arrLabels = ['Total Schedule Month', 'Total Doctors', 'Total Rooms', 'Total Department', 'Total Shift', 'Total Day Off'];

        resolve(function () {
            // $(`#${main}`).html(`<div class="page-heading">
            //                         <h3>Dashboard</h3>
            //                     </div>

            //                     <div class="page-content">
            //                         <section class="row">
            //                             <div class="col-12 col-lg-12">
            //                                 <div class="row" id="TopTabulatedData">
            //                                     <div class="col-6 col-lg-3 col-md-6">
            //                                         <div class="card">
            //                                             <div class="card-body px-3 py-4-5">
            //                                                 <div class="row">
            //                                                     <div class="col-md-4">
            //                                                         <div class="stats-icon purple">
            //                                                             <i class="icon dripicons-archive"></i>
            //                                                         </div>
            //                                                     </div>
            //                                                     <div class="col-md-8">
            //                                                         <h6 class="text-muted font-semibold">Schedule</h6>
            //                                                         <h6 class="font-extrabold mb-0">112.000</h6>
            //                                                     </div>
            //                                                 </div>
            //                                             </div>
            //                                         </div>
            //                                     </div>
            //                                     <div class="col-6 col-lg-3 col-md-6">
            //                                         <div class="card">
            //                                             <div class="card-body px-3 py-4-5">
            //                                                 <div class="row">
            //                                                     <div class="col-md-4">
            //                                                         <div class="stats-icon blue">
            //                                                             <i class="iconly-boldProfile"></i>
            //                                                         </div>
            //                                                     </div>
            //                                                     <div class="col-md-8">
            //                                                         <h6 class="text-muted font-semibold">Dosen</h6>
            //                                                         <h6 class="font-extrabold mb-0">183.000</h6>
            //                                                     </div>
            //                                                 </div>
            //                                             </div>
            //                                         </div>
            //                                     </div>
            //                                     <div class="col-6 col-lg-3 col-md-6">
            //                                         <div class="card">
            //                                             <div class="card-body px-3 py-4-5">
            //                                                 <div class="row">
            //                                                     <div class="col-md-4">
            //                                                         <div class="stats-icon green">
            //                                                             <i class="icon dripicons-store"></i>
            //                                                         </div>
            //                                                     </div>
            //                                                     <div class="col-md-8">
            //                                                         <h6 class="text-muted font-semibold">Ruangan</h6>
            //                                                         <h6 class="font-extrabold mb-0">80.000</h6>
            //                                                     </div>
            //                                                 </div>
            //                                             </div>
            //                                         </div>
            //                                     </div>
            //                                     <div class="col-6 col-lg-3 col-md-6">
            //                                         <div class="card">
            //                                             <div class="card-body px-3 py-4-5">
            //                                                 <div class="row">
            //                                                     <div class="col-md-4">
            //                                                         <div class="stats-icon red">
            //                                                             <i class="iconly-boldBookmark"></i>
            //                                                         </div>
            //                                                     </div>
            //                                                     <div class="col-md-8">
            //                                                         <h6 class="text-muted font-semibold">Semester</h6>
            //                                                         <h6 class="font-extrabold mb-0">112</h6>
            //                                                     </div>
            //                                                 </div>
            //                                             </div>
            //                                         </div>
            //                                     </div>
            //                                 </div>
            //                             </div>

            //                         </section>
            //                         <section class="row">
            //                             <div class="col-md-12 col-lg-12 col-xl-12">
            //                                 ${myBGSVG_}
            //                             </div>
            //                         </section>
            //                     </div>`);
            // implementChartJS(data);
        }());
    });
}

const meinKosu = async () => {
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


    await renderSummaryCovid19(dataUpdateCovid19);
    await renderChartAsync(montlyChartData, 'monthly');
    await renderMapsProv(actualDataProv, dataUpdateCovid19);
    await renderCovid19Prov(individualData, forecastYearlyProv);



    console.log(individualData);
    console.log(requiredData);
    console.log(actualDataProv);
    console.log(actualGlobal);
    console.log(dataUpdateCovid19);
    console.log(forecastYearlyProv);

    return individualData;
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




const meinKosu1 = (data, order) => {
    return new Promise((resolve) => {

        $(".main-content-wrapper").addClass('p-0');
        resolve(function () {
            globalBigData = data;
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="map-widget map-report position-relative map-report" style="display: flex; flex-direction: row-reverse">

                                    <div class="corona-map-tracker">
                                        ${myMAPv}
                                    </div>

                                    <div class="map-content-wrap tracker-block tracker-block--4">
                                        <div class="tracker-block__body">
                                            <div class="select-country">
                                                <label for="select3" class="sr-only">Country</label>
                                                <select class="country" name="country"></select>
                                            </div>
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
            
                                </div>`);


            /*
             **  Map Report Activation
             */

            const mapReports = document.querySelectorAll('.map-report');

            if (mapReports) {
                mapReports.forEach((item, indx) => {
                    mapReport(item, 'BD');
                })
            }
        }())
    });
}

const meinKosu2 = (data, order) => {
    return new Promise((resolve) => {
        $(".main-content-wrapper").removeClass('p-0');
        resolve(function () {
            globalBigData = data;
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="badge-tracker-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 m-auto">
    
                        <div class="badge-tracker-item">
                            <div class="title-top" style="margin-top: 30px;">
                                <h4>Forecasting COVID-19 Using Single Exponential Smoothing Method</h4>
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
                            <div class="badge-content-wrapper">
                                <div class="badge-item worldwide-stats">
                                    <div class="badge-item__title">
                                        <p>COVID-19 Global Update</p>
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
    
    
                                <div class="badge-item worldwide-stats">
                                    <div class="badge-item__title badge-item__title--2">
                                        <p>COVID-19 Global Update</p>
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
    
                                <div class="badge-item badge-bg-yellow worldwide-stats">
                                    <div class="badge-item__title badge-title-bg-black">
                                        <p>COVID-19 Global Update</p>
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
    
                                <div class="badge-item badge-bg-green worldwide-stats">
                                    <div class="badge-item__title badge-title-bg-turquoise">
                                        <p>COVID-19 Global Update</p>
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
    
                                <div class="badge-item badge-bg-yellow worldwide-stats">
                                    <div class="badge-item__title badge-item__title--3 badge-title-bg-black">
                                        <p>COVID-19 Global Update</p>
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