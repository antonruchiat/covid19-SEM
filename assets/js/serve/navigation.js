/**
 *
 * You can write your code anywhere but dont just claim this project
 * because it will make it harder for you. Dont Forget that. anruc
 * 
 */

"use strict";
let covidProvinsi = [];

$(document).ready(function (e) {

});

// async function gettingDataBefore(origin, requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
// }) {
//     try {
//         let response = await fetch(origin, requestOptions);

//         const data = await response.json();
//         let resultProvinsi = data.list_data.map(a => a.key);

//         let makeDefaultProvinsi = [];
//         resultProvinsi.forEach(element => {
//             makeDefaultProvinsi.push(element.replace(/\s/gi, '_'));
//         });

//         let dataIndividualProvinsi = [];
//         await Promise.all(makeDefaultProvinsi.map(async (item) => {
//             let url = `https://data.covid19.go.id/public/api/prov_detail_${item}.json`;
//             let result = await fetch(url, requestOptions);
//             let data = await result.json();
//             dataIndividualProvinsi.push(data)
//         }));


//         let requiredData = [];
//         resultProvinsi.forEach((element, idx) => {
//             dataIndividualProvinsi.forEach((element1, idx1) => {
//                 element1.list_perkembangan.forEach((element2, idx2) => {
//                     if (element1.provinsi === element) {

//                         const itemExists = requiredData.some(item => item.provinsi == element1.provinsi);
//                         const index = requiredData.findIndex(ai => ai.provinsi == element1.provinsi);

//                         if (itemExists) {
//                             let existsYear = requiredData[index].list_perkembangan.hasOwnProperty(yearMonth(element2.tanggal, "y"));
//                             if (existsYear) {
//                                 const existsMonth = requiredData[index].list_perkembangan[yearMonth(element2.tanggal, "y")].listMonth.hasOwnProperty(yearMonth(element2.tanggal, "m"));
//                                 if (existsMonth) {
//                                     requiredData[index].list_perkembangan[yearMonth(element2.tanggal, "y")].listMonth[yearMonth(element2.tanggal, "m")].push({
//                                         AKUMULASI_DIRAWAT_OR_ISOLASI: element2.AKUMULASI_DIRAWAT_OR_ISOLASI,
//                                         AKUMULASI_KASUS: element2.AKUMULASI_KASUS,
//                                         AKUMULASI_MENINGGAL: element2.AKUMULASI_MENINGGAL,
//                                         AKUMULASI_SEMBUH: element2.AKUMULASI_SEMBUH,
//                                         DIRAWAT_OR_ISOLASI: element2.DIRAWAT_OR_ISOLASI,
//                                         KASUS: element2.KASUS,
//                                         MENINGGAL: element2.MENINGGAL,
//                                         SEMBUH: element2.SEMBUH,
//                                         TANGGAL: yearMonth(element2.tanggal, "d"),
//                                     });
//                                 } else {
//                                     requiredData[index].list_perkembangan[yearMonth(element2.tanggal, "y")].listMonth[yearMonth(element2.tanggal, "m")] = [{
//                                         AKUMULASI_DIRAWAT_OR_ISOLASI: element2.AKUMULASI_DIRAWAT_OR_ISOLASI,
//                                         AKUMULASI_KASUS: element2.AKUMULASI_KASUS,
//                                         AKUMULASI_MENINGGAL: element2.AKUMULASI_MENINGGAL,
//                                         AKUMULASI_SEMBUH: element2.AKUMULASI_SEMBUH,
//                                         DIRAWAT_OR_ISOLASI: element2.DIRAWAT_OR_ISOLASI,
//                                         KASUS: element2.KASUS,
//                                         MENINGGAL: element2.MENINGGAL,
//                                         SEMBUH: element2.SEMBUH,
//                                         TANGGAL: yearMonth(element2.tanggal, "d"),
//                                     }];

//                                 }

//                             } else {
//                                 requiredData[index].list_perkembangan[yearMonth(element2.tanggal, "y")] = {
//                                     origTime: element2.tanggal,
//                                     listMonth: {
//                                         [yearMonth(element2.tanggal, "m")]: [{
//                                             AKUMULASI_DIRAWAT_OR_ISOLASI: element2.AKUMULASI_DIRAWAT_OR_ISOLASI,
//                                             AKUMULASI_KASUS: element2.AKUMULASI_KASUS,
//                                             AKUMULASI_MENINGGAL: element2.AKUMULASI_MENINGGAL,
//                                             AKUMULASI_SEMBUH: element2.AKUMULASI_SEMBUH,
//                                             DIRAWAT_OR_ISOLASI: element2.DIRAWAT_OR_ISOLASI,
//                                             KASUS: element2.KASUS,
//                                             MENINGGAL: element2.MENINGGAL,
//                                             SEMBUH: element2.SEMBUH,
//                                             TANGGAL: yearMonth(element2.tanggal, "d"),
//                                         }]
//                                     },
//                                 };
//                             }
//                         } else {
//                             requiredData.push({
//                                 provinsi: element1.provinsi,
//                                 list_perkembangan: {
//                                     [yearMonth(element2.tanggal, "y")]: {
//                                         origTime: element2.tanggal,
//                                         listMonth: {
//                                             [yearMonth(element2.tanggal, "m")]: [{
//                                                 AKUMULASI_DIRAWAT_OR_ISOLASI: element2.AKUMULASI_DIRAWAT_OR_ISOLASI,
//                                                 AKUMULASI_KASUS: element2.AKUMULASI_KASUS,
//                                                 AKUMULASI_MENINGGAL: element2.AKUMULASI_MENINGGAL,
//                                                 AKUMULASI_SEMBUH: element2.AKUMULASI_SEMBUH,
//                                                 DIRAWAT_OR_ISOLASI: element2.DIRAWAT_OR_ISOLASI,
//                                                 KASUS: element2.KASUS,
//                                                 MENINGGAL: element2.MENINGGAL,
//                                                 SEMBUH: element2.SEMBUH,
//                                                 TANGGAL: yearMonth(element2.tanggal, "d"),
//                                             }]
//                                         },
//                                     },
//                                 }

//                             });
//                         }

//                     }

//                 });
//             });
//         });


//         covidProvinsi = [...requiredData];


//         console.log(data);
//         console.log(resultProvinsi);
//         console.log(makeDefaultProvinsi);
//         console.log(dataIndividualProvinsi);
//         console.log(covidProvinsi);
//         let sampleProv = await gettingSES(covidProvinsi);
//         console.log(sampleProv);
//         let for2021 = await startingSES(sampleProv, 2024, 'month');
//         console.log(for2021);

//         return resultProvinsi;
//     } catch (rejectedReason) {
//         console.log(rejectedReason);
//         return toastr.error('Error NetWork');
//     }
// }

// const gettingSES = prov => {
//     return new Promise((resolve) => {
//         prov.forEach(element => {
//             for (let key in element) {
//                 if (element.hasOwnProperty(key)) {
//                     if (key === 'list_perkembangan') {
//                         for (let key1 in element[key]) {
//                             if (element[key].hasOwnProperty(key1)) {
//                                 for (let key2 in element[key][key1]) {
//                                     if (element[key][key1].hasOwnProperty(key2)) {
//                                         if (key2 === 'listMonth') {
//                                             for (let key3 in element[key][key1][key2]) {
//                                                 if (element[key][key1][key2].hasOwnProperty(key3)) {
//                                                     const total = sumTotal(element[key][key1][key2][key3]);
//                                                     element[key][key1][key2][key3].total = total;
//                                                 }
//                                             }
//                                         }
//                                     }
//                                 }

//                             }
//                         }

//                     }
//                 }
//             }
//         });

//         let totalInYear = 0;
//         prov.forEach(element => {
//             for (let key in element) {
//                 if (element.hasOwnProperty(key)) {
//                     if (key === 'list_perkembangan') {
//                         for (let key1 in element[key]) {
//                             if (element[key].hasOwnProperty(key1)) {
//                                 for (let key2 in element[key][key1]) {
//                                     if (element[key][key1].hasOwnProperty(key2)) {
//                                         if (key2 === 'listMonth') {
//                                             for (let key3 in element[key][key1][key2]) {
//                                                 if (element[key][key1][key2].hasOwnProperty(key3)) {
//                                                     totalInYear += element[key][key1][key2][key3].total;
//                                                 }
//                                             }
//                                         }
//                                         element[key][key1].totalYear = totalInYear;
//                                     }
//                                 }

//                             }
//                         }

//                     }
//                 }
//             }
//         });
//         resolve(prov);
//     });
// }

// const startingSES = (dataProv, year, type) => {
//     return new Promise((resolve) => {
//         let currentYearMont = currentYearMonth();
//         let result;
//         let dataHistory;
//         let dataForecast = [];

//         if (type === 'month') {
//             dataHistory = gettingHistoryData(dataProv, year);

//             if (dataHistory.length === 0) {
//                 dataHistory = gettingHistoryData(dataProv, year - 1);
//                 result = SESalgoritm(dataHistory, year - 1);
//                 if (((parseInt(year) - parseInt(currentYearMont.year)) === 1) && parseInt(currentYearMont.month) === 12) {
//                     result.forEach(element => {
//                         for (let key in element) {
//                             if (element.hasOwnProperty.call(element, key)) {
//                                 if (key !== 'provinsi') {

//                                     for (let key1 in element[key]) {
//                                         if (element[key].hasOwnProperty.call(element[key], key1)) {

//                                             let itemExists = result.some(item => item.provinsi == element.provinsi);
//                                             let index = result.findIndex(ai => ai.provinsi == element.provinsi);

//                                             if (itemExists) {
//                                                 let checkYear = result[index].list_forecast.hasOwnProperty([year]);
//                                                 if (!checkYear) {
//                                                     result[index].list_forecast[year] = [{
//                                                         month: `${key2.split("-")[0]}-01`,
//                                                         forecast: result[index].list_forecast[year - 1][11].forecast + (0.9 * (dataHistory[indexCheckProv][year - 1].listMonth["2021-12"].total - result[index].list_forecast[year - 1][11].forecast)),
//                                                         actual: null,
//                                                         error: (result[index].list_forecast[year].actual ? (result[index].list_forecast[year].actual - result[index].list_forecast[year].forecast) : null),
//                                                     }];
//                                                 }
//                                             }
//                                         }
//                                     }

//                                 }
//                             }
//                         }
//                     });
//                 } else if (((parseInt(year) - parseInt(currentYearMont.year)) === 1) && parseInt(currentYearMont.month) < 12) {
//                     result.forEach(element => {
//                         for (let key in element) {
//                             if (element.hasOwnProperty.call(element, key)) {
//                                 if (key !== 'provinsi') {

//                                     for (let key1 in element[key]) {
//                                         if (element[key].hasOwnProperty.call(element[key], key1)) {
//                                             if (element[key][key1].length < 12) {
//                                                 element[key][key1].forEach((item, idxItem) => {
//                                                     if (parseInt(idxItem) === element[key][key1].length - 1) {
//                                                         let itemExists = result.some(item => item.provinsi == element.provinsi);
//                                                         let index = result.findIndex(ai => ai.provinsi == element.provinsi);

//                                                         if (itemExists) {
//                                                             let tmpIndex = item.month.split("-")[1];
//                                                             tmpIndex = parseInt(tmpIndex) + 1;
//                                                             tmpIndex = to2Digit(tmpIndex);
//                                                             tmpIndex = `${item.month.split("-")[0]}-${tmpIndex}`;

//                                                             result[index].list_forecast[key1].push({
//                                                                 month: tmpIndex,
//                                                                 forecast: item.forecast + (0.9 * (item.actual - item.forecast)),
//                                                                 actual: null,
//                                                                 error: (result[index].list_forecast[key1].actual ? (result[index].list_forecast[key1].actual - result[index].list_forecast[key1].forecast) : null),
//                                                             });
//                                                         }
//                                                     }
//                                                 });
//                                             }
//                                         }
//                                     }

//                                 }
//                             }
//                         }
//                     });
//                 } else {
//                     console.log("Data Forecasting Terlalu Jauh");
//                 }
//             } else {
//                 if (parseInt(year) < parseInt(currentYearMont.year)) {
//                     result = SESalgoritm(dataHistory, year);
//                 } else if (parseInt(year) === parseInt(currentYearMont.year) && parseInt(currentYearMont.month) < 12) {
//                     result = SESalgoritm(dataHistory, year);
//                     result.forEach(element => {
//                         for (let key in element) {
//                             if (element.hasOwnProperty.call(element, key)) {
//                                 if (key !== 'provinsi') {
//                                     for (let key1 in element[key]) {
//                                         if (element[key].hasOwnProperty.call(element[key], key1)) {
//                                             if (element[key][key1].length < 12) {
//                                                 element[key][key1].forEach((item, idxItem) => {
//                                                     if (parseInt(idxItem) === element[key][key1].length - 1) {
//                                                         let itemExists = result.some(item => item.provinsi == element.provinsi);
//                                                         let index = result.findIndex(ai => ai.provinsi == element.provinsi);

//                                                         if (itemExists) {
//                                                             let tmpIndex = item.month.split("-")[1];
//                                                             tmpIndex = parseInt(tmpIndex) + 1;
//                                                             tmpIndex = to2Digit(tmpIndex);
//                                                             tmpIndex = `${item.month.split("-")[0]}-${tmpIndex}`;

//                                                             result[index].list_forecast[key1].push({
//                                                                 month: tmpIndex,
//                                                                 forecast: item.forecast + (0.9 * (item.actual - item.forecast)),
//                                                                 actual: null,
//                                                                 error: (result[index].list_forecast[key1].actual ? (result[index].list_forecast[key1].actual - result[index].list_forecast[key1].forecast) : null),
//                                                             });
//                                                         }
//                                                     }
//                                                 });
//                                             }
//                                         }
//                                     }

//                                 }
//                             }
//                         }
//                     });
//                 } else if (parseInt(year) === parseInt(currentYearMont.year) && parseInt(currentYearMont.month) === 12) {
//                     result = SESalgoritm(dataHistory, year);
//                 } else {
//                     console.log("Data Forecasting Terlalu Jauh");
//                 }
//             }
//         } else {
//             if ((((parseInt(year) - parseInt(currentYearMont.year)) <= 1) && parseInt(year) > 2019)) {
//                 dataHistory = [];
//                 dataProv.forEach(element => {
//                     for (let key in element) {
//                         if (element.hasOwnProperty(key)) {
//                             if (key === 'list_perkembangan') {
//                                 for (let key1 in element[key]) {
//                                     if (element[key].hasOwnProperty(key1)) {
//                                         if (parseInt(key1) <= parseInt(year)) {
//                                             let existsProv = dataHistory.some(item => item.provinsi === element.provinsi);
//                                             let indexExistsProv = dataHistory.findIndex(ai => ai.provinsi === element.provinsi);

//                                             if (existsProv) {
//                                                 dataHistory[indexExistsProv][key1] = element[key][key1];
//                                             } else {
//                                                 dataHistory.push({
//                                                     provinsi: element.provinsi,
//                                                     [key1]: element[key][key1],
//                                                 });
//                                             }
//                                         }
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 });

//                 if (dataHistory.length > 0) {

//                     dataHistory.forEach(element => {
//                         for (let key in element) {
//                             if (element.hasOwnProperty.call(element, key)) {
//                                 if (key !== 'provinsi') {

//                                     for (let key1 in element[key]) {
//                                         if (element[key].hasOwnProperty.call(element[key], key1)) {

//                                             if (key1 === 'listMonth') {
//                                                 for (let key2 in element[key][key1]) {
//                                                     if (element[key][key1].hasOwnProperty.call(element[key][key1], key2)) {
//                                                         let existsProv = dataForecast.some(item => item.provinsi === element.provinsi);
//                                                         let indexProv = dataForecast.findIndex(ai => ai.provinsi === element.provinsi);

//                                                         if (!existsProv) {
//                                                             dataForecast.push({
//                                                                 provinsi: element.provinsi,
//                                                                 list_forecast: {
//                                                                     [key]: {
//                                                                         forecast: element[key].totalYear,
//                                                                         actual: element[key].totalYear,
//                                                                         error: (element[key].totalYear ? (element[key].totalYear - element[key].totalYear) : null),
//                                                                     }
//                                                                 },
//                                                             });
//                                                         } else {
//                                                             if (existsProv) {
//                                                                 let existsYear = dataForecast[indexProv].list_forecast.hasOwnProperty([key]);

//                                                                 if (!existsYear) {
//                                                                     let cheklength = Object.keys(dataForecast[indexProv].list_forecast).length;
//                                                                     if (cheklength > 0) {
//                                                                         dataForecast[indexProv].list_forecast[key] = {
//                                                                             forecast: dataForecast[indexProv].list_forecast[parseInt(key) - 1].forecast + (0.9 * (element[parseInt(key) - 1].totalYear - dataForecast[indexProv].list_forecast[parseInt(key) - 1].forecast)),
//                                                                             actual: element[key].totalYear,
//                                                                             error: (element[key].totalYear ? (element[key].totalYear - (dataForecast[indexProv].list_forecast[parseInt(key) - 1].forecast + (0.9 * (element[parseInt(key) - 1].totalYear - dataForecast[indexProv].list_forecast[parseInt(key) - 1].forecast)))) : null),
//                                                                         }
//                                                                     }
//                                                                 }
//                                                             }
//                                                         }

//                                                     }

//                                                 }
//                                             }

//                                         }
//                                     }

//                                 }
//                             }
//                         }
//                     });

//                     if ((parseInt(year) - parseInt(currentYearMont.year)) === 1) {
//                         dataForecast.forEach(element => {
//                             for (let key in element) {
//                                 if (element.hasOwnProperty.call(element, key)) {
//                                     if (key !== 'provinsi') {

//                                         for (let key1 in element[key]) {
//                                             if (element[key].hasOwnProperty.call(element[key], key1)) {

//                                                 let existsProv = dataForecast.some(item => item.provinsi === element.provinsi);
//                                                 let indexProv = dataForecast.findIndex(ai => ai.provinsi === element.provinsi);

//                                                 if (existsProv) {
//                                                     let existsYear = dataForecast[indexProv].list_forecast.hasOwnProperty([year]);

//                                                     if (!existsYear) {
//                                                         dataForecast[indexProv].list_forecast[year] = {
//                                                             forecast: dataForecast[indexProv].list_forecast[year - 1].forecast + (0.9 * (element[key][year - 1].actual - dataForecast[indexProv].list_forecast[year - 1].forecast)),
//                                                             actual: null,
//                                                             error: (this.actual ? (this.actual - this.forecast) : null),
//                                                             // error: ,
//                                                         }
//                                                     }
//                                                 }

//                                             }
//                                         }

//                                     }
//                                 }
//                             }
//                         });
//                     }

//                 }
//             } else {
//                 console.log("Data Forecasting Terlalu Jauh");
//             }
//         }

//         console.log(dataHistory);
//         console.log(result);
//         console.log(dataForecast);

//         resolve([]);
//     });
// }




function selectMenu(idmenu) {
    if (idmenu === 'meinKosu') {
        // gettingMenuAsync(meinKosu, 'meinKosu');
        meinKosu();
    } else if (idmenu === 'meinKosu1') {
        // gettingMenuAsync(meinKosu1, 'meinKosu1');
        meinKosu1();
    } else if (idmenu === 'meinKosu2') {
        // gettingMenuAsync(meinKosu2, 'meinKosu2');
        // meinKosu2()
        meinKosu2iii();
    } else if (idmenu === 'meinKosu3') {

        // return gettingUpdateDataCovid19();

        // gettingMenuAsync(meinKosu3, 'meinKosu3');
        // let data = getDataCOVID19anruc();
        // console.log(data);
        // return data;
        // async () => {
        //     try {
        //         var requestOptions = {
        //             method: 'GET',
        //             redirect: 'follow'
        //         };
        //         let data = (await fetch("https://data.covid19.go.id/public/api/prov.json")).json();
        //         console.log(data);
        //         return data;
        //     } catch (error) {
        //         console.log("error");
        //     }
        // }

        // var requestOptions = {
        //     method: 'GET',
        //     redirect: 'follow'
        // };

        // fetch("https://data.covid19.go.id/public/api/prov.json", requestOptions)
        //     .then(response => response.json())
        //     .then(result => console.log(result))
        // .catch(error => console.log('error', error));

        // let dataProvinsi = gettingDataBefore("https://data.covid19.go.id/public/api/prov_list.json");

    }
}

async function gettingMenuAsync(paramsMenu, order) {
    try {
        let makeDefaultProvinsi = [];

        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let origin = "https://data.covid19.go.id/public/api/prov_list.json";
        let response = await fetch(origin, requestOptions);
        const data = await response.json();
        let resultProvinsi = data.list_data.map(a => a.key);

        resultProvinsi.forEach(element => {
            makeDefaultProvinsi.push(element.replace(/\s/gi, '_'));
        });

        // console.log({
        //     resultProvinsi: resultProvinsi,
        //     makeDefaultProvinsi: makeDefaultProvinsi,
        // });

        return await paramsMenu({
            resultProvinsi: resultProvinsi,
            makeDefaultProvinsi: makeDefaultProvinsi,
        }, order);



        // let data = await fetching(_URLVALID, order);
        // let data = '';
        // if (parseInt(data) === 0) {
        //     return await auth(data);
        // }
        // return await paramsMenu(data, order);
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}




//TODO!! Every Close Button
$(".btnCloseOverlay").click(() => {
    closeOverlayForm();
});

$(".btnCloseOverlayDelete").click(() => {
    closeOverlayDelete();
});

//TODO!! Navigation Button
$(document).on('click', '.addRoom', () => {
    processingData('modifiedRoom', 'new');
});

$(document).on('click', '.editRoom', () => {
    processingData('modifiedRoom', 'edit');
});

$(document).on('click', '.deleteRoom', () => {
    deleteItem('modifiedRoom', 'delete');
});



$(document).on('click', '#btnMonth', () => {
    renderChartOption('monthly');
});

$(document).on('click', '#btnYear', () => {
    renderChartOption('yearly');
});


// $("#SettingApps").click(() => {
//     return resetApp("identity");
// });

// $(document).on('click', '#updateAppSetting', () => {
//     processingData('modifiedAppSettings', 'edit');
// });