async function gettingDataBeforeCAD(origin, requestOptions = {
    method: 'GET',
    redirect: 'follow'
}) {
    try {
        // paramsMenu, params, order
        // let assign = await reAssign(params, order);
        // if (assign.isCheck) {
        //     let orderFor = (order == 'scheduleInfoMonth' ? 'schedulInfoByMonth' : (order == 'scheduleInfoMonth1' ? 'schedulInfoByMonth1' : 'shownSchedulingRoom'));
        //     let response = await dispatch(_URLVALID, orderFor, assign.data);
        //     if (parseInt(response) === 0) {
        //         return await auth(data);
        //     }
        //     console.log(response);
        //     return await paramsMenu(response, order);
        // }


        // fetch("https://data.covid19.go.id/public/api/prov_detail_DKI_JAKARTA.json", requestOptions);
        // let response = await fetch("https://data.covid19.go.id/public/api/prov_list.json", requestOptions);

        // makeDefaultProvinsi.forEach(element => {
        //     // let individualProvinsi = await fetch(`https://data.covid19.go.id/public/api/prov_detail_${element}.json`, requestOptions);
        //     // let responseIndividualProvinsi = await individualProvinsi.json();
        //     // dataIndividualProvinsi.push(responseIndividualProvinsi);

        //     fetch(`https://data.covid19.go.id/public/api/prov_detail_${element}.json`, requestOptions)
        //         .then(response => response.json())
        //         .then(result => dataIndividualProvinsi.push(result));
        // });




        let response = await fetch(origin, requestOptions);
        const data = await response.json();
        let resultProvinsi = data.list_data.map(a => a.key);

        let makeDefaultProvinsi = [];
        resultProvinsi.forEach(element => {
            makeDefaultProvinsi.push(element.replace(/\s/gi, '_'));
        });

        let dataIndividualProvinsi = [];
        await Promise.all(makeDefaultProvinsi.map(async (item) => {
            let url = `https://data.covid19.go.id/public/api/prov_detail_${item}.json`;
            let result = await fetch(url, requestOptions);
            let data = await result.json();
            dataIndividualProvinsi.push(data)
        }));

        let requiredData = [];
        resultProvinsi.forEach((element, idx) => {
            dataIndividualProvinsi.forEach((element1, idx1) => {
                element1.list_perkembangan.forEach((element2, idx2) => {
                    if (element1.provinsi === element) {

                        const itemExists = requiredData.some(item => item.provinsi == element1.provinsi);
                        const index = requiredData.findIndex(ai => ai.provinsi == element1.provinsi);

                        if (itemExists) {
                            let existsYear = requiredData[index].list_perkembangan.hasOwnProperty(yearMonth(element2.tanggal, "y"));
                            if (existsYear) {
                                const existsMonth = requiredData[index].list_perkembangan[yearMonth(element2.tanggal, "y")].listMonth.hasOwnProperty(yearMonth(element2.tanggal, "m"));
                                if (existsMonth) {
                                    requiredData[index].list_perkembangan[yearMonth(element2.tanggal, "y")].listMonth[yearMonth(element2.tanggal, "m")].push({
                                        AKUMULASI_DIRAWAT_OR_ISOLASI: element2.AKUMULASI_DIRAWAT_OR_ISOLASI,
                                        AKUMULASI_KASUS: element2.AKUMULASI_KASUS,
                                        AKUMULASI_MENINGGAL: element2.AKUMULASI_MENINGGAL,
                                        AKUMULASI_SEMBUH: element2.AKUMULASI_SEMBUH,
                                        DIRAWAT_OR_ISOLASI: element2.DIRAWAT_OR_ISOLASI,
                                        KASUS: element2.KASUS,
                                        MENINGGAL: element2.MENINGGAL,
                                        SEMBUH: element2.SEMBUH,
                                        TANGGAL: yearMonth(element2.tanggal, "d"),
                                    });
                                } else {
                                    requiredData[index].list_perkembangan[yearMonth(element2.tanggal, "y")].listMonth[yearMonth(element2.tanggal, "m")] = [{
                                        AKUMULASI_DIRAWAT_OR_ISOLASI: element2.AKUMULASI_DIRAWAT_OR_ISOLASI,
                                        AKUMULASI_KASUS: element2.AKUMULASI_KASUS,
                                        AKUMULASI_MENINGGAL: element2.AKUMULASI_MENINGGAL,
                                        AKUMULASI_SEMBUH: element2.AKUMULASI_SEMBUH,
                                        DIRAWAT_OR_ISOLASI: element2.DIRAWAT_OR_ISOLASI,
                                        KASUS: element2.KASUS,
                                        MENINGGAL: element2.MENINGGAL,
                                        SEMBUH: element2.SEMBUH,
                                        TANGGAL: yearMonth(element2.tanggal, "d"),
                                    }];

                                }

                            } else {
                                requiredData[index].list_perkembangan[yearMonth(element2.tanggal, "y")] = {
                                    origTime: element2.tanggal,
                                    listMonth: {
                                        [yearMonth(element2.tanggal, "m")]: [{
                                            AKUMULASI_DIRAWAT_OR_ISOLASI: element2.AKUMULASI_DIRAWAT_OR_ISOLASI,
                                            AKUMULASI_KASUS: element2.AKUMULASI_KASUS,
                                            AKUMULASI_MENINGGAL: element2.AKUMULASI_MENINGGAL,
                                            AKUMULASI_SEMBUH: element2.AKUMULASI_SEMBUH,
                                            DIRAWAT_OR_ISOLASI: element2.DIRAWAT_OR_ISOLASI,
                                            KASUS: element2.KASUS,
                                            MENINGGAL: element2.MENINGGAL,
                                            SEMBUH: element2.SEMBUH,
                                            TANGGAL: yearMonth(element2.tanggal, "d"),
                                        }]
                                    },
                                };
                            }
                        } else {
                            requiredData.push({
                                provinsi: element1.provinsi,
                                list_perkembangan: {
                                    [yearMonth(element2.tanggal, "y")]: {
                                        origTime: element2.tanggal,
                                        listMonth: {
                                            [yearMonth(element2.tanggal, "m")]: [{
                                                AKUMULASI_DIRAWAT_OR_ISOLASI: element2.AKUMULASI_DIRAWAT_OR_ISOLASI,
                                                AKUMULASI_KASUS: element2.AKUMULASI_KASUS,
                                                AKUMULASI_MENINGGAL: element2.AKUMULASI_MENINGGAL,
                                                AKUMULASI_SEMBUH: element2.AKUMULASI_SEMBUH,
                                                DIRAWAT_OR_ISOLASI: element2.DIRAWAT_OR_ISOLASI,
                                                KASUS: element2.KASUS,
                                                MENINGGAL: element2.MENINGGAL,
                                                SEMBUH: element2.SEMBUH,
                                                TANGGAL: yearMonth(element2.tanggal, "d"),
                                            }]
                                        },
                                    },
                                }

                            });
                        }

                    }

                });
            });
        });
        covidProvinsi = [...requiredData];


        console.log(data);
        console.log(resultProvinsi);
        console.log(makeDefaultProvinsi);
        console.log(dataIndividualProvinsi);
        console.log(covidProvinsi);
        let sampleProv = await gettingSES(covidProvinsi);
        console.log(sampleProv);
        let for2021 = await startingSES(sampleProv, 2024, 'month');
        console.log(for2021);

        return resultProvinsi;
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}


async function startingAlgorithm() {
    try {

        toastr.warning('Pilihan Bulan Tidak Boleh Kosong');
        toastr.warning('Pilihan Unit Instalasi Tidak Boleh Kosong');
        return toastr.warning('Data Required! Data Tidak Lengkap');
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}

const inisialitationData = data => {
    return new Promise((resolve) => {
        let resultSchedule
        resolve(resultSchedule);
    });
}

async function serveResponse(data) {
    try {
        // let assign = await reAssign(data, 'createNewSchedule');
        // if (assign.isCheck) {
        //     let response = await dispatch(_URLVALID, 'createNewSchedule', assign.data);
        //     console.log(response);
        //     closeOverlayForm();
        //     toastr.success(`Success ${response.message}`);
        //     return gettingShowSchedule(`${data.tahun}.${data.bulan}.${data.Id_room}`, 'byRoom');
        // }
        return toastr.warning('Data Required! Data Tidak Lengkap');
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}


// if (element1.provinsi === element) {
//     const itemExists = element.list_perkembangan.some(item => yearMonth(item.tanggal, "y") == yearMonth(element1.list_perkembangan.tanggal, "y"));
//     const index = element.list_perkembangan.findIndex(ai => yearMonth(ai.tanggal, "y") == yearMonth(element1.list_perkembangan.tanggal, "y"));
//     if (itemExists) {
//         // requiredData[index].isTime.push({
//         //     shift: element.shift,
//         //     Id_praktikum: element.Id_praktikum,
//         //     kode_praktikum: element.kode_praktikum,
//         //     nama_praktikum: element.nama_praktikum,
//         //     Id_dosen: element.Id_dosen,
//         //     nama_dosen: element.nama_dosen,
//         // });
//     } else {
//         requiredData.list_perkembangan.push({
//             flagTime: yearMonth(element1.tanggal),
//             origTime: element1.tanggal,
//             list: [{
//                 AKUMULASI_DIRAWAT_OR_ISOLASI: element1.AKUMULASI_DIRAWAT_OR_ISOLASI,
//                 AKUMULASI_KASUS: element1.AKUMULASI_KASUS,
//                 AKUMULASI_MENINGGAL: element1.AKUMULASI_MENINGGAL,
//                 AKUMULASI_SEMBUH: element1.AKUMULASI_SEMBUH,
//                 DIRAWAT_OR_ISOLASI: element1.DIRAWAT_OR_ISOLASI,
//                 KASUS: element1.KASUS,
//                 MENINGGAL: element1.MENINGGAL,
//                 SEMBUH: element1.SEMBUH,
//             }],

//         });
//     }

// }

// requiredData.list_perkembangan.push({
//     flagYear: yearMonth(element1.tanggal, "y"),
//     origTime: element1.tanggal,
//     listMonth: [{
//         flagMonth: yearMonth(element1.tanggal, "m"),
//         origTime: element1.tanggal,
//         list: [{
//             AKUMULASI_DIRAWAT_OR_ISOLASI: element1.AKUMULASI_DIRAWAT_OR_ISOLASI,
//             AKUMULASI_KASUS: element1.AKUMULASI_KASUS,
//             AKUMULASI_MENINGGAL: element1.AKUMULASI_MENINGGAL,
//             AKUMULASI_SEMBUH: element1.AKUMULASI_SEMBUH,
//             DIRAWAT_OR_ISOLASI: element1.DIRAWAT_OR_ISOLASI,
//             KASUS: element1.KASUS,
//             MENINGGAL: element1.MENINGGAL,
//             SEMBUH: element1.SEMBUH,
//         }],
//     }],

// });

// list_perkembangan: [{
//     flagYear: yearMonth(element2.tanggal, "y"),
//     origTime: element2.tanggal,
// }]


// const exists = requiredData[index].list_perkembangan.listMonth.some(item => yearMonth(item.origTime, "m") === yearMonth(element2.tanggal, "m"));
// const indexExistsMonth = requiredData[index].list_perkembangan.listMonth.findIndex(ai => yearMonth(ai.origTime, "m") === yearMonth(element2.tanggal, "m"));


// 
// if (element1.provinsi === element) {
//     // const itemExists = element.list_perkembangan.some(item => yearMonth(item.origTime, "y") === yearMonth(element1.list_perkembangan.tanggal, "y"));
//     // const index = element.list_perkembangan.findIndex(ai => yearMonth(ai.origTime, "y") === yearMonth(element1.list_perkembangan.tanggal, "y"));
//     // if (itemExists) {
//     //     const itemExists1 = element.list_perkembangan.listMonth.some(item => yearMonth(item.origTime, "m") === yearMonth(element1.list_perkembangan.tanggal, "m"));
//     //     const index1 = element.list_perkembangan.listMonth.findIndex(ai => yearMonth(ai.origTime, "m") === yearMonth(element1.list_perkembangan.tanggal, "m"));

//     //     if (itemExists1) {
//     //         requiredData[index].list_perkembangan.listMonth[index1].list.push({
//     //             AKUMULASI_DIRAWAT_OR_ISOLASI: element1.AKUMULASI_DIRAWAT_OR_ISOLASI,
//     //             AKUMULASI_KASUS: element1.AKUMULASI_KASUS,
//     //             AKUMULASI_MENINGGAL: element1.AKUMULASI_MENINGGAL,
//     //             AKUMULASI_SEMBUH: element1.AKUMULASI_SEMBUH,
//     //             DIRAWAT_OR_ISOLASI: element1.DIRAWAT_OR_ISOLASI,
//     //             KASUS: element1.KASUS,
//     //             MENINGGAL: element1.MENINGGAL,
//     //             SEMBUH: element1.SEMBUH,
//     //         });
//     //     } else {
//     //         requiredData[index].list_perkembangan.listMonth.push({
//     //             flagMonth: yearMonth(element1.tanggal, "m"),
//     //             origTime: element1.tanggal,
//     //             list: [{
//     //                 AKUMULASI_DIRAWAT_OR_ISOLASI: element1.AKUMULASI_DIRAWAT_OR_ISOLASI,
//     //                 AKUMULASI_KASUS: element1.AKUMULASI_KASUS,
//     //                 AKUMULASI_MENINGGAL: element1.AKUMULASI_MENINGGAL,
//     //                 AKUMULASI_SEMBUH: element1.AKUMULASI_SEMBUH,
//     //                 DIRAWAT_OR_ISOLASI: element1.DIRAWAT_OR_ISOLASI,
//     //                 KASUS: element1.KASUS,
//     //                 MENINGGAL: element1.MENINGGAL,
//     //                 SEMBUH: element1.SEMBUH,
//     //             }],
//     //         });
//     //     }
//     // } else {
//     //     requiredData.list_perkembangan.push({
//     //         flagYear: yearMonth(element1.tanggal, "y"),
//     //         origTime: element1.tanggal,
//     //     });
//     // }

// }




// if (itemExists1) {
//     requiredData[index].list_perkembangan.listMonth[index1].list.push({
//         AKUMULASI_DIRAWAT_OR_ISOLASI: element1.AKUMULASI_DIRAWAT_OR_ISOLASI,
//         AKUMULASI_KASUS: element1.AKUMULASI_KASUS,
//         AKUMULASI_MENINGGAL: element1.AKUMULASI_MENINGGAL,
//         AKUMULASI_SEMBUH: element1.AKUMULASI_SEMBUH,
//         DIRAWAT_OR_ISOLASI: element1.DIRAWAT_OR_ISOLASI,
//         KASUS: element1.KASUS,
//         MENINGGAL: element1.MENINGGAL,
//         SEMBUH: element1.SEMBUH,
//     });
// } else {
//     requiredData[index].list_perkembangan.listMonth.push({
//         flagMonth: yearMonth(element1.tanggal, "m"),
//         origTime: element1.tanggal,
//         list: [{
//             AKUMULASI_DIRAWAT_OR_ISOLASI: element1.AKUMULASI_DIRAWAT_OR_ISOLASI,
//             AKUMULASI_KASUS: element1.AKUMULASI_KASUS,
//             AKUMULASI_MENINGGAL: element1.AKUMULASI_MENINGGAL,
//             AKUMULASI_SEMBUH: element1.AKUMULASI_SEMBUH,
//             DIRAWAT_OR_ISOLASI: element1.DIRAWAT_OR_ISOLASI,
//             KASUS: element1.KASUS,
//             MENINGGAL: element1.MENINGGAL,
//             SEMBUH: element1.SEMBUH,
//         }],
//     });
// }












// for (let key in element[year - 1]) {
//     if (element[year - 1].hasOwnProperty(key)) {
//         if (key === 'listMonth') {

//             for (let key1 in element[year - 1][key]) {

//                 // let itemExists = dataForecast.some(item => item.provinsi == element.provinsi);
//                 // let index = dataForecast.findIndex(ai => ai.provinsi == element.provinsi);

//                 // if (key1.split("-")[1] == '01' && (!itemExists)) {
//                 //     dataForecast.push({
//                 //         provinsi: element.provinsi,
//                 //         list_forecast: {
//                 //             [year - 1]: [{
//                 //                 month: key1,
//                 //                 forecast: element[year - 1][key][key1].total
//                 //             }]
//                 //         },
//                 //     });
//                 // } else {
//                 //     if (itemExists) {
//                 //         const existsYear = dataForecast[index].list_forecast.hasOwnProperty([year - 1]);

//                 //         // // const existsMonth = dataForecast[index].list_forecast[year + 1].some(item => item.month == key1);
//                 //         // // const indexExistsMonth = dataForecast[index].list_forecast[year + 1].findIndex(
//                 //         // //     ai => console.log(`${ai.month} == ${key1}`)
//                 //         // // );

//                 //         if (existsYear) {

//                 //             var tmpIndex = key1.split("-")[1];
//                 //             let cheklength = dataForecast[index].list_forecast[year - 1].length;


//                 //             if (cheklength > 1) {
//                 //                 tmpIndex = tmpIndex - 1;
//                 //                 tmpIndex = to2Digit(tmpIndex);
//                 //                 tmpIndex = `${key1.split("-")[0]}-${tmpIndex}`;

//                 //                 dataForecast[index].list_forecast[year - 1].push({
//                 //                     month: key1,
//                 //                     forecast: dataForecast[index].list_forecast[year - 1][cheklength - 1].forecast + (0.9 * (element[year - 1][key][tmpIndex].total - dataForecast[index].list_forecast[year - 1][cheklength - 1].forecast))
//                 //                 });
//                 //             } else if (cheklength === 1) {
//                 //                 tmpIndex = to2Digit(tmpIndex);
//                 //                 tmpIndex = `${key1.split("-")[0]}-${tmpIndex}`;


//                 //                 // console.log(dataForecast[index].list_forecast[year + 1][cheklength - 1].forecast);
//                 //                 // console.log(element[year + 1][key][tmpIndex].total);
//                 //                 dataForecast[index].list_forecast[year - 1].push({
//                 //                     month: key1,
//                 //                     forecast: dataForecast[index].list_forecast[year - 1][cheklength - 1].forecast + (0.9 * (element[year - 1][key][tmpIndex].total - dataForecast[index].list_forecast[year - 1][cheklength - 1].forecast))
//                 //                 });
//                 //             }
//                 //         }
//                 //     }

//                 // }

//             }

//         }
//     }
// }





















// else if (parseInt(key) === parseInt(year)) {

//     let itemExists1 = dataForecast.some(item => item.provinsi == element.provinsi);
//     let index1 = dataForecast.findIndex(ai => ai.provinsi == element.provinsi);

//     if (itemExists1) {
//         const existsYear1 = dataForecast[index1].list_forecast.hasOwnProperty([key]);
//         if (!existsYear1) {
//             console.log(existsYear1);
//             console.log(key2)
//             console.log(key2.split("-")[1])
//             if (key2.split("-")[1] == '12') {
//                 // dataForecast.push({
//                 //     provinsi: element.provinsi,
//                 //     list_forecast: {
//                 //         [key]: [{
//                 //             month: key2,
//                 //             forecast: element[key][key1][key2].total
//                 //         }]
//                 //     },
//                 // });
//             }
//         } else {
//             // var tmpIndex1 = key2.split("-")[1];
//             // let cheklength1 = dataForecast[index1].list_forecast[key].length;


//             // if (cheklength1 > 1) {
//             //     tmpIndex1 = tmpIndex1 - 1;
//             //     tmpIndex1 = to2Digit(tmpIndex1);
//             //     tmpIndex1 = `${key2.split("-")[0]}-${tmpIndex1}`;

//             //     dataForecast[index1].list_forecast[key].push({
//             //         month: key2,
//             //         forecast: dataForecast[index1].list_forecast[key][cheklength1 - 1].forecast + (0.9 * (element[key][key1][tmpIndex1].total - dataForecast[index1].list_forecast[key][cheklength1 - 1].forecast))
//             //     });
//             // } else if (cheklength1 === 1) {
//             //     tmpIndex1 = to2Digit(tmpIndex1);
//             //     tmpIndex1 = `${key2.split("-")[0]}-${tmpIndex1}`;

//             //     dataForecast[index1].list_forecast[key].push({
//             //         month: key2,
//             //         forecast: dataForecast[index1].list_forecast[key][cheklength1 - 1].forecast + (0.9 * (element[key][key1][tmpIndex1].total - dataForecast[index1].list_forecast[key][cheklength1 - 1].forecast))
//             //     });
//             // }
//         }
//     }
// }




// if (parseInt(key) === parseInt(year)) {
//     if (itemExists) {
//         const existsYear1 = dataForecast[index].list_forecast.hasOwnProperty([key]);

//         if (!existsYear1) {
//             dataForecast[index].list_forecast[key] = [{
//                 month: key2,
//                 forecast: dataForecast[index].list_forecast[year][dataForecast[index].list_forecast[year].length - 1].forecast,
//             }];
//         } else {
//             var tmpIndex1 = key2.split("-")[1];
//             let cheklength1 = dataForecast[index].list_forecast[key].length;

//             // if (cheklength1 > 1) {
//             //     // tmpIndex1 = tmpIndex1 - 1;
//             //     // tmpIndex1 = to2Digit(tmpIndex1);
//             //     // tmpIndex1 = `${key2.split("-")[0]}-${tmpIndex1}`;

//             //     // dataForecast[index].list_forecast[key].push({
//             //     //     month: key2,
//             //     //     forecast: dataForecast[index].list_forecast[key][cheklength1 - 1].forecast + (0.9 * (element[key][key1][tmpIndex1].total - dataForecast[index].list_forecast[key][cheklength1 - 1].forecast))
//             //     // });
//             // } else if (cheklength1 === 1) {
//             //     // tmpIndex1 = to2Digit(tmpIndex1);
//             //     // tmpIndex1 = `${key2.split("-")[0]}-${tmpIndex1}`;

//             //     // tmpIndex1 = tmpIndex1 - 1;
//             //     // tmpIndex1 = to2Digit(tmpIndex1);
//             //     // tmpIndex1 = `${key2.split("-")[0]}-${tmpIndex1}`;


//             //     // dataForecast[index].list_forecast[key].push({
//             //     //     month: key2,
//             //     //     forecast: dataForecast[index].list_forecast[key][cheklength1 - 1].forecast + (0.9 * (element[key][key1][tmpIndex1].total - dataForecast[index].list_forecast[key][cheklength1 - 1].forecast))
//             //     // });
//             // }

//             tmpIndex1 = tmpIndex1 - 1;
//             tmpIndex1 = to2Digit(tmpIndex1);
//             tmpIndex1 = `${key2.split("-")[0]}-${tmpIndex1}`;


//             dataForecast[index].list_forecast[key].push({
//                 month: key2,
//                 forecast: dataForecast[index].list_forecast[key][cheklength1 - 1].forecast + (0.9 * (element[key][key1][tmpIndex1].total - dataForecast[index].list_forecast[key][cheklength1 - 1].forecast))
//             });
//         }
//     }
// }





// result.forEach(element => {
//     for (let key in element) {
//         if (element.hasOwnProperty.call(element, key)) {
//             if (key !== 'provinsi') {
//                 for (let key1 in element[key]) {
//                     if (element[key].hasOwnProperty.call(element[key], key1)) {
//                         if (parseInt(key1) === parseInt(year)) {
//                             if (element[key][key1].length < 12) {
//                                 element[key][key1].forEach((item, idxItem) => {
//                                     if (parseInt(idxItem) === parseInt(element[key][key1].length - 1)) {
//                                         let itemExists = result.some(item => item.provinsi == element.provinsi);
//                                         let index = result.findIndex(ai => ai.provinsi == element.provinsi);

//                                         if (itemExists) {
//                                             let tmpIndex = item.month.split("-")[1];
//                                             tmpIndex = parseInt(tmpIndex) + 1;
//                                             tmpIndex = to2Digit(tmpIndex);
//                                             tmpIndex = `${item.month.split("-")[0]}-${tmpIndex}`;

//                                             let checkProv = dataHistory.some(item => item.provinsi == element.provinsi);
//                                             let indexCheckProv = dataHistory.findIndex(ai => ai.provinsi == element.provinsi);
//                                             if (checkProv) {
//                                                 result[index].list_forecast[key1].push({
//                                                     month: tmpIndex,
//                                                     forecast: item.forecast + (0.9 * (dataHistory[indexCheckProv][key1].listMonth[item.month].total - item.forecast)),
//                                                 });
//                                             }
//                                         }
//                                     }
//                                 });
//                             }
//                         }
//                     }
//                 }

//             }
//         }
//     }
// });



// result.forEach(element => {
//     for (let key in element) {
//         if (element.hasOwnProperty.call(element, key)) {
//             if (key !== 'provinsi') {
//                 for (let key1 in element[key]) {
//                     if (element[key].hasOwnProperty.call(element[key], key1)) {
//                         if (parseInt(key1) === parseInt(year)) {
//                             if (element[key][key1].length < 12) {

//                             }
//                         }
//                     }
//                 }

//             }
//         }
//     }
// });