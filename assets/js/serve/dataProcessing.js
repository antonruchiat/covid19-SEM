var globalBigData = [],
    globalDomOverlay = '',
    globalIdTable = 0,
    globalIdKriteria = '',
    globalIsKriteria = '',
    globalSelectCriteria = '',
    boilerForm = {},

    roomObjekForm = {
        isForm: 5,
        width: 28,
        height: 15,
        heightContainer: 280,
    },
    dosenObjekForm = {
        isForm: 5,
        width: 28,
        height: 15,
        heightContainer: 455,
    },
    praktikumObjekForm = {
        isForm: 5,
        width: 28,
        height: 15,
        heightContainer: 580,
    },
    jadwalSesiObjekForm = {
        isForm: 5,
        width: 28,
        height: 15,
        heightContainer: 450,
    },
    sesiRequestObjekForm = {
        isForm: 5,
        width: 28,
        height: 15,
        heightContainer: 380,
    },
    dayOffObjekForm = {
        isForm: 5,
        width: 28,
        height: 15,
        heightContainer: 380,
    },
    schedulObjekForm = {
        isForm: 5,
        width: 28,
        height: 15,
        heightContainer: 510,
    },

    tagFormRoom = [
        'roomName',
    ],
    tagFormDosen = [
        'dosenNIDN',
        'dosenName',
        'dosenGender',
    ],
    tagFormPraktikum = [
        'praktikumKode',
        'praktikumName',
        'jumlahPraktikum',
    ],
    tagFormSesi = [
        'kodeSesi',
        'namaSesi',
        'waktuMulai',
        'waktuAkhir',
    ],
    tagFormSesiRequest = [
        'tanggalRequest',
    ],
    tagFormDayOff = [
        'startDate',
        'endDate',
    ],

    tagFormAppsettings = [
        'appAdmSetNameId',
        'appAdmSetGenderId',
        'appAdmSetBirthDayId',
        'appAdmSetPhoneDayId',
        'appAdmSetEmailId',
        'appAdmSetPassId',
        'appAdmSetRepassId',
    ];

const _URL = "http://localhost/ajockey/dev/greedy-han/";
const _URLVALID = "assets/vendors/scripts/engine/override.php?order";



async function addData(dom, order) {
    try {
        let isObjekForm = await switchObjekForm(order);
        isObjekForm.newData = true;
        await gettingFormAsync(dom, order, isObjekForm);
        return await gettingAnimFormAsync(order, []);
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}

async function gettingDataAsync(dom, dataId, order, paramMenus) {
    try {
        let response = await getValueIndexArr(dataId, globalBigData, order);
        console.log(response);

        let isObjekForm = await switchObjekForm(order);
        isObjekForm.Title = 'Edit';
        isObjekForm.newData = false;

        return await paramMenus(dom, order, response, isObjekForm, {
            renderFormFunc1: gettingFormAsync,
            renderFormFunc2: gettingAnimFormAsync,
        });
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}

const renderFormAsync = (dom, order, params, isObjekForm, paramFunctions) => {
    return new Promise((resolve) => {
        resolve(function () {
            paramFunctions.renderFormFunc1(dom, order, isObjekForm);
            paramFunctions.renderFormFunc2(order, params);
        }());
    });
};

const gettingFormAsync = (dom, order, objekForm) => {
    return new Promise((resolve) => {
        resolve(function () {

            let title = objekForm.Title != undefined ? `Form ${objekForm.Title} Data` : `Form Add Data`;

            globalDomOverlay = dom;
            boilerForm = objekForm;

            $('.overlayFormHeader h5').html(title.toUpperCase());
            var atas = $(dom).offset().top - $(document).scrollTop();
            var kiri = $(dom).offset().left;
            var lebar = $(dom).width();
            var tinggi = $(dom).height();
            var layar = $('body').width();
            var tinggiLayar = $('body').height() - 20;

            $('.overlayForm').show();
            $('.overlayFormContainer').css({
                'width': `${(objekForm.newData == true) ? (lebar+objekForm.width) : (lebar+35)}px`,
                'height': `${(objekForm.newData == true) ? (tinggi+objekForm.height) : (tinggi+18)}px`,
                'top': atas + 'px',
                'left': kiri + 'px',
                'transform': 'translate(0, 0)',
                'border-radius': `${objekForm.isForm}px`,
                'display': 'block'
            });
            setTimeout(() => {
                $('.overlayFormContainer').css({
                    'width': '900px',
                    // 'height': (tinggiLayar < 705 ? tinggiLayar + 'px' : `${objekForm.heightContainer}px`),
                    'height': (`${objekForm.heightContainer}px`),
                    'top': '50%',
                    'left': '50%',
                    'transform': 'translate(-50%, -50%)',
                    // 'margin-left': '-460px',
                    // 'margin-top': (tinggiLayar < 700 ? -tinggiLayar / 2 + 'px' : '-350px'),
                    'border-radius': '5px'
                });
            }, 200);
        }());
    });
};

const gettingAnimFormAsync = (order, params) => {
    return new Promise((resolve) => {
        resolve(function () {
            setTimeout(() => {
                $('body').css({
                    'overflow-y': 'hidden'
                });
                $('.overlayFormHeader').show();
                $('.overlayFormHeader').css({
                    'display': 'flex',
                    'justify-content': 'space-between',
                    'align-items': 'center',
                    'padding': '0 10px',
                });
                let contextAction = '';
                switch (order) {
                    case 'meinKosu1':
                        formRoom(params);
                        contextAction = (params.length == 0 ? 'addRoom' : 'editRoom');
                        $("#forEverySave").addClass(contextAction);
                        break;

                    case 'meinKosu2':
                        formDosen(params);
                        contextAction = (params.length == 0 ? 'addDosen' : 'editDosen');
                        $("#forEverySave").addClass(contextAction);
                        break;

                    case 'meinKosu3':
                        getDataBeforeForm(formPraktikum, params, order);
                        contextAction = (params.length == 0 ? 'addPraktikum' : 'editPraktikum');
                        $("#forEverySave").addClass(contextAction);
                        break;

                    case 'meinKosu4':
                        formShift(params);
                        contextAction = (params.length == 0 ? 'addSesi' : 'editSesi');
                        $("#forEverySave").addClass(contextAction);
                        break;

                    case 'meinKosu5':
                        getDataBeforeForm(formSesiRequest, params, order);
                        contextAction = (params.length == 0 ? 'addSesiRequest' : 'editSesiRequest');
                        $("#forEverySave").addClass(contextAction);
                        break;

                    case 'meinKosu6':
                        getDataBeforeForm(formDayOff, params, order);
                        contextAction = (params.length == 0 ? 'addDayOff' : 'editDayOff');
                        $("#forEverySave").addClass(contextAction);
                        break;

                    case 'meinKosu7':
                        getDataBeforeForm(formSchedul, params, order);
                        // contextAction = (params.length == 0 ? 'addSchedul' : 'editSchedul');
                        contextAction = ('addSchedule');
                        $("#forEverySave").addClass(contextAction);
                        break;


                    default:
                        break;
                }
                $('.overlayFormBody').show();

                $('.overlayFormFooter').show();
                $('.overlayFormFooter').css({
                    'display': 'flex',
                    'justify-content': 'flex-end',
                    'align-items': 'center',
                    'padding': '0 10px',
                });
                // setup tinggi body form
                var hForm = $('.overlayFormContainer').height(),
                    hBody = hForm - 103;
                $('.overlayFormBody').css({
                    'height': hBody + 'px'
                });
            }, 600);
        }());
    });
};

function closeOverlayForm() {
    var dom = globalDomOverlay;
    $('body').css({
        'overflow-y': 'auto'
    });
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();

    $('.overlayFormHeader').hide();
    $('.overlayFormBody').hide();
    $('.overlayFormFooter').hide();
    $('.overlayFormContainer').css({
        'width': `${(boilerForm.newData == true ? (lebar+boilerForm.width): (lebar+35))}px`,
        'height': `${(boilerForm.newData) == true ? (tinggi+boilerForm.height) : (tinggi+18)}px`,
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': `${boilerForm.isForm}px`,
        'transform': 'translate(0, 0)',
    });
    setTimeout(function () {
        $('.overlayForm').hide();
        $('.overlayFormContainer').hide();
        $('.overlayFormFooter').html(`<button type="submit" class="btn btn-primary" id="forEverySave">
                                            Save
                                            <span class="btn-icon-right" style="padding: 12px;">
                                                <i class="fa fa-save"></i>
                                            </span>
                                      </button>`);
    }, 450);
}

async function gettingDeleteItem(dom, id, order, paramMenus) {
    try {
        return await paramMenus(dom, order, id, {
            renderFormFunc1: gettingFormDeleteAsync,
            renderFormFunc2: gettingAnimFormDeleteAsync,
        });
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}

const renderDelFormAsync = (dom, order, params, paramFunctions) => {
    return new Promise((resolve) => {
        resolve(function () {
            paramFunctions.renderFormFunc1(dom);
            paramFunctions.renderFormFunc2(order, params);
        }());
    });
};

const gettingFormDeleteAsync = (dom) => {
    return new Promise((resolve) => {
        resolve(function () {
            let title = 'Form Delete Item';
            globalDomOverlay = dom;
            // boilerForm = objekForm;
            $('.overlayHeaderDelete h5').html(title.toUpperCase());
            var atas = $(dom).offset().top - $(document).scrollTop();
            var kiri = $(dom).offset().left;
            var lebar = $(dom).width();
            var tinggi = $(dom).height();
            var layar = $('body').width();
            var tinggiLayar = $('body').height() - 20;

            $('.overlayNotifDelete').show();

            $('.overlayContainerDelete').css({
                'width': lebar + 33 + 'px',
                'height': tinggi + 18 + 'px',
                'top': atas + 'px',
                'left': kiri + 'px',
                'transform': 'translate(0, 0)',
                'border-radius': '5px',
                'display': 'block'
            });

            setTimeout(function () {
                $('.overlayContainerDelete').css({
                    'width': '520px',
                    'height': 235 + 'px',
                    'top': '50%',
                    'left': '50%',
                    'transform': 'translate(-50%, -50%)',
                    // 'margin-left': '-460px',
                    // 'margin-top': (tinggiLayar < 700 ? -tinggiLayar / 2 + 'px' : '-350px'),
                    'border-radius': '5px'
                });
            }, 200);
        }());
    });
}

const gettingAnimFormDeleteAsync = (order, params) => {
    return new Promise((resolve) => {
        resolve(function () {
            setTimeout(function () {
                $('body').css({
                    'overflow-y': 'hidden'
                });
                $('.overlayHeaderDelete').show();
                $('.overlayHeaderDelete').css({
                    'display': 'flex',
                    'justify-content': 'space-between',
                    'align-items': 'center',
                    'padding': '0 10px',
                });

                switch (order) {
                    case 'meinKosu1':
                        formDelete(params, 'Ruangan');
                        $("#forEveryBtnDel").addClass('deleteRoom')
                        break;

                    case 'meinKosu2':
                        formDelete(params, 'Dosen');
                        $("#forEveryBtnDel").addClass('deleteDosen')
                        break;

                    case 'meinKosu3':
                        formDelete(params, 'Praktikum');
                        $("#forEveryBtnDel").addClass('deletePraktikum')
                        break;

                    case 'meinKosu4':
                        formDelete(params, 'Jadwal Sesi');
                        $("#forEveryBtnDel").addClass('deleteSesi')
                        break;

                    case 'meinKosu5':
                        formDelete(params, 'Sesi Request');
                        $("#forEveryBtnDel").addClass('deleteSesiRequest')
                        break;

                    case 'meinKosu6':
                        formDelete(params, 'Day Off');
                        $("#forEveryBtnDel").addClass('deleteDayOff')
                        break;

                    case 'meinKosu7':
                        formDelete(params, 'Schedul');
                        $("#forEveryBtnDel").addClass('deleteSchedul')
                        break;

                    case 'meinKosu8':
                        let contextDelMonth = params.split(".")[0];
                        formDelete(params, `Schedul Bulan ${contextDelMonth}`);
                        $("#forEveryBtnDel").addClass('deleteScheduleRoom')
                        break;

                    case 'meinKosu11':
                        let delSemester = params.split(".");
                        formDelete(params, `Schedule Bulan ${delSemester[1]} Ruangan ${delSemester[3]} Semester ${delSemester[4]}`);
                        $("#forEveryBtnDel").addClass('deleteScheduleRoomSemester')
                        break;

                    case 'shownSchedulingRoom':
                        let contextMonth = params.split(".")[0];
                        formDelete(params, `Schedul Bulan ${contextMonth}`);
                        $("#forEveryBtnDel").addClass('deleteScheduleRoom')
                        break;

                    default:
                        break;
                }

                $('.overlayBodyDelete').show();

                $('.overlayFooterDelete').show();
                $('.overlayFooterDelete').css({
                    'display': 'flex',
                    'justify-content': 'flex-end',
                    'align-items': 'center',
                    'padding': '0 10px',
                });

                // setup tinggi body form
                var hForm = $('.overlayContainerDelete').height(),
                    hBody = hForm - 95;
                $('.overlayBodyDelete').css({
                    'height': hBody + 'px'
                });
            }, 600);
        }());
    });
}

function closeOverlayDelete() {
    var dom = globalDomOverlay;
    $('.overlayHeaderDelete h5').html('');
    $('body').css({
        'overflow-y': 'auto'
    });
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    $('.overlayHeaderDelete').hide();
    $('.overlayBodyDelete').hide();
    $('.overlayFooterDelete').hide();
    $('.overlayContainerDelete').css({
        'width': lebar + 33 + 'px',
        'height': tinggi + 18 + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '5px',
        'transform': 'translate(0, 0)',
    });
    setTimeout(function () {
        $('.overlayNotifDelete').hide();
        $('.overlayContainerDelete').hide();
        $('.overlayFooterDelete').html(`<button type="button" class="btn btn-primary" id="forEveryBtnDel">
                                            Delete
                                            <span class="btn-icon-right" style="padding: 12px;">
                                                <i class="fa fa-trash"></i>
                                            </span>
                                        </button>`);
    }, 450);
}

async function processingData(order, action) {
    try {
        let formTag;
        if (order == 'modifiedRoom') {
            formTag = tagFormRoom;
        } else if (order == 'modifiedDosen') {
            formTag = tagFormDosen;
        } else if (order == 'modifiedPraktikum') {
            formTag = tagFormPraktikum;
        } else if (order == 'modifiedSesi') {
            formTag = tagFormSesi;
        } else if (order == 'modifiedSesiRequest') {
            formTag = tagFormSesiRequest;
        } else if (order == 'modifiedDayOff') {
            formTag = tagFormDayOff;
        }
        // 
        else if (order == 'modifiedAppSettings') {
            formTag = tagFormAppsettings;
        }

        let assign = await reAssign(formTag, order, action);

        if (assign.isCheck) {
            let response = await dispatch(_URLVALID, order, assign.data);

            console.log(response);

            if (response.title == 1) {
                if (order == 'modifiedAppSettings') {
                    toastr.success(`Success ${response.message}`);
                    return setTimeout(() => {
                        window.location.replace(`${_URL}app/`);
                    }, 1000);
                }

                closeOverlayForm();
                toastr.success(`Success ${response.message}`);

                if (order == 'modifiedRoom') {
                    return await gettingMenuAsync(meinKosu1, 'meinKosu1');
                } else if (order == 'modifiedDosen') {
                    return await gettingMenuAsync(meinKosu2, 'meinKosu2');
                } else if (order == 'modifiedPraktikum') {
                    return await gettingMenuAsync(meinKosu3, 'meinKosu3');
                } else if (order == 'modifiedSesi') {
                    return await gettingMenuAsync(meinKosu4, 'meinKosu4');
                } else if (order == 'modifiedSesiRequest') {
                    return await gettingMenuAsync(meinKosu5, 'meinKosu5');
                } else if (order == 'modifiedDayOff') {
                    return await gettingMenuAsync(meinKosu6, 'meinKosu6');
                } else if (order == 'modifiedSchedule') {
                    return await gettingMenuAsync(meinKosu8, 'meinKosu8');
                }
            }
            return toastr.success(`${response.title}!  ${response.message}`)
        }
        return toastr.warning('Data Required! Data Tidak Lengkap');
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}

async function deleteItem(order, action) {
    try {
        let assign = await reAssign('nol', order, action);

        console.log(assign.data);

        if (assign.isCheck) {
            let response = await dispatch(_URLVALID, order, assign.data);
            console.log(response);

            if (response.title == 1) {
                closeOverlayDelete();
                toastr.success(`Success ${response.message}`);

                if (order == 'modifiedRoom') {
                    return await gettingMenuAsync(meinKosu1, 'meinKosu1');
                } else if (order == 'modifiedDosen') {
                    return await gettingMenuAsync(meinKosu2, 'meinKosu2');
                } else if (order == 'modifiedPraktikum') {
                    return await gettingMenuAsync(meinKosu3, 'meinKosu3');
                } else if (order == 'modifiedSesi') {
                    return await gettingMenuAsync(meinKosu4, 'meinKosu4');
                } else if (order == 'modifiedSesiRequest') {
                    return await gettingMenuAsync(meinKosu5, 'meinKosu5');
                } else if (order == 'modifiedDayOff') {
                    return await gettingMenuAsync(meinKosu6, 'meinKosu6');
                } else if (order == 'modifiedSchedule') {
                    return await gettingMenuAsync(meinKosu8, 'meinKosu8');
                } else if (order == 'modifiedScheduleRoomSemester') {
                    let getParamsDelete = globalIdTable.split(".");
                    return gettingShowSchedule(`${getParamsDelete[0]}.${getParamsDelete[1]}.${getParamsDelete[2]}`, 'byRoom')
                }
            }
            return toastr.success(`${response.title}!  ${response.message}`);
        }
        return toastr.warning('Data Required! Data Tidak Lengkap');
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}

function processExportingData(params, order) {
    return new Promise((resolve) => {
        params = params.split('.');
        let itsYear = params[0];
        let itsMonth = params[1];
        let itsRoom = params[2];
        let itsSemes = params[3];
        resolve(function () {
            window.open(`${_URLVALID}=${order}&itsYear=${itsYear}&itsMonth=${itsMonth}&itsRoom=${itsRoom}&itsSemes=${itsSemes}`, '_blank');
        }());
    });
}

async function implementChartJS(data) {
    try {
        if (parseInt(data) === 0) {
            return await auth(data);
        }
        return await gettingTabulatedData(data);
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}

const gettingTabulatedData = data => {
    return new Promise((resolve) => {
        resolve(function () {

            // const bgCard = ['purple', 'blue', 'green', 'red'];

            // const iconCards = [
            //     'icon dripicons-archive',
            //     'iconly-boldProfile',
            //     'icon dripicons-store',
            //     'iconly-boldBookmark',
            // ];
            // const arrLabels = ['Schedule', 'Dosen', 'Ruangan', 'Semester'];

            $("#TopTabulatedData").html('');

            let complimentUX = {
                countSchedule: {
                    arrLabel: 'Schedule',
                    bgCard: 'purple',
                    iconCard: 'icon dripicons-archive'
                },
                countDosen: {
                    arrLabel: 'Dosen',
                    bgCard: 'blue',
                    iconCard: 'iconly-boldProfile',
                },
                countRooms: {
                    arrLabel: 'Ruangan',
                    bgCard: 'green',
                    iconCard: 'icon dripicons-store',
                },
                countSemester: {
                    arrLabel: 'Semester',
                    bgCard: 'red',
                    iconCard: 'iconly-boldBookmark',
                },
            }

            let rowsCardData = '';

            for (const key in data) {
                for (const key1 in complimentUX) {
                    if (key !== 'countSemester') {
                        if (key === key1) {
                            rowsCardData += `<div class="col-6 col-lg-3 col-md-6">
                                                <div class="card">
                                                    <div class="card-body px-3 py-4-5">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="stats-icon ${complimentUX[key1].bgCard}">
                                                                    <i class="${complimentUX[key1].iconCard}"></i>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <h6 class="text-muted font-semibold">${complimentUX[key1].arrLabel}</h6>
                                                                <h6 class="font-extrabold mb-0">${data[key]}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
                        }
                    }
                }
            }

            rowsCardData += `<div class="col-6 col-lg-3 col-md-6">
                                                <div class="card">
                                                    <div class="card-body px-3 py-4-5">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="stats-icon ${complimentUX.countSemester.bgCard}">
                                                                    <i class="${complimentUX.countSemester.iconCard}"></i>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <h6 class="text-muted font-semibold">${complimentUX.countSemester.arrLabel}</h6>
                                                                <h6 class="font-extrabold mb-0">${data.countSemester.length}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;

            $("#TopTabulatedData").html(rowsCardData);
        }());
    });
}

const gettingTopCategories = data => {
    return new Promise((resolve) => {
        resolve(function () {

            const bgTraining = ['bg-voilet', 'bg-red-light', 'bg-sunset', 'bg-wall'];
            const totalTraining = data.dataTraining.reduce((n, {
                jumlah
            }) => n + parseInt(jumlah), 0);

            const sorterTraining = data.dataTraining.sort(function (a, b) {
                return parseFloat(b.jumlah) - parseFloat(a.jumlah);
            });

            $("#TopCategoriesDataTraining").html('');
            let rowsTraining = `<div class="d-lg-flex align-items-center">
                                    <div>
                                        <h5 class="mb-4">Top Categories Data Training</h5>
                                    </div>
                                </div>`;
            sorterTraining.forEach((element, index) => {
                let persenJumlah = (parseFloat((parseFloat(element.jumlah) / totalTraining)) * 100).toFixed(2);
                rowsTraining += `<div class="progress-wrapper">
                                    <p class="mb-1">${element.penyakit} <span class="float-right">${persenJumlah}%</span>
                                    </p>
                                    <div class="progress radius-15" style="height:4px;">
                                        <div class="progress-bar ${bgTraining[index]}" role="progressbar" style="width: ${persenJumlah}%"></div>
                                    </div>
                                </div>
                                <hr>`;
            });
            $("#TopCategoriesDataTraining").html(rowsTraining);




            $("#TopCategoriesDatasets").html('');
            const bgDatasets = ['bg-sunset', 'bg-wall', 'bg-red-light', 'bg-voilet'];
            const totalDataset = data.dataset.reduce((n, {
                jumlah
            }) => n + parseInt(jumlah), 0);

            const sorterDataset = data.dataset.sort(function (a, b) {
                return parseFloat(b.jumlah) - parseFloat(a.jumlah);
            });

            let rowsDatasets = `<div class="d-lg-flex align-items-center">
                                    <div>
                                        <h5 class="mb-4">Top Categories Data Training</h5>
                                    </div>
                                </div>`;
            sorterDataset.forEach((element, index) => {
                let persenJumlah = (parseFloat((parseFloat(element.jumlah) / totalDataset)) * 100).toFixed(2);
                rowsDatasets += `<div class="progress-wrapper">
                                    <p class="mb-1">${element.hasil_penyakit} <span class="float-right">${persenJumlah}%</span>
                                    </p>
                                    <div class="progress radius-15" style="height:4px;">
                                        <div class="progress-bar ${bgDatasets[index]}" role="progressbar" style="width: ${persenJumlah}%"></div>
                                    </div>
                                </div>
                                <hr>`;
            });
            $("#TopCategoriesDatasets").html(rowsDatasets);
        }());
    });
}

async function resetApp(order) {
    try {
        let data = await fetching(_URLVALID, order);
        if (parseInt(data) === 0) {
            return await auth(data);
        }
        data = await getValueIndexArr(data.dataId, data.dataQuery, order);
        return await formResetAppAdmin(order, data);
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}


// const contSec1 = () => {
//     return new Promise((resolve) => {
//         let dataProvinces = province();
//         console.log(dataProvinces);
//         resolve(dataProvinces);
//     });
// }

// const gettingChart = async () => {
//     try {
//         let currentTime = currentYearMonth();
//         await 
//         return dataForecast;
//     } catch (rejectedReason) {
//         console.log(rejectedReason);
//         return toastr.error('Error NetWork');
//     }
// }