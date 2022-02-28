// const getDataURL = keyword => {
//     return `https://api.covid19api.com/country/${keyword}/status/confirmed`;
// }


// var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
// };

// fetch("https://api.covid19api.com/country/south-africa/status/confirmed", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));




// let requestOptions = {
//     method: 'GET',
//     // mode: 'cors',
//     // cache: 'default',
//     // credentials: 'include',
//     // headers: {
//     //     'Content-Type': 'application/json;charset = UTF - 8',
//     //     'Content-Length': 843,
//     //     'Connection': 'keep - alive',
//     //     'Access-Control-Allow-Credentials': true,
//     //     'Access-Control-Allow-Origin': '',
//     //     'Access-Control-Expose-Headers': 'Content-length',
//     //     'Content-Encoding': 'gzip',
//     //     'Vary': 'Origin',
//     //     'Vary': 'Accept-Encoding',
//     // },
//     redirect: 'follow',
//     // referrerPolicy: 'no-referrer',
//     // body: JSON.stringify(data),
// };

// async function getDataCOVID19anruc() {
//     try {
//         const url = getDataURL('Indonesia');
//         return (await fetch(url, requestOptions).json());
//     } catch (e) {
//         console.log("haii");
//     }
// }


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