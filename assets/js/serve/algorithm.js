const convertNumMonth = month => {
    let stringMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    month = month - 1;

    return stringMonths[month];
}

const gettingRequireMonth = () => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = new Date();

    let currentMonthYear = months[date.getMonth()] + '-' + date.getFullYear();
    let itsMonth = currentMonthYear.split("-")[0];
    let areIndex = months.indexOf(itsMonth);

    let tmpMissedMonth = [];
    let tmpNotMissedMonth = [];

    months.forEach((item, idx) => {
        if (idx > areIndex + 1) {
            tmpNotMissedMonth.push(item);
        } else if (idx <= areIndex + 1) {
            tmpMissedMonth.push(item);
        }

    });

    return {
        notMissedMonth: tmpNotMissedMonth,
        missedMonth: tmpMissedMonth,
    };
}

const yearMonth = (milisecond, type) => {
    if (milisecond === undefined || milisecond === null) {
        return false;
    }
    var date = new Date(milisecond);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);

    if (type === 'y') {
        return year;
    } else if (type === 'm') {
        return `${year}-${month}`;
    } else {
        return `${year}-${month}-${day}`;
    }
}

const dateMilisecond = () => {
    // var date1 = new Date(); // today's date and time in ISO format
    // var myDate1 = Date.parse(date1);
    // let result1 = date1.match(/\d\d:\d\d/);
    // let result = date.match(/\d\d:\d\d/);


    let date = new Date();
    let myDate = date - new Date(0);

    return myDate;
}

const currentYearMonth = () => {
    let currentTime = new Date();
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth() + 1;
    let day = currentTime.getDate();

    return {
        year: year,
        month: month
    };
}

const sumTotal = dataArr =>
    dataArr.reduce((sum, {
        KASUS
    }) => sum + KASUS, 0);

const to2Digit = num => {
    return ('0' + num).slice(-2);
}

async function gettingProvince(origin, requestOptions = {
    method: 'GET',
    redirect: 'follow'
}) {
    try {
        showLoad();
        let response = await fetch(origin, requestOptions);
        const data = await response.json();
        let resultProvinsi = data.list_data.map(a => a.key);

        let makeDefaultProvinsi = [];
        resultProvinsi.forEach(element => {
            makeDefaultProvinsi.push(element.replace(/\s/gi, '_'));
        });

        hideLoad();
        return {
            resultProvinsi: resultProvinsi,
            makeDefaultProvinsi: makeDefaultProvinsi,
        };

    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const individualProvince = async (defaultProvince, requestOptions = {
    method: 'GET',
    redirect: 'follow'
}) => {
    try {
        showLoad();
        let dataIndividualProvinsi = [];

        await Promise.all(defaultProvince.map(async (item) => {
            let url = `https://data.covid19.go.id/public/api/prov_detail_${item}.json`;
            let result = await fetch(url, requestOptions);
            let data = await result.json();
            dataIndividualProvinsi.push(data);
        }));
        hideLoad();
        return dataIndividualProvinsi;
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const gettingUpdateDataCovid19 = async (origin = '', requestOptions = {
    method: 'GET',
    redirect: 'follow'
}) => {
    try {
        showLoad();
        origin = `https://data.covid19.go.id/public/api/update.json`;
        let response = await fetch(origin, requestOptions);
        const data = await response.json();
        hideLoad();
        return data;
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const dataRequired = async (resultProvinsi, dataIndividualProvinsi) => {
    try {
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
        return requiredData;
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const gettingActualCovid19 = prov => {
    return new Promise((resolve) => {
        prov.forEach(element => {
            for (let key in element) {
                if (element.hasOwnProperty(key)) {
                    if (key === 'list_perkembangan') {
                        for (let key1 in element[key]) {
                            if (element[key].hasOwnProperty(key1)) {
                                for (let key2 in element[key][key1]) {
                                    if (element[key][key1].hasOwnProperty(key2)) {
                                        if (key2 === 'listMonth') {
                                            for (let key3 in element[key][key1][key2]) {
                                                if (element[key][key1][key2].hasOwnProperty(key3)) {
                                                    const total = sumTotal(element[key][key1][key2][key3]);
                                                    element[key][key1][key2][key3].total = total;
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                        }

                    }
                }
            }
        });

        let totalInYear = 0;
        prov.forEach(element => {
            for (let key in element) {
                if (element.hasOwnProperty(key)) {
                    if (key === 'list_perkembangan') {
                        for (let key1 in element[key]) {
                            if (element[key].hasOwnProperty(key1)) {
                                for (let key2 in element[key][key1]) {
                                    if (element[key][key1].hasOwnProperty(key2)) {
                                        if (key2 === 'listMonth') {
                                            for (let key3 in element[key][key1][key2]) {
                                                if (element[key][key1][key2].hasOwnProperty(key3)) {
                                                    totalInYear += element[key][key1][key2][key3].total;
                                                }
                                            }
                                        }
                                        element[key][key1].totalYear = totalInYear;
                                    }
                                }

                            }
                        }

                    }
                }
            }
        });
        resolve(prov);
    });
}

const gettingActualCovid19Global = actualDataProv => {
    return new Promise((resolve) => {
        let globalActual = {
            list_perkembangan: {},
            country: "Indonesia",
        };

        actualDataProv.forEach(element => {
            for (let key in element) {
                if (element.hasOwnProperty(key)) {
                    if (key === 'list_perkembangan') {
                        for (let key1 in element[key]) {
                            if (element[key].hasOwnProperty(key1)) {
                                for (let key2 in element[key][key1]) {
                                    if (element[key][key1].hasOwnProperty(key2)) {
                                        if (key2 === 'listMonth') {
                                            for (let key3 in element[key][key1][key2]) {
                                                if (element[key][key1][key2].hasOwnProperty(key3)) {
                                                    // const total = sumTotal(element[key][key1][key2][key3]);
                                                    // element[key][key1][key2][key3].total = total;
                                                    // let check = result[index].list_forecast.hasOwnProperty([year]);

                                                    let checkYear = globalActual.list_perkembangan.hasOwnProperty([key1]);

                                                    if (checkYear) {
                                                        // sudah Ada, cek bulan
                                                        let checkMonth = globalActual.list_perkembangan[key1][key2].hasOwnProperty([key3]);

                                                        if (checkMonth) {

                                                        } else {
                                                            globalActual.list_perkembangan[key1][key2][key3] = {
                                                                month: key3
                                                            };
                                                        }
                                                    } else {
                                                        globalActual.list_perkembangan[key1] = {
                                                            origTime: element[key][key1].origTime,
                                                            listMonth: {
                                                                [key3]: {
                                                                    month: key3
                                                                },
                                                            },
                                                        }
                                                    }

                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });


        let total = 0;
        let total1 = 0;
        let total2 = 0;
        actualDataProv.forEach((element, index) => {
            for (let key in element) {
                if (element.hasOwnProperty(key)) {
                    if (key === 'list_perkembangan') {
                        for (let key1 in element[key]) {
                            if (element[key].hasOwnProperty(key1)) {
                                for (let key2 in element[key][key1]) {
                                    if (element[key][key1].hasOwnProperty(key2)) {
                                        if (key2 === 'listMonth') {
                                            for (let key3 in element[key][key1][key2]) {
                                                if (element[key][key1][key2].hasOwnProperty(key3)) {


                                                    for (let item in globalActual) {
                                                        if (globalActual.hasOwnProperty.call(globalActual, item)) {
                                                            if (item === key) {
                                                                for (let item1 in globalActual[item]) {
                                                                    if (globalActual[item].hasOwnProperty.call(globalActual[item], item1)) {
                                                                        if (item1 === key1) {
                                                                            for (const item2 in globalActual[item][item1]) {
                                                                                if (globalActual[item][item1].hasOwnProperty.call(globalActual[item][item1], item2)) {
                                                                                    if (key2 === item2) {
                                                                                        for (const item3 in globalActual[item][item1][item2]) {
                                                                                            if (globalActual[item][item1][item2].hasOwnProperty.call(globalActual[item][item1][item2], item3)) {
                                                                                                if (parseInt(key1) === 2020) {
                                                                                                    if (element.provinsi !== 'GORONTALO' &&
                                                                                                        element.provinsi !== 'NUSA TENGGARA TIMUR' &&
                                                                                                        item3 === '2020-03' && key3 === item3) {
                                                                                                        total += element[key][key1][key2][key3].total;
                                                                                                        if (index === (actualDataProv.length - 2)) {
                                                                                                            globalActual[item][item1][item2][item3].total = total;
                                                                                                            // total = 0;
                                                                                                        }
                                                                                                    } else {
                                                                                                        if (key3 === item3) {
                                                                                                            total1 += element[key][key1][key2][key3].total;
                                                                                                            if (index === (actualDataProv.length - 1)) {
                                                                                                                globalActual[item][item1][item2][item3].total = total1;
                                                                                                                // total1 = 0;
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                } else {
                                                                                                    if (key3 === item3) {
                                                                                                        // console.log(`${globalActual[item][item1][item2][item3]} === ${element[key][key1][key2][key3]}`);
                                                                                                        // console.log(`${globalActual[item][item1][item2][item3]} === ${key3}`);
                                                                                                        total2 += element[key][key1][key2][key3].total;
                                                                                                        if (index === (actualDataProv.length - 1)) {
                                                                                                            globalActual[item][item1][item2][item3].total = total2;
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }


                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (index === (actualDataProv.length - 2)) {
                total = 0;
            }

            if (index === (actualDataProv.length - 1)) {
                total1 = 0;
                total2 = 0;
            }
        });


        for (let item in globalActual) {
            if (globalActual.hasOwnProperty.call(globalActual, item)) {
                if (item === 'list_perkembangan') {
                    let totalYear = 0;
                    for (let item1 in globalActual[item]) {
                        if (globalActual[item].hasOwnProperty.call(globalActual[item], item1)) {
                            for (const item2 in globalActual[item][item1]) {
                                if (globalActual[item][item1].hasOwnProperty.call(globalActual[item][item1], item2)) {
                                    if (item2 === 'listMonth') {
                                        for (const item3 in globalActual[item][item1][item2]) {
                                            if (globalActual[item][item1][item2].hasOwnProperty.call(globalActual[item][item1][item2], item3)) {
                                                totalYear += globalActual[item][item1][item2][item3].total;
                                                // console.log(globalActual[item][item1][item2][item3].total);
                                            }
                                        }
                                    }
                                }
                            }
                            globalActual[item][item1].total = totalYear;
                        }
                    }
                }
            }
        }

        resolve(globalActual);
    });
}

const gettingHistoryData = (dataProv, year) => {
    return new Promise((resolve) => {
        let dataHistory = [];
        dataProv.forEach(element => {
            for (let key in element) {
                if (element.hasOwnProperty(key)) {
                    if (key === 'list_perkembangan') {
                        for (let key1 in element[key]) {
                            if (element[key].hasOwnProperty(key1)) {
                                if (parseInt(key1) === parseInt(year)) {
                                    dataHistory.push({
                                        provinsi: element.provinsi,
                                        [year]: element[key][key1],
                                    });
                                } else {
                                    let itemExistsProv = dataHistory.some(item => item.provinsi === element.provinsi);
                                    let indexExistsProv = dataHistory.findIndex(ai => ai.provinsi === element.provinsi);

                                    if (itemExistsProv && parseInt(key1) === parseInt(year)) {
                                        dataHistory[indexExistsProv][year] = element[key][key1];
                                    }

                                }
                            }
                        }
                    }
                }
            }
        });
        resolve(dataHistory);
    });
}

const gettingHistoryDataGlobal = (dataCountry, year) => {
    return new Promise((resolve) => {
        let dataHistory = {};

        for (let key in dataCountry) {
            if (dataCountry.hasOwnProperty.call(dataCountry, key)) {
                if (key === 'list_perkembangan') {
                    for (let key1 in dataCountry[key]) {
                        if (dataCountry[key].hasOwnProperty.call(dataCountry[key], key1)) {
                            if (parseInt(key1) === parseInt(year)) {
                                dataHistory.country = dataCountry.country;
                                dataHistory[key1] = dataCountry[key][key1];
                            }
                        }
                    }
                }
            }
        }
        resolve(dataHistory);
    });
}




const SESalgoritm = (dataHistory, year) => {
    return new Promise((resolve) => {
        let dataForecast = [];

        dataHistory.forEach(element => {
            for (let key in element) {
                if (element.hasOwnProperty.call(element, key)) {
                    if (key !== 'provinsi') {

                        for (let key1 in element[key]) {
                            if (element[key].hasOwnProperty.call(element[key], key1)) {

                                if (key1 === 'listMonth') {
                                    for (let key2 in element[key][key1]) {
                                        if (element[key][key1].hasOwnProperty.call(element[key][key1], key2)) {
                                            let itemExists = dataForecast.some(item => item.provinsi == element.provinsi);
                                            let index = dataForecast.findIndex(ai => ai.provinsi == element.provinsi);

                                            if (parseInt(key) === parseInt(year)) {
                                                if (!itemExists) {
                                                    dataForecast.push({
                                                        provinsi: element.provinsi,
                                                        list_forecast: {
                                                            [key]: [{
                                                                month: key2,
                                                                forecast: element[key][key1][key2].total,
                                                                actual: element[key][key1][key2].total,
                                                                error: (element[key][key1][key2].total ? (element[key][key1][key2].total - element[key][key1][key2].total) : null),
                                                            }]
                                                        },
                                                    });
                                                } else {
                                                    if (itemExists) {
                                                        const existsYear = dataForecast[index].list_forecast.hasOwnProperty([key]);
                                                        let tmpIndex = key2.split("-")[1];

                                                        if (existsYear) {
                                                            let cheklength = dataForecast[index].list_forecast[key].length;

                                                            if (cheklength > 1) {
                                                                tmpIndex = tmpIndex - 1;
                                                                tmpIndex = to2Digit(tmpIndex);
                                                                tmpIndex = `${key2.split("-")[0]}-${tmpIndex}`;

                                                                dataForecast[index].list_forecast[key].push({
                                                                    month: key2,
                                                                    forecast: dataForecast[index].list_forecast[key][cheklength - 1].forecast + (0.9 * (element[key][key1][tmpIndex].total - dataForecast[index].list_forecast[key][cheklength - 1].forecast)),
                                                                    actual: element[key][key1][key2].total,
                                                                    error: (element[key][key1][key2].total ? (element[key][key1][key2].total - (dataForecast[index].list_forecast[key][cheklength - 1].forecast + (0.9 * (element[key][key1][tmpIndex].total - dataForecast[index].list_forecast[key][cheklength - 1].forecast)))) : null),
                                                                });
                                                            } else if (cheklength === 1) {
                                                                tmpIndex = tmpIndex - 1;
                                                                tmpIndex = to2Digit(tmpIndex);
                                                                tmpIndex = `${key2.split("-")[0]}-${tmpIndex}`;

                                                                dataForecast[index].list_forecast[key].push({
                                                                    month: key2,
                                                                    forecast: dataForecast[index].list_forecast[key][cheklength - 1].forecast + (0.9 * (element[key][key1][tmpIndex].total - dataForecast[index].list_forecast[key][cheklength - 1].forecast)),
                                                                    actual: element[key][key1][key2].total,
                                                                    error: (element[key][key1][key2].total ? (element[key][key1][key2].total - (dataForecast[index].list_forecast[key][cheklength - 1].forecast + (0.9 * (element[key][key1][tmpIndex].total - dataForecast[index].list_forecast[key][cheklength - 1].forecast)))) : null),
                                                                });
                                                            }
                                                        }
                                                    }

                                                }
                                            }
                                        }

                                    }
                                }

                            }
                        }

                    }
                }
            }
        });
        resolve(dataForecast);
    });
}

const SESalgoritmGlobal = (dataCountry, year) => {
    return new Promise((resolve) => {
        let dataForecast = [];
        console.log(dataCountry);
        for (const key in dataCountry) {
            if (dataCountry.hasOwnProperty.call(dataCountry, key)) {
                if (key !== 'country') {
                    for (const key1 in dataCountry[key]) {
                        if (dataCountry[key].hasOwnProperty.call(dataCountry[key], key1)) {
                            if (key1 === 'listMonth') {
                                for (let key2 in dataCountry[key][key1]) {
                                    if (dataCountry[key][key1].hasOwnProperty.call(dataCountry[key][key1], key2)) {
                                        let itemExists = dataForecast.some(item => item.country == dataCountry.country);
                                        let index = dataForecast.findIndex(ai => ai.country == dataCountry.country);

                                        if (parseInt(key) === parseInt(year)) {
                                            if (!itemExists) {
                                                dataForecast.push({
                                                    country: dataCountry.country,
                                                    list_forecast: {
                                                        [key]: [{
                                                            month: key2,
                                                            forecast: dataCountry[key][key1][key2].total,
                                                            actual: dataCountry[key][key1][key2].total,
                                                            error: (dataCountry[key][key1][key2].total ? (dataCountry[key][key1][key2].total - dataCountry[key][key1][key2].total) : null),
                                                        }]
                                                    },
                                                });
                                            } else {
                                                if (itemExists) {
                                                    const existsYear = dataForecast[index].list_forecast.hasOwnProperty([key]);
                                                    let tmpIndex = key2.split("-")[1];

                                                    if (existsYear) {
                                                        let cheklength = dataForecast[index].list_forecast[key].length;

                                                        if (cheklength > 1) {
                                                            tmpIndex = tmpIndex - 1;
                                                            tmpIndex = to2Digit(tmpIndex);
                                                            tmpIndex = `${key2.split("-")[0]}-${tmpIndex}`;

                                                            dataForecast[index].list_forecast[key].push({
                                                                month: key2,
                                                                forecast: dataForecast[index].list_forecast[key][cheklength - 1].forecast + (0.9 * (dataCountry[key][key1][tmpIndex].total - dataForecast[index].list_forecast[key][cheklength - 1].forecast)),
                                                                actual: dataCountry[key][key1][key2].total,
                                                                error: (dataCountry[key][key1][key2].total ? (dataCountry[key][key1][key2].total - (dataForecast[index].list_forecast[key][cheklength - 1].forecast + (0.9 * (dataCountry[key][key1][tmpIndex].total - dataForecast[index].list_forecast[key][cheklength - 1].forecast)))) : null),
                                                            });
                                                        } else if (cheklength === 1) {
                                                            tmpIndex = tmpIndex - 1;
                                                            tmpIndex = to2Digit(tmpIndex);
                                                            tmpIndex = `${key2.split("-")[0]}-${tmpIndex}`;

                                                            dataForecast[index].list_forecast[key].push({
                                                                month: key2,
                                                                forecast: dataForecast[index].list_forecast[key][cheklength - 1].forecast + (0.9 * (dataCountry[key][key1][tmpIndex].total - dataForecast[index].list_forecast[key][cheklength - 1].forecast)),
                                                                actual: dataCountry[key][key1][key2].total,
                                                                error: (dataCountry[key][key1][key2].total ? (dataCountry[key][key1][key2].total - (dataForecast[index].list_forecast[key][cheklength - 1].forecast + (0.9 * (dataCountry[key][key1][tmpIndex].total - dataForecast[index].list_forecast[key][cheklength - 1].forecast)))) : null),
                                                            });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        resolve(dataForecast);
    });
}

const startingSESprovByMonth = async (dataProv, year) => {
    try {
        let result;
        let currentYearMont = currentYearMonth();

        let dataHistory = await gettingHistoryData(dataProv, year);

        if (dataHistory.length === 0) {
            dataHistory = await gettingHistoryData(dataProv, year - 1);
            result = await SESalgoritm(dataHistory, year - 1);
            if (((parseInt(year) - parseInt(currentYearMont.year)) === 1) && parseInt(currentYearMont.month) === 12) {
                result.forEach(element => {
                    for (let key in element) {
                        if (element.hasOwnProperty.call(element, key)) {
                            if (key !== 'provinsi') {

                                for (let key1 in element[key]) {
                                    if (element[key].hasOwnProperty.call(element[key], key1)) {

                                        let itemExists = result.some(item => item.provinsi == element.provinsi);
                                        let index = result.findIndex(ai => ai.provinsi == element.provinsi);

                                        if (itemExists) {
                                            let checkYear = result[index].list_forecast.hasOwnProperty([year]);
                                            if (!checkYear) {
                                                result[index].list_forecast[year] = [{
                                                    month: `${key1.split("-")[0]}-01`,
                                                    forecast: result[index].list_forecast[year - 1][11].forecast + (0.9 * (dataHistory[indexCheckProv][year - 1].listMonth["2021-12"].total - result[index].list_forecast[year - 1][11].forecast)),
                                                    actual: null,
                                                    error: (result[index].list_forecast[year].actual ? (result[index].list_forecast[year].actual - result[index].list_forecast[year].forecast) : null),
                                                }];
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                });
            } else if (((parseInt(year) - parseInt(currentYearMont.year)) === 1) && parseInt(currentYearMont.month) < 12) {
                result.forEach(element => {
                    for (let key in element) {
                        if (element.hasOwnProperty.call(element, key)) {
                            if (key !== 'provinsi') {

                                for (let key1 in element[key]) {
                                    if (element[key].hasOwnProperty.call(element[key], key1)) {
                                        if (element[key][key1].length < 12) {
                                            element[key][key1].forEach((item, idxItem) => {
                                                if (parseInt(idxItem) === element[key][key1].length - 1) {
                                                    let itemExists = result.some(item => item.provinsi == element.provinsi);
                                                    let index = result.findIndex(ai => ai.provinsi == element.provinsi);

                                                    if (itemExists) {
                                                        let tmpIndex = item.month.split("-")[1];
                                                        tmpIndex = parseInt(tmpIndex) + 1;
                                                        tmpIndex = to2Digit(tmpIndex);
                                                        tmpIndex = `${item.month.split("-")[0]}-${tmpIndex}`;

                                                        result[index].list_forecast[key1].push({
                                                            month: tmpIndex,
                                                            forecast: item.forecast + (0.9 * (item.actual - item.forecast)),
                                                            actual: null,
                                                            error: (result[index].list_forecast[key1].actual ? (result[index].list_forecast[key1].actual - result[index].list_forecast[key1].forecast) : null),
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }

                            }
                        }
                    }
                });
            } else {
                return toastr.success(`Jangkauan Bulan Forecasting Terlalu Jauh`);
            }
        } else {
            if (parseInt(year) < parseInt(currentYearMont.year)) {
                result = await SESalgoritm(dataHistory, year);
            } else if (parseInt(year) === parseInt(currentYearMont.year) && parseInt(currentYearMont.month) < 12) {
                result = await SESalgoritm(dataHistory, year);
                result.forEach(element => {
                    for (let key in element) {
                        if (element.hasOwnProperty.call(element, key)) {
                            if (key !== 'provinsi') {
                                for (let key1 in element[key]) {
                                    if (element[key].hasOwnProperty.call(element[key], key1)) {
                                        if (element[key][key1].length < 12) {
                                            element[key][key1].forEach((item, idxItem) => {
                                                if (parseInt(idxItem) === element[key][key1].length - 1) {
                                                    let itemExists = result.some(item => item.provinsi == element.provinsi);
                                                    let index = result.findIndex(ai => ai.provinsi == element.provinsi);

                                                    if (itemExists) {
                                                        let tmpIndex = item.month.split("-")[1];
                                                        tmpIndex = parseInt(tmpIndex) + 1;
                                                        tmpIndex = to2Digit(tmpIndex);
                                                        tmpIndex = `${item.month.split("-")[0]}-${tmpIndex}`;

                                                        result[index].list_forecast[key1].push({
                                                            month: tmpIndex,
                                                            forecast: item.forecast + (0.9 * (item.actual - item.forecast)),
                                                            actual: null,
                                                            error: (result[index].list_forecast[key1].actual ? (result[index].list_forecast[key1].actual - result[index].list_forecast[key1].forecast) : null),
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }

                            }
                        }
                    }
                });
            } else if (parseInt(year) === parseInt(currentYearMont.year) && parseInt(currentYearMont.month) === 12) {
                result = await SESalgoritm(dataHistory, year);
            } else {
                return toastr.success(`Jangkauan Bulan Forecasting Terlalu Jauh`);
            }
        }

        // console.log(dataHistory);
        // console.log(result);

        return result;
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const startingSESglobalByMonth = async (dataCountry, year) => {
    try {
        let result;
        let currentYearMont = currentYearMonth();

        let dataHistory = await gettingHistoryDataGlobal(dataCountry, year);
        let isCheckEmpty = await isEmptyObject_v1(dataHistory);

        if (isCheckEmpty) {
            dataHistory = await gettingHistoryDataGlobal(dataCountry, year - 1);
            result = await SESalgoritmGlobal(dataHistory, year - 1);
            if (((parseInt(year) - parseInt(currentYearMont.year)) === 1) && parseInt(currentYearMont.month) === 12) {
                result.forEach(element => {
                    for (let key in element) {
                        if (element.hasOwnProperty.call(element, key)) {
                            if (key !== 'country') {

                                for (let key1 in element[key]) {
                                    if (element[key].hasOwnProperty.call(element[key], key1)) {

                                        let itemExists = result.some(item => item.country == element.country);
                                        let index = result.findIndex(ai => ai.country == element.country);

                                        if (itemExists) {
                                            let checkYear = result[index].list_forecast.hasOwnProperty([year]);
                                            if (!checkYear) {
                                                result[index].list_forecast[year] = [{
                                                    month: `${key1.split("-")[0]}-01`,
                                                    forecast: result[index].list_forecast[year - 1][11].forecast + (0.9 * (dataHistory[indexCheckProv][year - 1].listMonth["2021-12"].total - result[index].list_forecast[year - 1][11].forecast)),
                                                    actual: null,
                                                    error: (result[index].list_forecast[year].actual ? (result[index].list_forecast[year].actual - result[index].list_forecast[year].forecast) : null),
                                                }];
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                });
            } else if (((parseInt(year) - parseInt(currentYearMont.year)) === 1) && parseInt(currentYearMont.month) < 12) {
                result.forEach(element => {
                    for (let key in element) {
                        if (element.hasOwnProperty.call(element, key)) {
                            if (key !== 'country') {

                                for (let key1 in element[key]) {
                                    if (element[key].hasOwnProperty.call(element[key], key1)) {
                                        if (element[key][key1].length < 12) {
                                            element[key][key1].forEach((item, idxItem) => {
                                                if (parseInt(idxItem) === element[key][key1].length - 1) {
                                                    let itemExists = result.some(item => item.country == element.country);
                                                    let index = result.findIndex(ai => ai.country == element.country);

                                                    if (itemExists) {
                                                        let tmpIndex = item.month.split("-")[1];
                                                        tmpIndex = parseInt(tmpIndex) + 1;
                                                        tmpIndex = to2Digit(tmpIndex);
                                                        tmpIndex = `${item.month.split("-")[0]}-${tmpIndex}`;

                                                        result[index].list_forecast[key1].push({
                                                            month: tmpIndex,
                                                            forecast: item.forecast + (0.9 * (item.actual - item.forecast)),
                                                            actual: null,
                                                            error: (result[index].list_forecast[key1].actual ? (result[index].list_forecast[key1].actual - result[index].list_forecast[key1].forecast) : null),
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }

                            }
                        }
                    }
                });
            } else {
                return toastr.success(`Jangkauan Bulan Forecasting Terlalu Jauh`);
            }
        } else {
            if (parseInt(year) < parseInt(currentYearMont.year)) {
                result = await SESalgoritmGlobal(dataHistory, year);
            } else if (parseInt(year) === parseInt(currentYearMont.year) && parseInt(currentYearMont.month) < 12) {
                result = await SESalgoritmGlobal(dataHistory, year);
                result.forEach(element => {
                    for (let key in element) {
                        if (element.hasOwnProperty.call(element, key)) {
                            if (key !== 'country') {
                                for (let key1 in element[key]) {
                                    if (element[key].hasOwnProperty.call(element[key], key1)) {
                                        if (element[key][key1].length < 12) {
                                            element[key][key1].forEach((item, idxItem) => {
                                                if (parseInt(idxItem) === element[key][key1].length - 1) {
                                                    let itemExists = result.some(item => item.country == element.country);
                                                    let index = result.findIndex(ai => ai.country == element.country);

                                                    if (itemExists) {
                                                        let tmpIndex = item.month.split("-")[1];
                                                        tmpIndex = parseInt(tmpIndex) + 1;
                                                        tmpIndex = to2Digit(tmpIndex);
                                                        tmpIndex = `${item.month.split("-")[0]}-${tmpIndex}`;

                                                        result[index].list_forecast[key1].push({
                                                            month: tmpIndex,
                                                            forecast: item.forecast + (0.9 * (item.actual - item.forecast)),
                                                            actual: null,
                                                            error: (result[index].list_forecast[key1].actual ? (result[index].list_forecast[key1].actual - result[index].list_forecast[key1].forecast) : null),
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }

                            }
                        }
                    }
                });
            } else if (parseInt(year) === parseInt(currentYearMont.year) && parseInt(currentYearMont.month) === 12) {
                result = await SESalgoritm(dataHistory, year);
            } else {
                return toastr.success(`Jangkauan Bulan Forecasting Terlalu Jauh`);
            }
        }

        return result;
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const startingSESprovByYear = async (dataProv, year) => {
    try {
        let dataHistory = [];
        let dataForecast = [];
        let currentYearMont = currentYearMonth();

        if ((((parseInt(year) - parseInt(currentYearMont.year)) <= 1) && parseInt(year) > 2019)) {
            dataProv.forEach(element => {
                for (let key in element) {
                    if (element.hasOwnProperty(key)) {
                        if (key === 'list_perkembangan') {
                            for (let key1 in element[key]) {
                                if (element[key].hasOwnProperty(key1)) {
                                    if (parseInt(key1) <= parseInt(year)) {
                                        let existsProv = dataHistory.some(item => item.provinsi === element.provinsi);
                                        let indexExistsProv = dataHistory.findIndex(ai => ai.provinsi === element.provinsi);

                                        if (existsProv) {
                                            dataHistory[indexExistsProv][key1] = element[key][key1];
                                        } else {
                                            dataHistory.push({
                                                provinsi: element.provinsi,
                                                [key1]: element[key][key1],
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            if (dataHistory.length > 0) {

                dataHistory.forEach(element => {
                    for (let key in element) {
                        if (element.hasOwnProperty.call(element, key)) {
                            if (key !== 'provinsi') {

                                for (let key1 in element[key]) {
                                    if (element[key].hasOwnProperty.call(element[key], key1)) {

                                        if (key1 === 'listMonth') {
                                            for (let key2 in element[key][key1]) {
                                                if (element[key][key1].hasOwnProperty.call(element[key][key1], key2)) {
                                                    let existsProv = dataForecast.some(item => item.provinsi === element.provinsi);
                                                    let indexProv = dataForecast.findIndex(ai => ai.provinsi === element.provinsi);

                                                    if (!existsProv) {
                                                        dataForecast.push({
                                                            provinsi: element.provinsi,
                                                            list_forecast: {
                                                                [key]: {
                                                                    forecast: element[key].totalYear,
                                                                    actual: element[key].totalYear,
                                                                    error: (element[key].totalYear ? (element[key].totalYear - element[key].totalYear) : null),
                                                                }
                                                            },
                                                        });
                                                    } else {
                                                        if (existsProv) {
                                                            let existsYear = dataForecast[indexProv].list_forecast.hasOwnProperty([key]);

                                                            if (!existsYear) {
                                                                let cheklength = Object.keys(dataForecast[indexProv].list_forecast).length;
                                                                if (cheklength > 0) {
                                                                    dataForecast[indexProv].list_forecast[key] = {
                                                                        forecast: dataForecast[indexProv].list_forecast[parseInt(key) - 1].forecast + (0.9 * (element[parseInt(key) - 1].totalYear - dataForecast[indexProv].list_forecast[parseInt(key) - 1].forecast)),
                                                                        actual: element[key].totalYear,
                                                                        error: (element[key].totalYear ? (element[key].totalYear - (dataForecast[indexProv].list_forecast[parseInt(key) - 1].forecast + (0.9 * (element[parseInt(key) - 1].totalYear - dataForecast[indexProv].list_forecast[parseInt(key) - 1].forecast)))) : null),
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }

                                                }

                                            }
                                        }

                                    }
                                }

                            }
                        }
                    }
                });

                if ((parseInt(year) - parseInt(currentYearMont.year)) === 1) {
                    dataForecast.forEach(element => {
                        for (let key in element) {
                            if (element.hasOwnProperty.call(element, key)) {
                                if (key !== 'provinsi') {

                                    for (let key1 in element[key]) {
                                        if (element[key].hasOwnProperty.call(element[key], key1)) {

                                            let existsProv = dataForecast.some(item => item.provinsi === element.provinsi);
                                            let indexProv = dataForecast.findIndex(ai => ai.provinsi === element.provinsi);

                                            if (existsProv) {
                                                let existsYear = dataForecast[indexProv].list_forecast.hasOwnProperty([year]);

                                                if (!existsYear) {
                                                    dataForecast[indexProv].list_forecast[year] = {
                                                        forecast: dataForecast[indexProv].list_forecast[year - 1].forecast + (0.9 * (element[key][year - 1].actual - dataForecast[indexProv].list_forecast[year - 1].forecast)),
                                                        actual: null,
                                                        error: (this.actual ? (this.actual - this.forecast) : null),
                                                    }
                                                }
                                            }

                                        }
                                    }

                                }
                            }
                        }
                    });
                }
            }
        } else {
            return toastr.success(`Jangkauan Tahun Forecasting Terlalu Jauh`);
        }


        // console.log(dataHistory);
        // console.log(dataForecast);

        return dataForecast;
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}

const startingSESglobalByYear = async (dataCountry, year) => {
    try {
        console.log(dataCountry)
        let dataHistory = {};
        let dataForecast = [];
        let currentYearMont = currentYearMonth();

        if ((((parseInt(year) - parseInt(currentYearMont.year)) <= 1) && parseInt(year) > 2019)) {

            for (let key in dataCountry) {
                if (dataCountry.hasOwnProperty.call(dataCountry, key)) {
                    if (key === 'list_perkembangan') {
                        for (let key1 in dataCountry[key]) {
                            if (dataCountry[key].hasOwnProperty.call(dataCountry[key], key1)) {
                                if (parseInt(key1) <= parseInt(year)) {
                                    const exists = dataHistory.hasOwnProperty(dataCountry.country);
                                    if (exists) {
                                        dataHistory[key1] = dataCountry[key][key1];
                                    } else {
                                        dataHistory.country = dataCountry.country;
                                        dataHistory[key1] = dataCountry[key][key1];
                                    }
                                }
                            }
                        }
                    }
                }
            }

            console.log(dataHistory);
            let isCheckEmpty = await isEmptyObject_v1(dataHistory);

            if (!isCheckEmpty) {
                for (let key in dataHistory) {
                    if (dataHistory.hasOwnProperty.call(dataHistory, key)) {
                        if (key !== 'country') {
                            for (let key1 in dataHistory[key]) {
                                if (dataHistory[key].hasOwnProperty.call(dataHistory[key], key1)) {
                                    if (key1 === 'total') {
                                        let exists = dataForecast.some(item => item.country === dataHistory.country);
                                        let index = dataForecast.findIndex(ai => ai.country === dataHistory.country);

                                        if (exists) {
                                            let existsYear = dataForecast[index].list_forecast.hasOwnProperty([key]);
                                            if (!existsYear) {
                                                let cheklength = Object.keys(dataForecast[index].list_forecast).length;
                                                if (cheklength > 0) {
                                                    dataForecast[index].list_forecast[key] = {
                                                        forecast: dataForecast[index].list_forecast[parseInt(key) - 1].forecast + (0.9 * (dataHistory[parseInt(key) - 1].total - dataForecast[index].list_forecast[parseInt(key) - 1].forecast)),
                                                        actual: dataHistory[key].total,
                                                        error: (dataHistory[key].total ? (dataHistory[key].total - (dataForecast[index].list_forecast[parseInt(key) - 1].forecast + (0.9 * (dataHistory[parseInt(key) - 1].total - dataForecast[index].list_forecast[parseInt(key) - 1].forecast)))) : null),
                                                    }
                                                }
                                            }
                                        } else {
                                            dataForecast.push({
                                                country: dataHistory.country,
                                                list_forecast: {
                                                    [key]: {
                                                        forecast: dataHistory[key].total,
                                                        actual: dataHistory[key].total,
                                                        error: (dataHistory[key].total ? (dataHistory[key].total - dataHistory[key].total) : null),
                                                    }
                                                },
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if ((parseInt(year) - parseInt(currentYearMont.year)) === 1) {
                    for (let key in dataHistory) {
                        if (dataHistory.hasOwnProperty.call(dataHistory, key)) {
                            if (key !== 'country') {
                                for (let key1 in dataHistory[key]) {
                                    if (dataHistory[key].hasOwnProperty.call(dataHistory[key], key1)) {
                                        if (key1 === 'total') {
                                            let exists = dataForecast.some(item => item.country === dataHistory.country);
                                            let index = dataForecast.findIndex(ai => ai.country === dataHistory.country);
                                            if (exists) {
                                                let existsYear = dataForecast[index].list_forecast.hasOwnProperty([year]);
                                                if (!existsYear) {
                                                    dataForecast[index].list_forecast[year] = {
                                                        forecast: dataForecast[index].list_forecast[parseInt(year) - 1].forecast + (0.9 * (dataHistory[parseInt(year) - 1].total - dataForecast[index].list_forecast[parseInt(year) - 1].forecast)),
                                                        actual: null,
                                                        error: (this.actual ? (this.actual - this.forecast) : null),
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            return toastr.success(`Jangkauan Tahun Forecasting Terlalu Jauh`);
        }

        // console.log(dataHistory);
        console.log(dataForecast);

        return dataForecast;
    } catch (rejectedReason) {
        console.log(rejectedReason);
        return toastr.error('Error NetWork');
    }
}