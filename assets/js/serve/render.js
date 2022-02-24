var main = 'mainPages',
    globalDomOverlay = '',
    dataTabel = [];

const meinKosu = (data, order) => {
    return new Promise((resolve) => {
        console.log(data);
        $(`#${main}`).html('');
        const bgCards = ['text-secondary', 'color-lavender-purple', 'color-light-orange', 'color-careys-pink',
            'color-lavender-purple', 'color-light-success'
        ];
        const iconCards = ['icofont-patient-file', 'icofont-doctor-alt', 'icofont-icu', 'icofont-hospital',
            'icofont-brand-designbump', 'icofont-ui-clock'
        ];
        const arrLabels = ['Total Schedule Month', 'Total Doctors', 'Total Rooms', 'Total Department', 'Total Shift', 'Total Day Off'];

        resolve(function () {
            $(`#${main}`).html(`<div class="page-heading">
                                    <h3>Dashboard</h3>
                                </div>
                                
                                <div class="page-content">
                                    <section class="row">
                                        <div class="col-12 col-lg-12">
                                            <div class="row" id="TopTabulatedData">
                                                <div class="col-6 col-lg-3 col-md-6">
                                                    <div class="card">
                                                        <div class="card-body px-3 py-4-5">
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <div class="stats-icon purple">
                                                                        <i class="icon dripicons-archive"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-8">
                                                                    <h6 class="text-muted font-semibold">Schedule</h6>
                                                                    <h6 class="font-extrabold mb-0">112.000</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-6 col-lg-3 col-md-6">
                                                    <div class="card">
                                                        <div class="card-body px-3 py-4-5">
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <div class="stats-icon blue">
                                                                        <i class="iconly-boldProfile"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-8">
                                                                    <h6 class="text-muted font-semibold">Dosen</h6>
                                                                    <h6 class="font-extrabold mb-0">183.000</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-6 col-lg-3 col-md-6">
                                                    <div class="card">
                                                        <div class="card-body px-3 py-4-5">
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <div class="stats-icon green">
                                                                        <i class="icon dripicons-store"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-8">
                                                                    <h6 class="text-muted font-semibold">Ruangan</h6>
                                                                    <h6 class="font-extrabold mb-0">80.000</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-6 col-lg-3 col-md-6">
                                                    <div class="card">
                                                        <div class="card-body px-3 py-4-5">
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <div class="stats-icon red">
                                                                        <i class="iconly-boldBookmark"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-8">
                                                                    <h6 class="text-muted font-semibold">Semester</h6>
                                                                    <h6 class="font-extrabold mb-0">112</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                    <section class="row">
                                        <div class="col-md-12 col-lg-12 col-xl-12">
                                            ${myBGSVG_}
                                        </div>
                                    </section>
                                </div>`);
            implementChartJS(data);
        }());
    });
}

const meinKosu1 = (data, order) => {
    return new Promise((resolve) => {

        $(".main-content-wrapper").addClass('p-0');
        resolve(function () {
            globalBigData = data;
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="map-widget map-report position-relative map-report">
            <div class="corona-map-tracker" id="tracker-map"></div>

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
                                            <div class="col-lg-9 m-auto">
                                                <div class="badge-tracker-item">
                                                    <div class="title-top">
                                                        <h2>Headline Badge Style</h2>
                                                    </div>
                            
                                                    <div class="badge-content-wrapper">
                                                        <!-- Badge Item 01 -->
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
                                                        <!-- Badge Item 01 -->
                            
                                                        <!-- Badge Item 02 -->
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
                                                        <!-- Badge Item 02 -->
                            
                                                        <!-- Badge Item 03 -->
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
                                                        <!-- Badge Item 03 -->
                            
                                                        <!-- Badge Item 04 -->
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
                                                        <!-- Badge Item 04 -->
                            
                                                        <!-- Badge Item 05 -->
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
                                                        <!-- Badge Item 05 -->
                                                    </div>
                                                </div>

                                                <div class="badge-tracker-item">
                                                    <div class="title-top">
                                                        <h2>Headline Round Style</h2>
                                                    </div>
                            
                                                    <div class="headline-round-content mtn-25 worldwide-stats">
                                                        <div class="row ">
                                                            <div class="col-lg-6">
                                                                <div class="tracker-block tracker-block--5">
                                                                    <div class="track-item">
                                                                        <p class="track-item__title">Total Cases</p>
                                                                        <h4 class="track-item__no infected">0,000,000</h4>
                                                                        <h6 class="track-item__new">New: +<span class="today_infected">00</span></h6>
                                                                    </div>
                                                                    <div class="track-item">
                                                                        <p class="track-item__title">Total Deaths</p>
                                                                        <h4 class="track-item__no deaths">0,000,000</h4>
                                                                        <h6 class="track-item__new">New: +<span class="today_deaths">00</span></h6>
                                                                    </div>
                                                                    <div class="track-item">
                                                                        <p class="track-item__title">Total Recovered</p>
                                                                        <h4 class="track-item__no recovered">0,000,000</h4>
                                                                        <h6 class="track-item__new">New: +<span class="today_recovered">00</span></h6>
                                                                    </div>
                                                                    <div class="track-item">
                                                                        <p class="track-item__title">Active Cases</p>
                                                                        <h4 class="track-item__no current_cases">0,000,000</h4>
                                                                        <h6 class="track-item__new">New: +<span class="today_active_cases">00</span></h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                            
                                                            <div class="col-lg-6">
                                                                <div class="tracker-block tracker-block--5 bg-yellow">
                                                                    <div class="track-item">
                                                                        <p class="track-item__title">Total Cases</p>
                                                                        <h4 class="track-item__no infected">0,000,000</h4>
                                                                        <h6 class="track-item__new">New: +<span class="today_infected">00</span></h6>
                                                                    </div>
                                                                    <div class="track-item">
                                                                        <p class="track-item__title">Total Deaths</p>
                                                                        <h4 class="track-item__no deaths">0,000,000</h4>
                                                                        <h6 class="track-item__new">New: +<span class="today_deaths">00</span></h6>
                                                                    </div>
                                                                    <div class="track-item">
                                                                        <p class="track-item__title">Total Recovered</p>
                                                                        <h4 class="track-item__no recovered">0,000,000</h4>
                                                                        <h6 class="track-item__new">New: +<span class="today_recovered">00</span></h6>
                                                                    </div>
                                                                    <div class="track-item">
                                                                        <p class="track-item__title">Active Cases</p>
                                                                        <h4 class="track-item__no current_cases">0,000,000</h4>
                                                                        <h6 class="track-item__new">New: +<span class="today_active_cases">00</span></h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="badge-tracker-item">
                                                    <div class="title-top">
                                                        <h2>Mini Chart</h2>
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



            /*
             **  Mini Chart Activation
             */

            miniChart();
        }())
    });
}