$(document).ready(function (e) {
    ceklogin();
    $('.btnComeAdmin').click(function () {
        if ($('#emailLogin').val() == '') {
            return toastr.warning('Data Required! Email Tidak Boleh Kosong');
        } else if ($('#passLogin').val() == '') {
            return toastr.warning('Data Required! Password Tidak Boleh Kosong');
        } else {
            var user = $('#emailLogin').val(),
                pass = $('#passLogin').val();
            var formData = new FormData();
            formData.append('mail', user);
            formData.append('pass', pass);
            formData.append('uri', document.URL);
            $.ajax({
                type: 'POST',
                url: './app/assets/vendors/scripts/engine/auth.php',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function () {
                    showLoad();
                },
                success: function (response) {
                    hideLoad();
                    if (parseInt(response) == 1) {
                        window.location.href = 'app/';
                    } else {
                        return toastr.error('Rejected Login');
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {

                }
            });
        }
    });
});

function ceklogin() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (parseInt(xmlhttp.responseText) == 1) {
                window.location.href = 'app/';
            }
        }
    }
    xmlhttp.open('GET', './app/assets/vendors/scripts/engine/override.php?order=ceklogin');
    xmlhttp.send();
}


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
    }, 510);
}