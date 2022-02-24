/**
 *
 * You can write your code anywhere but dont just claim this project
 * because it will make it harder for you. Dont Forget that. anruc
 * 
 */

"use strict";

$(document).ready(function (e) {

});


function selectMenu(idmenu) {
    // var bykbold = $('.bold').length;
    // for (let i = 0; i <= bykbold; i++) {
    //     $('.menu' + i).removeClass('active');
    // }

    // if (idmenu == 'meinKosu') {
    //     $('.menu0').addClass('active');
    // } else if (idmenu == 'meinKosu1') {
    //     $('.menu1').addClass('active');
    // } else if (idmenu == 'meinKosu2') {
    //     $('.menu2').addClass('active');
    // } else if (idmenu == 'meinKosu3') {
    //     $('.menu3').addClass('active');
    // } else if (idmenu == 'meinKosu4') {
    //     $('.menu4').addClass('active');
    // } else if (idmenu == 'meinKosu5') {
    //     $('.menu5').addClass('active');
    // } else if (idmenu == 'meinKosu6') {
    //     $('.menu6').addClass('active');
    // } else if (idmenu == 'meinKosu7') {
    //     $('.menu7').addClass('active');
    // } else if (idmenu == 'meinKosu8') {
    //     $('.menu8').addClass('active');
    // }

    if (idmenu == 'meinKosu') {
        // gettingMenuAsync(meinKosu, 'meinKosu');
    } else if (idmenu == 'meinKosu1') {
        gettingMenuAsync(meinKosu1, 'meinKosu1');
    } else if (idmenu == 'meinKosu2') {
        gettingMenuAsync(meinKosu2, 'meinKosu2');
    } else if (idmenu == 'meinKosu3') {
        // gettingMenuAsync(meinKosu3, 'meinKosu3');
    }
}

async function gettingMenuAsync(paramsMenu, order) {
    try {
        // let data = await fetching(_URLVALID, order);
        let data = '';
        if (parseInt(data) === 0) {
            return await auth(data);
        }
        return await paramsMenu(data, order);
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}

async function gettingShowSchedule(params, order) {
    try {
        let data = await suddenDispatch(_URLVALID, order, {
            'dataParam': params
        });

        if (parseInt(data) === 0) {
            return await auth(data);
        }

        if (order == 'byYear') {
            return meinKosu9(data);
        } else if (order == 'byMonth') {
            return meinKosu10(data, 'meinKosu10');
        } else if (order == 'byRoom') {
            var bykbold = $('.bold').length;
            for (let i = 0; i <= bykbold; i++) {
                $('.menu' + i).removeClass('active');
            }
            $('.menu8').addClass('active');
            return meinKosu11(data, 'meinKosu11');
        } else if (order == 'bySemester') {
            var bykbold = $('.bold').length;
            for (let i = 0; i <= bykbold; i++) {
                $('.menu' + i).removeClass('active');
            }
            $('.menu8').addClass('active');
            return meinKosu12(data, 'meinKosu12');
        }
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}

function gettingShowScheduleInfo(order) {
    let params = $("#chooseMonthMissed").val();
    if (params != 'Pilih Bulan') {
        return gettingShowSchedule(params, order);
    }
    // else {
    //     return meinKosu11([], 'meinKosu11');
    // }
}






async function gettingScheduleInfo(paramsMenu, order) {
    try {
        return gettingMenuAsync(paramsMenu, order);
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}

function showScheduleInfo(params, order) {
    let paramsMenu = (order == 'scheduleInfoMonth' ? scheduleMonth : (order == 'scheduleInfoMonth1' ? scheduleMonth1 : shownScheduling));
    return gettingDataBefore(paramsMenu, params, order);
}

async function gettingDataBefore(paramsMenu, params, order) {
    try {
        let assign = await reAssign(params, order);
        if (assign.isCheck) {
            let orderFor = (order == 'scheduleInfoMonth' ? 'schedulInfoByMonth' : (order == 'scheduleInfoMonth1' ? 'schedulInfoByMonth1' : 'shownSchedulingRoom'));
            let response = await dispatch(_URLVALID, orderFor, assign.data);
            if (parseInt(response) === 0) {
                return await auth(data);
            }
            console.log(response);
            return await paramsMenu(response, order);
        }
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



// $("#SettingApps").click(() => {
//     return resetApp("identity");
// });

// $(document).on('click', '#updateAppSetting', () => {
//     processingData('modifiedAppSettings', 'edit');
// });