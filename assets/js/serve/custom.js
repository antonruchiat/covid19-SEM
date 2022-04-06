/**
 *
 * You can write your code anywhere but dont just claim this project
 * because it will make it harder for you. Dont Forget that. anruc
 * https://documenter.getpostman.com/view/16605343/Tzm6nwoS
 */

"use strict";

$(document).ready(function (e) {
    meinKosu();
    // $(".map-status").html(indoMaps);
    // gettingMenuAsync(meinKosu, 'meinKosu');
});

// $(document).on('input', '#searchText', ':text', () => {
//     let checkType = $("#searchText").val();
//     searchDataTable(checkType);
// });

// `<li id="meinKosu3">
// <a href="javascript:void(0)">Coba FeTCH</a>
// </li>`




// document.body.addEventListener('click', selectMenu('hyojiChuShosai'), true);
$("#meinKosu").click(() => {
    selectMenu('meinKosu');
});

$("#meinKosu1").click(() => {
    selectMenu('meinKosu1');
});

$("#meinKosu2").click(() => {
    selectMenu('meinKosu2');
});

$("#meinKosu3").click(() => {
    selectMenu('meinKosu3');
});




function showLoad() {
    $('.MYmainLoad').show();
    setTimeout(function () {
        $('.MYmainLoad img').css({
            'transform': 'scale(1.0)'
        });
    }, 100);
}

function hideLoad() {
    $('.MYmainLoad img').css({
        'transform': 'scale(0.0)'
    });
    setTimeout(function () {
        $('.MYmainLoad').hide();
    }, 810);
}