$(document).ready(function (e) {
    ceklogin();
    $('.btnCome').click(function () {
        if ($('#emailLogin').val() == '') {
            return round_error_noti12("Data Required! Email Tidak Boleh Kosong");
        } else if ($('#passLogin').val() == '') {
            return round_error_noti12("Data Required! Password Tidak Boleh Kosong");
        } else {
            var user = $('#emailLogin').val(),
                pass = $('#passLogin').val();
            var formData = new FormData();
            formData.append('mail', user);
            formData.append('pass', pass);
            formData.append('uri', document.URL);
            $.ajax({
                type: 'POST',
                url: 'app/assets/plugins/scripts/engine/authr.php',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function () {
                    showLoad();
                },
                success: function (response) {
                    hideLoad();
                    if (parseInt(response) == 1) {
                        window.location.href = 'app/public';
                    } else {
                        return round_error_noti12(response);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {

                }
            });
        }
    });

    $(".kananvisible").click(function () {
        if ($(this).text() == 'visibility') {
            $(this).html('visibility_off');
            $('#password').attr('type', 'password');
        } else {
            $(this).html('visibility');
            $('#password').attr('type', 'text');
        }
    });
});

function ceklogin() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (parseInt(xmlhttp.responseText) == 1) {
                window.location.href = 'app/public';
            }
        }
    }
    xmlhttp.open('GET', 'app/assets/plugins/scripts/engine/overrideIchi.php?order=ceklogin');
    xmlhttp.send();
}


function showToast(e) {
    var toastHTML = e;
    M.toast({
        html: toastHTML,
        classes: 'rounded'
    });
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