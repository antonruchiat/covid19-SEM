async function fetchWithTimeout(resource, options = {
    method: 'GET',
    redirect: 'follow'
}) {
    showLoad();

    resource = `https://data.covid19.go.id/public/api/update.json`;

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


async function getRedirecting(paramsMenu, order) {
    try {
        let data = await fetching(_URLVALID, order);
        console.log(data);
        return await paramsMenu(data, order);
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}


const reserveMeinKosu = async (data, order) => {
    try {
        console.log(order);
        console.log(data);
        // const dataUpdateCovid19 = await gettingUpdateDataCovid19();
        // let dataProvinces = await gettingProvince('https://data.covid19.go.id/public/api/prov_list.json');
        // let individualData = await individualProvince(dataProvinces.makeDefaultProvinsi);
        // const requiredData = await dataRequired(dataProvinces.resultProvinsi, individualData);
        // let actualDataProv = await gettingActualCovid19(requiredData);
        // let actualGlobal = await gettingActualCovid19Global(actualDataProv);

        // let forecastMonthGlobal = await startingSESglobalByMonth(actualGlobal, 2022);
        // let montlyChartData = await geetingMonthlyChart(forecastMonthGlobal);


        // provinsi
        // let forecastYearlyProv = await startingSESprovByYear(actualDataProv, 2023);

        // console.log(individualData);
        // console.log(requiredData);
        // console.log(actualDataProv);
        // console.log(actualGlobal);
        // console.log(dataUpdateCovid19);
        // console.log(forecastYearlyProv);

        // await renderSummaryCovid19(dataUpdateCovid19);
        // await renderChartAsync(montlyChartData, 'monthly');
        // await renderMapsProv(actualDataProv, dataUpdateCovid19);
        // return await renderCovid19Prov(individualData, forecastYearlyProv);


        return [];
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}