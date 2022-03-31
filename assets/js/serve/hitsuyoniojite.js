class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}

const fetching = (origin, e) => {
    return new Promise((resolve, reject) => {
        showLoad();
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log(xmlhttp.responseText)
                var response = JSON.parse(xmlhttp.responseText);
                resolve(response);
                hideLoad();
            }
        }
        xmlhttp.open('GET', `${origin}=${e}`);
        xmlhttp.send();
    });
}

function dispatch(origin, order, params) {
    return new Promise((resolve) => {
        $.ajax({
            type: 'POST',
            url: `${origin}=${order}`,
            data: params,
            processData: false,
            contentType: false,
            beforeSend: function () {
                showLoad();
            },
            success: function (response) {
                if (isJsonString(response)) {
                    response = JSON.parse(response);
                    resolve(response);
                }
                hideLoad();

            },
            error: function (xhr, ajaxOptions, thrownError) {

            }
        });
    });
}

function suddenDispatch(origin, order, params) {
    return new Promise((resolve) => {
        let formData = new FormData();
        formData.append('dataObjek', JSON.stringify(params));
        $.ajax({
            type: 'POST',
            url: `${origin}=${order}`,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                showLoad();
            },
            success: function (response) {
                if (isJsonString(response)) {
                    response = JSON.parse(response);
                    resolve(response);
                }
                hideLoad();
            },
            error: function (xhr, ajaxOptions, thrownError) {

            }
        });
    });
}

function reAssign(params, order, inAction = '') {
    return new Promise((resolve) => {
        switch (order) {
            case "modifiedRoom":
                var formData = new FormData();
                var isCheck = true;

                if (params != 'nol') {
                    params.forEach(function (item, i) {
                        if ($('#' + item).val() == "") {
                            isCheck = false;
                        }
                        formData.append(item, $('#' + item).val());
                    });
                }

                if (inAction != '') {
                    formData.append('status', inAction);
                    if (globalIdTable != 'anruc') {
                        formData.append('id', globalIdTable);
                    }
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });
                break;

            case 'modifiedDosen':
                var isCheck = true;
                var formData = new FormData();

                if (params != 'nol') {
                    params.forEach(function (item, i) {
                        if ($('#' + item).val() == "" ||
                            $('#' + item).val() == "Jenis Kelamin") {
                            isCheck = false;
                        }
                        formData.append(item, $('#' + item).val());
                    });

                }

                if (inAction != '') {
                    formData.append('status', inAction);
                    if (globalIdTable != 'anruc') {
                        formData.append('id', globalIdTable);
                    }
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });

                break;

            case 'modifiedPraktikum':
                var isCheck = true;
                var formData = new FormData();

                if (params != 'nol') {
                    params.forEach(function (item) {
                        if ($('#' + item).val() == "") {
                            isCheck = false;
                        }
                        formData.append(item, $('#' + item).val());
                    });

                    let dosenPraktikum = $("#dosenSelectOps").val();
                    let dosenPraktikumID = $("#dosenSelectOps").find(':selected').attr('data-id');
                    formData.append(`dosenSelectOps`, dosenPraktikum);
                    formData.append(`dosenSelectOpsID`, dosenPraktikumID);

                    let ruanganPraktikum = $("#roomSelectOps").val();
                    let ruanganPraktikumID = $("#roomSelectOps").find(':selected').attr('data-id');
                    formData.append(`roomSelectOps`, ruanganPraktikum);
                    formData.append(`roomSelectOpsID`, ruanganPraktikumID);

                    let semesterPraktikum = $("#semester").val();
                    let semesterNumber = $("#semester").find(':selected').attr('data-semester');
                    formData.append(`semester`, semesterPraktikum);
                    formData.append(`semesterNumber`, semesterNumber);


                    if (dosenPraktikum == '' ||
                        dosenPraktikum == undefined ||
                        dosenPraktikum == null ||
                        dosenPraktikum == 'Pilih Dosen' ||
                        dosenPraktikumID == '' ||
                        dosenPraktikumID == null ||
                        dosenPraktikumID == undefined ||
                        dosenPraktikumID == 'kosong' ||
                        ruanganPraktikum == '' ||
                        ruanganPraktikum == undefined ||
                        ruanganPraktikum == null ||
                        ruanganPraktikum == 'Pilih Ruangan' ||
                        ruanganPraktikumID == '' ||
                        ruanganPraktikumID == null ||
                        ruanganPraktikumID == undefined ||
                        ruanganPraktikumID == 'kosong' ||
                        semesterPraktikum == '' ||
                        semesterPraktikum == undefined ||
                        semesterPraktikum == null ||
                        semesterPraktikum == 'Pilih Semester' ||
                        semesterNumber == '' ||
                        semesterNumber == null ||
                        semesterNumber == undefined
                    ) {
                        isCheck = false;
                    }
                }

                if (inAction != '') {
                    formData.append('status', inAction);
                    if (globalIdTable != 'anruc') {
                        formData.append('id', globalIdTable);
                    }
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });

                break;

            case "modifiedSesi":
                var formData = new FormData();
                var isCheck = true;

                if (params != 'nol') {
                    params.forEach(function (item, i) {
                        if ($('#' + item).val() == "") {
                            isCheck = false;
                        }
                        formData.append(item, $('#' + item).val());
                    });
                }

                if (inAction != '') {
                    formData.append('status', inAction);
                    if (globalIdTable != 'anruc') {
                        formData.append('id', globalIdTable);
                    }
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });
                break;

            case 'modifiedSesiRequest':
                var isCheck = true;
                var formData = new FormData();

                if (params != 'nol') {
                    params.forEach(function (item, i) {
                        if ($('#' + item).val() == "") {
                            isCheck = false;
                        }
                        formData.append(item, $('#' + item).val());
                    });


                    let dosenSelectOps1 = $("#dosenSelectOps1").val();
                    let dosenSelectOps1ID = $("#dosenSelectOps1").find(':selected').attr('data-id');
                    formData.append(`dosenSelectOps1`, dosenSelectOps1);
                    formData.append(`dosenSelectOps1ID`, dosenSelectOps1ID);


                    let jadwalSesiSelectOps = $("#jadwalSesiSelectOps").val();
                    let jadwalSesiSelectOpsID = $("#jadwalSesiSelectOps").find(':selected').attr('data-id');
                    formData.append(`jadwalSesiSelectOps`, jadwalSesiSelectOps);
                    formData.append(`jadwalSesiSelectOpsID`, jadwalSesiSelectOpsID);


                    if (dosenSelectOps1 == '' ||
                        dosenSelectOps1 == undefined ||
                        dosenSelectOps1 == null ||
                        dosenSelectOps1 == 'Pilih Dosen' ||
                        dosenSelectOps1ID == '' ||
                        dosenSelectOps1ID == null ||
                        dosenSelectOps1ID == undefined ||
                        dosenSelectOps1ID == 'kosong' ||
                        jadwalSesiSelectOps == '' ||
                        jadwalSesiSelectOps == undefined ||
                        jadwalSesiSelectOps == null ||
                        jadwalSesiSelectOps == 'Pilih Sesi' ||
                        jadwalSesiSelectOpsID == '' ||
                        jadwalSesiSelectOpsID == null ||
                        jadwalSesiSelectOpsID == undefined ||
                        jadwalSesiSelectOpsID == 'kosong'
                    ) {
                        isCheck = false;
                    }
                }

                if (inAction != '') {
                    formData.append('status', inAction);
                    if (globalIdTable != 'anruc') {
                        formData.append('id', globalIdTable);
                    }
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });

                break;

            case 'modifiedDayOff':
                var isCheck = true;
                var formData = new FormData();

                if (params != 'nol') {
                    params.forEach(function (item) {
                        if ($('#' + item).val() == "") {
                            isCheck = false;
                        }
                        formData.append(item, $('#' + item).val());
                    });

                    let dosenSelectOps2 = $("#dosenSelectOps2").val();
                    let dosenSelectOps2ID = $("#dosenSelectOps2").find(':selected').attr('data-id');
                    formData.append(`dosenSelectOps2`, dosenSelectOps2);
                    formData.append(`dosenSelectOps2ID`, dosenSelectOps2ID);

                    if (dosenSelectOps2 == '' ||
                        dosenSelectOps2 == undefined ||
                        dosenSelectOps2 == null ||
                        dosenSelectOps2 == 'Pilih Dosen' ||
                        dosenSelectOps2ID == '' ||
                        dosenSelectOps2ID == null ||
                        dosenSelectOps2ID == undefined ||
                        dosenSelectOps2ID == 'kosong'
                    ) {
                        isCheck = false;
                    }
                }

                if (inAction != '') {
                    formData.append('status', inAction);
                    if (globalIdTable != 'anruc') {
                        formData.append('id', globalIdTable);
                    }
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });

                break;

            case 'modifiedAppSettings':
                var isCheck = true;
                var formData = new FormData();

                if (params != 'nol') {
                    params.forEach(function (item) {
                        if ($('#' + item).val() == "" ||
                            $('#' + item).val() == "Jenis Kelamin") {
                            isCheck = false;
                        }
                        formData.append(item, $('#' + item).val());
                    });
                }

                $strCheck = $('#appAdmSetPassId').val();
                $strCheck1 = $('#appAdmSetRepassId').val();

                if ($strCheck.length < 6 || $strCheck1 < 6) {
                    isCheck = false;
                    toastr.warning('Data Required! Password Lemah');

                } else if ($strCheck !== $strCheck1) {
                    isCheck = false;
                    toastr.warning('Data Required! Password Tidak Sama');

                }


                if (inAction != '') {
                    formData.append('status', inAction);
                    if (globalIdTable != 'anruc') {
                        formData.append('id', globalIdTable);
                    }
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });

                break;

            case 'isNotArr':
                var isCheck = false;
                var formData = new FormData();
                if (params != '') {
                    isCheck = true;
                    if (inAction == 'getPraktikumInRoom') {
                        formData.append('Id_room', params.Id_room);
                        formData.append('semester', params.semester);
                    } else {
                        formData.append('databyId', params);
                    }
                }

                if (inAction != '') {
                    formData.append('forTable', inAction);
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });

                break;

            case 'createNewSchedule':
                var isCheck = false;
                var formData = new FormData();
                if (params != '') {
                    isCheck = true;
                    formData.append('dataResult', JSON.stringify(params.dataResult));
                    formData.append('checkSum', params.dataResult.length);
                    formData.append('bulan', params.bulan);
                    formData.append('tahun', params.tahun);
                    formData.append('Id_room', params.Id_room);
                    formData.append('semester', params.semester);
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });

                break;

            case 'schedul':
                var isCheck = false;
                var formData = new FormData();
                if (params != '') {
                    isCheck = true;
                    formData.append('arrData', JSON.stringify(params.data));
                    formData.append('checkum', params.data.length);
                    formData.append('month', params.month);
                    formData.append('year', params.year);

                }

                if (inAction != '') {
                    formData.append('status', inAction);
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });

                break;

            case 'modifiedScheduleRoomSemester':
                var isCheck = false;
                var formData = new FormData();
                if (params != '') {
                    isCheck = true;
                    let paramsDelete = globalIdTable.split(".");
                    formData.append('tahun', paramsDelete[0]);
                    formData.append('bulan', paramsDelete[1]);
                    formData.append('Id_room', paramsDelete[2]);
                    formData.append('semester', paramsDelete[4]);
                }

                if (inAction != '') {
                    formData.append('status', inAction);
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });

                break;

            case 'scheduleInfoMonth':
                var isCheck = false;
                var formData = new FormData();
                if (params != '') {
                    isCheck = true;
                    formData.append('month', params);
                }

                if (inAction != '') {
                    formData.append('status', inAction);
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });

                break;

            case 'scheduleInfoMonth1':
                var isCheck = false;
                var formData = new FormData();
                if (params != '') {
                    isCheck = true;
                    formData.append('month', params);
                }

                if (inAction != '') {
                    formData.append('status', inAction);
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });

                break;

            case 'scheduleInfoRoom':
                var isCheck = false;
                var formData = new FormData();
                if (params != '') {
                    isCheck = true;
                    params = params.split(",");
                    formData.append('Id_room', params[1]);
                    formData.append('month', params[0]);
                }

                if (inAction != '') {
                    formData.append('status', inAction);
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });

                break;

            case 'modifiedSchedule':
                var isCheck = false;
                var formData = new FormData();
                if (params != '') {
                    isCheck = true;
                    let dataDelete = globalIdTable.split(".");
                    formData.append('Id_room', dataDelete[1]);
                    formData.append('month', dataDelete[0]);
                }

                if (inAction != '') {
                    formData.append('status', inAction);
                }

                resolve({
                    data: formData,
                    isCheck: isCheck,
                });

                break;

            default:
                break;
        }
    });
}

function switchObjekForm(order) {
    return new Promise((resolve) => {
        let isObjekForm = '';
        if (order == 'meinKosu1') {
            isObjekForm = roomObjekForm;
        } else if (order == 'meinKosu2') {
            isObjekForm = dosenObjekForm;
        } else if (order == 'meinKosu3') {
            isObjekForm = praktikumObjekForm;
        } else if (order == 'meinKosu4') {
            isObjekForm = jadwalSesiObjekForm;
        } else if (order == 'meinKosu5') {
            isObjekForm = sesiRequestObjekForm;
        } else if (order == 'meinKosu6') {
            isObjekForm = dayOffObjekForm;
        } else if (order == 'meinKosu7') {
            isObjekForm = schedulObjekForm;
        }
        resolve(isObjekForm);
    });
}

const getValueIndexArr = (id, arrObj, order) => {
    return new Promise((resolve) => {
        let isObj = '';

        switch (order) {
            case 'meinKosu1':
                isObj = arrObj.find(el => parseInt(el.Id_room) == parseInt(id));
                resolve(isObj);
                break;

            case 'meinKosu2':
                isObj = arrObj.find(el => parseInt(el.Id_dosen) == parseInt(id));
                resolve(isObj);
                break;

            case 'meinKosu3':
                isObj = arrObj.find(el => parseInt(el.Id_praktikum) == parseInt(id));
                resolve(isObj);
                break;

            case 'meinKosu4':
                isObj = arrObj.find(el => parseInt(el.Id_shift) == parseInt(id));
                resolve(isObj);
                break;

            case 'meinKosu5':
                isObj = arrObj.find(el => parseInt(el.Id_shift_request) == parseInt(id));
                resolve(isObj);
                break;

            case 'meinKosu6':
                isObj = arrObj.find(el => parseInt(el.Id_day_off) == parseInt(id));
                resolve(isObj);
                break;

            case 'Addpenilaian':
                id = id.split('.')[0];
                let masyarakatnotVerified = arrObj.data.notVerified.find(el => parseInt(el.Id_masyarakat) == parseInt(id));

                let kriteriaNsubkrit1 = arrObj.additionalData;
                isObj = {
                    masyarakat: masyarakatnotVerified,
                    kriteriaNsubkrit: kriteriaNsubkrit1
                }
                resolve(isObj);
                break;

            case 'identity':
                isObj = arrObj.find(el => parseInt(el.Id_appcontroller) == parseInt(id));
                resolve(isObj);
                break;

            default:
                break;
        }

    });
}

function convertFormOps(params, order) {
    let container = '';
    if (order != 'semester' && order != 'year') {
        params.forEach(element => {
            if (order == 'dosen') {
                container += `<option data-id="${element.Id_dosen}">
                                    ${element.nama_dosen}
                              </option>`;
            } else if (order == 'room') {
                container += `<option data-id="${element.Id_room}">
                                    ${element.nama_room}
                              </option>`;
            } else if (order == 'jadwal') {
                container += `<option data-id="${element.Id_shift}">
                                    ${element.shift}
                              </option>`;
            } else if (order == 'month') {
                container += `<option>
                                    ${element}
                              </option>`;
            } else if (order == 'department') {
                // container += `<option data-id="${element.Id_department}">
                //                     ${element.nama_department}
                //               </option>`;
            }
        });
    } else if (order == 'year') {
        container += `<option>
                            ${params}
                     </option>`;
    } else if (order == 'semester') {
        for (let index = 1; index < 9; index++) {
            container += `<option data-semester="${index}">
                            Semester ${index}
                          </option>`;
        }
    }

    return container;
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function isEmptyObject(obj) {
    return JSON.stringify(obj) === '{}';
}

const isEmptyObject_v1 = obj => {
    return new Promise((resolve) => {
        const isEmpty = Object.keys(obj).length === 0;
        // console.log(isEmpty); // 👉️ true

        // return isEmpty;
        resolve(isEmpty);
    });
}

const sanitalitationText = data => {
    return data.replace(/(\r\n|\n|\r)/gm, "").trim();
}

const convertContextAsync = order => {
    return new Promise((resolve) => {
        let context = '';
        if (order == 'meinKosu3') {
            context = 'tbRoomNDosen';
        } else if (order == 'meinKosu4') {
            // context = 'tbDoctor';
        } else if (order == 'meinKosu5') {
            context = 'tbDosenNShift';
        } else if (order == 'meinKosu6') {
            context = 'tbDosen';
        } else if (order == 'meinKosu7') {
            context = 'tbDosenDOffRoomSesiReq';
        } else if (order == 'meinKosu8') {
            // 
        } else if (order == 'meinKosu9') {
            // 
        }
        resolve(context);
    });
}

const MyToastr = (type, message = '') => {
    return new Promise((resolve) => {
        let backgroundColor;

        if (type == 'Success') {
            backgroundColor = "linear-gradient(to right, #00b09b, #96c93d)";
        } else if (type == 'Warning') {
            backgroundColor = "linear-gradient(to right, #FFF89A, #FFC900)";
        } else {
            backgroundColor = "linear-gradient(to right, #FF5959, #FF1700)";
        }

        resolve(function () {
            Toastify({
                text: message,
                duration: 1000000,
                backgroundColor: backgroundColor,
            }).showToast();
        }());
    });
}

const auth = response => {
    return new Promise((resolve) => {
        resolve(function () {
            if (parseInt(response) === 0) {
                window.location.href = '../exit.php';
            }
        }());
    });
}