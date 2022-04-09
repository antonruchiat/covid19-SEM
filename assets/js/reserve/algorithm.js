async function fetchWithTimeout(resource, options = {
    method: 'GET',
    redirect: 'follow'
}) {
    showLoad();

    const {
        timeout = 8000
    } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });

    const data = await response.json();
    clearTimeout(id);
    hideLoad();
    return data;
}

async function fetchWithTimeout_Modified(resource, options = {
    method: 'GET',
    redirect: 'follow'
}) {
    showLoad();

    const {
        timeout = 8000
    } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });

    const data = await response.json();
    let resultProvinsi = data.list_data.map(a => a.key);

    let makeDefaultProvinsi = [];
    resultProvinsi.forEach(element => {
        makeDefaultProvinsi.push(element.replace(/\s/gi, '_'));
    });

    clearTimeout(id);
    hideLoad();
    return {
        resultProvinsi: resultProvinsi,
        makeDefaultProvinsi: makeDefaultProvinsi,
    };
}

async function fetchWithTimeoutChain(options = {
    method: 'GET',
    redirect: 'follow'
}, data) {
    showLoad();

    let dataIndividualProvinsi = [];
    const {
        timeout = 8000
    } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);


    await Promise.all(data.map(async (item) => {
        let resource = `https://data.covid19.go.id/public/api/prov_detail_${item}.json`;
        let response = await fetch(resource, {
            ...options,
            signal: controller.signal
        });
        let data = await response.json();
        dataIndividualProvinsi.push(data);
    }));

    clearTimeout(id);
    hideLoad();
    return dataIndividualProvinsi;
}


async function gettingRedirect(paramsMenu, order) {
    try {
        let data = await fetching(_URLVALID, order);
        console.log(data);
        return await paramsMenu(data, order);
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}


const reserveMeinKosu = async data => {
    try {
        console.log(data);

        let dataUpdateCovid19 = data.dataUpdateCovid19;
        let dataProvinces = data.dataProvinces;
        let individualData = data.individualData;


        let requiredData = await dataRequired(dataProvinces.resultProvinsi, individualData);
        let actualDataProv = await gettingActualCovid19(requiredData);
        let actualGlobal = await gettingActualCovid19Global(actualDataProv);

        let forecastMonthGlobal = await startingSESglobalByMonth(actualGlobal, 2022);
        let montlyChartData = await geetingMonthlyChart(forecastMonthGlobal);


        // provinsi
        let forecastYearlyProv = await startingSESprovByYear(actualDataProv, 2023);

        await renderSummaryCovid19(dataUpdateCovid19);
        await renderChartAsync(montlyChartData, 'monthly');
        await renderMapsProv(actualDataProv, dataUpdateCovid19);
        return await renderCovid19Prov(individualData, forecastYearlyProv);
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const reserveMeinKosu1 = async data => {
    try {
        console.log(data);

        let dataProvinces = data.dataProvinces;
        let individualData = data.individualData;


        let requiredData = await dataRequired(dataProvinces.resultProvinsi, individualData);
        let actualDataProv = await gettingActualCovid19(requiredData);
        let forecastYearlyProv = await startingSESprovByYear(actualDataProv, 2023);

        return await renderMapsProvTab(actualDataProv, individualData, forecastYearlyProv);
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const reserveMeinKosu2 = async data => {
    try {
        console.log(data);

        let dataUpdateCovid19 = data.dataUpdateCovid19;
        let dataProvinces = data.dataProvinces;
        let individualData = data.individualData;


        let requiredData = await dataRequired(dataProvinces.resultProvinsi, individualData);
        let actualDataProv = await gettingActualCovid19(requiredData);
        let actualGlobal = await gettingActualCovid19Global(actualDataProv);

        let forecastMonthGlobal = await startingSESglobalByMonth(actualGlobal, 2022);
        let forecastYearGlobal = await startingSESglobalByYear(actualGlobal, 2023);


        // provinsi
        let forecastYearlyProv = await startingSESprovByYear(actualDataProv, 2023);
        let forecastMonthlyProv = await startingSESprovByMonth(actualDataProv, 2022);

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

        return await renderMeinKosu2(dataSend);
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}