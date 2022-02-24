const monthMissed = () => {
    return new Promise((resolve) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var date = new Date();

        let currentMonthYear = months[date.getMonth()] + '-' + date.getFullYear();
        let itsMonth = currentMonthYear.split("-")[0];

        let areIndex = monthNames.indexOf(itsMonth);

        let tmpMissedMonth = [];

        monthNames.forEach((item, idx) => {
            if (idx >= areIndex) {
                tmpMissedMonth.push(item);
            }
        });

        console.log(tmpMissedMonth);

        resolve(tmpMissedMonth);
    });
}

const monthMissed1 = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date();

    let currentMonthYear = months[date.getMonth()] + '-' + date.getFullYear();
    let itsMonth = currentMonthYear.split("-")[0];

    let areIndex = monthNames.indexOf(itsMonth);

    let tmpMissedMonth = [];

    monthNames.forEach((item, idx) => {
        if (idx >= areIndex) {
            tmpMissedMonth.push(item);
        }
    });

    console.log(tmpMissedMonth);

    return tmpMissedMonth;
}


const notMonthMissed = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date();

    let currentMonthYear = months[date.getMonth()] + '-' + date.getFullYear();

    let itsMonth = currentMonthYear.split("-")[0];

    let areIndex = monthNames.indexOf(itsMonth);

    let tmpMissedMonth = [];

    monthNames.forEach((item, idx) => {
        // if (idx >= areIndex) {
        // }
        tmpMissedMonth.push(item);
    });

    console.log(tmpMissedMonth);

    return tmpMissedMonth;

}

const renderMonthMissed = () => {
    let data = notMonthMissed();
    let rows = '';
    data.forEach(element => {
        rows += `<option>
                    ${element}
                 </option>`;
    });
    return rows;
}

const currentYear = () => {
    return new Promise((resolve) => {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var date = new Date();

        let currentMonthYear = months[date.getMonth()] + '-' + date.getFullYear();
        let itsYear = currentMonthYear.split("-")[1];

        console.log(itsYear);

        resolve(itsYear);
    });
}

const getMonthInfo = () => {
    let strMonth = $("#monthSchedul").val();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let numMonth = months.indexOf(strMonth);

    let currentYear = parseInt($("#yearSchedul").val());

    let resultMonth = getDaysMonth(numMonth, currentYear);
    console.log(resultMonth);

    return renderInfoShiftMonth(resultMonth);
}

const getDaysMonth = (month, year) => {
    // const getAllDaysInMonth = (month, year) => Array.from({
    //         length: new Date(year, month, 0).getDate() - 1
    //     },
    //     (_, i) => new Date(year, month, i + 1)
    // );
    const getAllDaysInMonth = (month, year) => {
        let date = new Date(`${year}-${parseInt(month)+1}-01`);
        let days = [];
        while (date.getMonth() === parseInt(month)) {
            // days.push(date.getDate());
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    const areMonth = getAllDaysInMonth(month, year).map(x => x.toLocaleString('id', {
        weekday: 'long', // long, short, narrow
        day: 'numeric', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: 'numeric', // numeric, 2-digit, long, short, narrow
    }));

    // console.log(areMonth.length);
    // console.log(areMonth);

    let monthHasSundday = [];
    let monthHasSaturday = [];
    let monthHasNotSaturday = [];

    areMonth.forEach(item => {
        if (item.includes("Minggu")) {
            monthHasSundday.push(item);
        } else if (item.includes("Sabtu")) {
            monthHasSaturday.push(item);
        } else {
            monthHasNotSaturday.push(item);
        }
    });

    return {
        monthHasSundday,
        monthHasSaturday,
        monthHasNotSaturday,
    };

}

const renderInfoShiftMonth = monthInfo => {
    $("#forResultMonthSelect").html('');
    return $("#forResultMonthSelect").html(`<h6 class="mb-0 fw-bold ">Informasi Perhitungan Sesi (Jumlah Hari)</h6>
                                            <hr>
                                            <li class="list-group-item d-flex">
                                                <div class="number border-end pe-2 fw-bold">
                                                    <strong class="color-light-success">1</strong>
                                                </div>
                                                <div class="cs-text flex-fill ps-2">
                                                    <span>Total hari</span>
                                                </div>
                                                <div class="vote-text">
                                                    <span class="text-muted">${monthInfo.monthHasSundday.length + monthInfo.monthHasSaturday.length + monthInfo.monthHasNotSaturday.length} Hari</span>
                                                </div>
                                            </li>
                                            <li class="list-group-item d-flex">
                                                <div class="number border-end pe-2 fw-bold">
                                                    <strong class="color-light-success">2</strong>
                                                </div>
                                                <div class="cs-text flex-fill ps-2">
                                                    <span>Total Hari Minggu</span>
                                                </div>
                                                <div class="vote-text">
                                                    <span class="text-muted">${monthInfo.monthHasSundday.length} Hari</span>
                                                </div>
                                            </li>
                                            <li class="list-group-item d-flex">
                                                <div class="number border-end pe-2 fw-bold">
                                                    <strong class="color-light-success">3</strong>
                                                </div>
                                                <div class="cs-text flex-fill ps-2">
                                                    <span>Total Hari Sabtu</span>
                                                </div>
                                                <div class="vote-text">
                                                    <span class="text-muted">${monthInfo.monthHasSaturday.length} Hari</span>
                                                </div>
                                            </li>
                                            
                                            <li class="list-group-item d-flex">
                                                <div class="number border-end pe-2 fw-bold">
                                                    <strong class="color-light-success">3</strong>
                                                </div>
                                                <div class="cs-text flex-fill ps-2">
                                                    <span>Total Hari non Minggu & Non Sabtu</span>
                                                </div>
                                                <div class="vote-text">
                                                    <span class="text-muted">${monthInfo.monthHasNotSaturday.length} Hari</span>
                                                </div>
                                            </li>
                                            `);
}

async function getShiftPraktikumInfo() {
    try {
        let strMonth = $("#monthSchedul").val();
        let room = $("#roomSchedul").val();
        let roomID = $("#roomSchedul").find(':selected').attr('data-id');
        let semester = $("#semesterSchedule").val();
        let semesterNum = $("#semesterSchedule").find(':selected').attr('data-semester');
        if (strMonth != '' || strMonth != 'Pilih Bulan' &&
            room != '' || room != 'Pilih Unit Instalasi') {
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            let numMonth = months.indexOf(strMonth);

            let currentYear = parseInt($("#yearSchedul").val());

            let resultMonth = getDaysMonth(numMonth, currentYear);


            let assign = await reAssign({
                Id_room: roomID,
                semester: semesterNum
            }, 'isNotArr', 'getPraktikumInRoom');

            if (assign.isCheck) {
                let response = await dispatch(_URLVALID, 'getDataByID', assign.data);
                console.log(response);

                response = {
                    resultMonth: resultMonth,
                    dosenInRoom: response,
                };

                return await renderInfoShiftPraktikum(response);
            }
        }

        toastr.warning('Data Required! Pilihan Bulan Tidak Boleh Kosong');
        toastr.warning('Data Required! Pilihan Ruangan Tidak Boleh Kosong');
        return toastr.warning('Data Required! Data Required! Data Tidak Lengkap');
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}

const renderInfoShiftPraktikum = response => {
    console.log(response);
    $("#forResultRoomSelect").html('');

    let shiftInMonth = (response.resultMonth.monthHasNotSaturday.length * 3) + (response.resultMonth.monthHasSaturday.length * 2);
    let totalShiftPraktikum = shiftInMonth / response.dosenInRoom.length;

    return $("#forResultRoomSelect").html(`<h6 class="mb-0 fw-bold ">Informasi Perhitungan Sesi</h6>
                                             <hr>
                                             <ul class="list-group mt-3">
                                                <li class="list-group-item d-flex">
                                                    <div class="number border-end pe-2 fw-bold">
                                                        <strong class="color-light-success">1</strong>
                                                    </div>
                                                    <div class="cs-text flex-fill ps-2">
                                                        <span>Total Praktikum</span>
                                                    </div>
                                                    <div class="vote-text">
                                                        <span class="text-muted">${response.dosenInRoom.length} Praktikum</span>
                                                    </div>
                                                </li>
                                                <li class="list-group-item d-flex">
                                                    <div class="number border-end pe-2 fw-bold">
                                                        <strong class="color-light-success">2</strong>
                                                    </div>
                                                    <div class="cs-text flex-fill ps-2">
                                                        <span>Total Sesi</span>
                                                    </div>
                                                    <div class="vote-text">
                                                        <span class="text-muted">${shiftInMonth}</span>
                                                    </div>
                                                </li>
                                             </ul>`);
}



async function startingAlgorithm() {
    try {
        let strMonth = $("#monthSchedul").val();
        let room = $("#roomSchedul").val();
        let roomID = $("#roomSchedul").find(':selected').attr('data-id');
        let semester = $("#semesterSchedule").val();
        let semesterNum = $("#semesterSchedule").find(':selected').attr('data-semester');

        if ((strMonth != '' && strMonth != 'Pilih Bulan') &&
            (room != '' && room != 'Pilih Ruangan') &&
            (semester != '' && semester != 'Pilih Semester')) {
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            let numMonth = months.indexOf(strMonth);

            let currentYear = parseInt($("#yearSchedul").val());

            let resultMonth = getDaysMonth(numMonth, currentYear);
            console.log(resultMonth);

            let assign = await reAssign({
                Id_room: roomID,
                semester: semesterNum
            }, 'isNotArr', 'getPraktikumInRoom');

            if (assign.isCheck) {
                let responseModals = await dispatch(_URLVALID, 'getDataByID', assign.data);
                let responseSchedule = await suddenDispatch(_URLVALID, 'dataSchedule', {
                    'tahun': currentYear,
                    'bulan': strMonth,
                    'Id_room': roomID,
                    'semester': semesterNum,
                });

                let checkExist = await suddenDispatch(_URLVALID, 'checkdataSchedule', {
                    'tahun': currentYear,
                    'bulan': strMonth,
                    'Id_room': roomID,
                    'semester': semesterNum,
                });
                // console.log(responseModals);
                // console.log(responseSchedule);

                if (responseModals.length === 0) {
                    toastr.warning(`Data Required! Data Praktikum Pada ${semester} Ruangan ${room} Belum Ada`);
                    return toastr.error('Silahkan Pilih Ruangan Lain !!!');
                } else if (responseModals.length > 4) {
                    toastr.warning(`Data Required! Jumlah Dosen Yang Bertugas Pada Ruangan ${room} Melebihi Kapasitas Ruangan`);
                    return toastr.error('Mohon Atur Ulang Dosen Yang Bertugas !!!');
                }

                if (checkExist.length > 0) {
                    toastr.error('Silahkan Pilih Semester Dan Ruangan Lainnya');
                    return toastr.success(`Jadwal Praktikum ${semester} Pada Ruangan ${room} Sudah Dibuat`);
                }

                responseModals = {
                    Id_room: roomID,
                    resultMonth: resultMonth,
                    dosenInRoom: responseModals,
                    dataSchedule: responseSchedule,
                };

                // console.log(responseModals);
                let responseResult = await inisialitationData(responseModals);

                return serveResponse({
                    'dataResult': responseResult,
                    'tahun': currentYear,
                    'bulan': strMonth,
                    'Id_room': roomID,
                    'semester': semesterNum,
                });
            }
        }

        toastr.warning('Pilihan Bulan Tidak Boleh Kosong');
        toastr.warning('Pilihan Unit Instalasi Tidak Boleh Kosong');
        return toastr.warning('Data Required! Data Tidak Lengkap');
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}

const inisialitationData = data => {
    return new Promise((resolve) => {
        // let arrDosenID = data.dosenInRoom.map((item, index, arr) => {
        //     // return `${item.Id_praktikum}.${item.Id_dosen}`;
        //     return {
        //         initial: `${item.Id_praktikum}.${item.Id_dosen}`,
        //         reqSesi: `${item.tanggal}`,
        //         dOff: `${item.start_date}, ${item.end_date}`,
        //     };
        // });

        // old Method
        // let arrDosenID = filteredDosenID.map(({
        //     Id_praktikum
        // }) => Id_praktikum);


        console.log(data);
        let resultSchedule;
        const ids = data.dosenInRoom.map(o => o.Id_praktikum);
        console.log(ids);
        const filteredDosenID = data.dosenInRoom.filter(({
            Id_praktikum
        }, index) => !ids.includes(Id_praktikum, index + 1));

        let arrDosenID = filteredDosenID.map((item, index, arr) => {
            return `${item.Id_praktikum}.${item.Id_dosen}`;
        });

        console.log(arrDosenID);

        let notSundayShift = schedul3Combination(data, arrDosenID);
        let sundayShift = schedul2Combination(data, arrDosenID);


        if (data.dataSchedule.length === 0) {
            resultSchedule = createNewOneSchedule(notSundayShift, sundayShift, arrDosenID);
        } else {
            resultSchedule = createNewLatestSchedule(notSundayShift, sundayShift, arrDosenID, data.dataSchedule, data.Id_room);
        }
        console.log(resultSchedule)
        resolve(resultSchedule);
    });
}

async function serveResponse(data) {
    try {
        let assign = await reAssign(data, 'createNewSchedule');
        if (assign.isCheck) {
            let response = await dispatch(_URLVALID, 'createNewSchedule', assign.data);
            console.log(response);
            closeOverlayForm();
            toastr.success(`Success ${response.message}`);
            return gettingShowSchedule(`${data.tahun}.${data.bulan}.${data.Id_room}`, 'byRoom');
        }
        return toastr.warning('Data Required! Data Tidak Lengkap');
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}