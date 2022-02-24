var bodyTable = [],
    totalBaris = 0,
    totalPages = 0,
    tersorot = 0,
    display = 0;

function setupTablePagination(disp) {
    // disp = 2;
    display = parseInt(disp);
    // prepare to set tool pagination
    //$('.toolPagination').append('')
    var targ = $('#paginattable').children('tr');
    let rowsIn = ``;
    bodyTable = [];
    for (i = 0; i < targ.length; i++) {
        bodyTable.push(targ.eq(i).html());
    }
    $('#dataTables_infoEE').html('Showing ' + (bodyTable.length > 0 ? 1 : '0') + ' to ' + ((bodyTable.length < display) ? (bodyTable.length > 0 ? bodyTable.length : 0) : display) + ' of ' + bodyTable.length + " entries");
    var total = bodyTable.length,
        sisa = total % display,
        kelipatan = (total - sisa) / display,
        pages = (sisa == 0 ? kelipatan : (kelipatan + 1));

    totalPages = pages;
    totalBaris = bodyTable.length;
    console.log(pages);

    $('#paginatae_infoEE').html('');
    for (i = 0; i < pages; i++) {
        var curr = i == 0 ? 'current' : '';
        // $('.dataTables_paginate span').append('<a class="paginate_button ' + curr + ' btn' + (i + 1) + '" aria-controls="page-length-option" onclick="pages(\'' + (i + 1) + '\')">' + (i + 1) + '</a>');
        // rowsIn += `<a class="paginate_button ${curr} btn${i + 1}" onclick="pages(${i+1})">
        //                 ${i+1}
        //             </a>`;
        rowsIn += `<li class="paginate_button page-item active">
                        <a href="javascript:void(0)" aria-controls="myProjectTable" 
                        data-dt-idx="1" tabindex="0" class="page-link ${curr} btn${i + 1}" onclick="pages(${i+1})">
                        ${i+1}
                        </a>
                   </li>`;
    }
    $('#paginatae_infoEE').html(`<li class="paginate_button page-item previous disabled" id="previousPageItem">
                                    <a href="javascript:void(0)" aria-controls="myProjectTable"
                                    data-dt-idx="0" tabindex="0" class="page-link" onclick="prev()">
                                    Previous
                                    </a>
                                </li>

                                ${rowsIn}

                                <li class="paginate_button page-item next disabled">
                                    <a href="javascript:void(0)" aria-controls="myProjectTable"
                                       data-dt-idx="2" tabindex="0" class="page-link" onclick="next()">
                                        Next
                                    </a>
                                </li>`);


    $('#paginattable').html('');
    for (i = 0; i < display; i++) {
        $('#paginattable').append('<tr>' + bodyTable[i] + '</tr>');
    }
    tersorot = 1;
}

function pages(datake) {
    tersorot = datake;
    $('.dataTables_paginate .pagination li').removeClass('active');
    $('.dataTables_paginate .pagination .btn' + datake).addClass('active');

    var index = 1 + (display) * (datake - 1);
    $('#paginattable').html('');
    for (i = (index - 1); i < (index + (display - 1)); i++) {

        $('#paginattable').append('<tr>' + bodyTable[i] + '</tr>');
    }
    $('#dataTablesInfoPaginat').html('Showing ' + (index) + ' to ' + ((index + (display - 1)) > bodyTable.length ? bodyTable.length : (index + (display - 1))) + ' of ' + bodyTable.length + " entries");
}

function prev() {
    tersorot = (tersorot - 1);
    if (tersorot < 1) {
        tersorot = 1;
    }
    pages(tersorot);
}

function next() {
    tersorot++;
    if (tersorot > totalPages) {
        tersorot = totalPages;
    }
    pages(tersorot);
}


function searchDataTable(targ) {
    $('#paginattable').html('');
    let rows = '',
        rowType = '';
    if (dataTabel.order == 'meinKosu1') {
        dataTabel.dataTabel.forEach(function (item, idx) {
            rowType = (idx % 2 == 0 ? 'even' : 'odd');
            if (item.nama_room.toUpperCase().indexOf(targ.toUpperCase()) != -1) {
                $('#paginattable').append(`<tr role="row" class="${rowType}">
                                                <td tabindex="0">
                                                    ${idx+1}
                                                </td>
                                                <td class="dt-body-right">${item.nama_room}</td>
                                                <td class="dt-body-right">
                                                    <div class="btn-group" role="group">
                                                        <button type="button"
                                                                onclick="gettingDataAsync('.atributs${idx}', '${item.Id_room}', '${dataTabel.order}',  ${renderFormAsync})"
                                                                class="btn btn-lg btn-outline-primary atributs${idx}">
                                                                <i class="icofont-edit text-success"></i>
                                                        </button>

                                                        <button type="button"
                                                                onclick="gettingDeleteItem('.isItemDel${idx}', '${item.Id_room}', '${dataTabel.order}', ${renderDelFormAsync})"
                                                                class="btn btn-lg btn-outline-primary deleterow isItemDel${idx}">
                                                                <i class="icofont-ui-delete text-danger"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>`);
            }
        });
    } else if (dataTabel.order == 'meinKosu2') {
        dataTabel.dataTabel.forEach(function (item, idx) {
            rowType = (idx % 2 == 0 ? 'even' : 'odd');
            if (item.nama_department.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.department_head.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.nama_room.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.nama_doctor.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.jenis_kelamin.toUpperCase().indexOf(targ.toUpperCase()) != -1) {

                $('#paginattable').append(`<tr role="row" class="${rowType}">
                                                <td tabindex="0">
                                                    ${idx+1}
                                                </td>
                                                <td class="dt-body-right">${item.nama_doctor}</td>
                                                <td class="dt-body-right">${item.nama_department}</td>
                                                <td class="dt-body-right">${item.nama_room}</td>
                                                <td class="dt-body-right">
                                                    <div class="btn-group" role="group">
                                                        <button type="button"
                                                                onclick="gettingDataAsync('.atributs${idx}', '${item.Id_doctor}.${item.Id_room}', '${dataTabel.order}',  ${renderFormAsync})"
                                                                class="btn btn-lg btn-outline-primary atributs${idx}">
                                                                <i class="icofont-edit text-success"></i>
                                                        </button>

                                                        <button type="button"
                                                                onclick="gettingDeleteItem('.isItemDel${idx}', '${item.Id_doctor}.${item.Id_room}', '${dataTabel.order}', ${renderDelFormAsync})"
                                                                class="btn btn-lg btn-outline-primary deleterow isItemDel${idx}">
                                                                <i class="icofont-ui-delete text-danger"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>`);
            }

        });
    } else if (dataTabel.order == 'meinKosu3') {
        dataTabel.dataTabel.forEach(function (item, idx) {
            rowType = (idx % 2 == 0 ? 'even' : 'odd');
            if (item.department_head.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.nama_department.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.nama_doctor.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.jenis_kelamin.toUpperCase().indexOf(targ.toUpperCase()) != -1) {

                $('#paginattable').append(`<tr role="row" class="${rowType}">
                                                <td tabindex="0">
                                                    ${idx+1}
                                                </td>
                                                <td class="dt-body-right">${item.department_head}</td>
                                                <td class="dt-body-right">${item.nama_department}</td>
                                                <td class="dt-body-right">
                                                    <div class="btn-group" role="group">
                                                        <button type="button"
                                                                onclick="gettingDataAsync('.atributs${idx}', '${item.Id_department}', '${dataTabel.order}',  ${renderFormAsync})"
                                                                class="btn btn-lg btn-outline-primary atributs${idx}">
                                                                <i class="icofont-edit text-success"></i>
                                                        </button>

                                                        <button type="button"
                                                                onclick="gettingDeleteItem('.isItemDel${idx}', '${item.Id_department}', '${dataTabel.order}', ${renderDelFormAsync})"
                                                                class="btn btn-lg btn-outline-primary deleterow isItemDel${idx}">
                                                                <i class="icofont-ui-delete text-danger"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>`);
            }

        });
    } else if (dataTabel.order == 'meinKosu4') {
        dataTabel.dataTabel.forEach(function (item, idx) {
            rowType = (idx % 2 == 0 ? 'even' : 'odd');
            if (item.kode_shift.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.shift.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.jam_mulai.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.jam_selesai.toUpperCase().indexOf(targ.toUpperCase()) != -1) {

                $('#paginattable').append(`<tr role="row" class="${rowType}">
                                                <td tabindex="0">
                                                    ${idx+1}
                                                </td>
                                                <td class="dt-body-right">${item.kode_shift}</td>
                                                <td class="dt-body-right">${item.shift}</td>
                                                <td class="dt-body-right">${item.jam_mulai}</td>
                                                <td class="dt-body-right">${item.jam_selesai}</td>
                                                <td class="dt-body-right">
                                                    <div class="btn-group" role="group">
                                                        <button type="button"
                                                                onclick="gettingDataAsync('.atributs${idx}', '${item.Id_shift}', '${dataTabel.order}',  ${renderFormAsync})"
                                                                class="btn btn-lg btn-outline-primary atributs${idx}">
                                                                <i class="icofont-edit text-success"></i>
                                                        </button>

                                                        <button type="button"
                                                                onclick="gettingDeleteItem('.isItemDel${idx}', '${item.Id_shift}', '${dataTabel.order}', ${renderDelFormAsync})"
                                                                class="btn btn-lg btn-outline-primary deleterow isItemDel${idx}">
                                                                <i class="icofont-ui-delete text-danger"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>`);
            }

        });
    } else if (dataTabel.order == 'meinKosu5') {
        dataTabel.dataTabel.forEach(function (item, idx) {
            rowType = (idx % 2 == 0 ? 'even' : 'odd');
            if (item.nama_doctor.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.kode_shift.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.shift.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.jam_mulai.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.jam_selesai.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.tanggal.toUpperCase().indexOf(targ.toUpperCase()) != -1) {

                $('#paginattable').append(`<tr role="row" class="${rowType}">
                                                <td tabindex="0">
                                                    ${idx+1}
                                                </td>
                                                <td class="dt-body-right">${item.nama_doctor}</td>
                                                <td class="dt-body-right">${item.kode_shift}</td>
                                                <td class="dt-body-right">${item.shift}</td>
                                                <td class="dt-body-right">${item.jam_mulai}</td>
                                                <td class="dt-body-right">${item.jam_selesai}</td>
                                                <td class="dt-body-right">${item.tanggal}</td>
                                                <td class="dt-body-right">
                                                    <div class="btn-group" role="group">
                                                        <button type="button"
                                                                onclick="gettingDataAsync('.atributs${idx}', '${item.Id_shift_request}', '${dataTabel.order}',  ${renderFormAsync})"
                                                                class="btn btn-lg btn-outline-primary atributs${idx}">
                                                                <i class="icofont-edit text-success"></i>
                                                        </button>

                                                        <button type="button"
                                                                onclick="gettingDeleteItem('.isItemDel${idx}', '${item.Id_shift_request}', '${dataTabel.order}', ${renderDelFormAsync})"
                                                                class="btn btn-lg btn-outline-primary deleterow isItemDel${idx}">
                                                                <i class="icofont-ui-delete text-danger"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>`);
            }

        });
    } else if (dataTabel.order == 'meinKosu6') {
        dataTabel.dataTabel.forEach(function (item, idx) {
            rowType = (idx % 2 == 0 ? 'even' : 'odd');
            if (item.nama_doctor.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.nama_doctor.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.start_date.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.end_date.toUpperCase().indexOf(targ.toUpperCase()) != -1) {

                $('#paginattable').append(`<tr role="row" class="${rowType}">
                                                <td tabindex="0">
                                                    ${idx+1}
                                                </td>
                                                <td class="dt-body-right">${item.nama_doctor}</td>
                                                <td class="dt-body-right">${item.jenis_kelamin}</td>
                                                <td class="dt-body-right">${item.start_date}</td>
                                                <td class="dt-body-right">${item.end_date}</td>
                                                <td class="dt-body-right">
                                                    <div class="btn-group" role="group">
                                                        <button type="button"
                                                                onclick="gettingDataAsync('.atributs${idx}', '${item.Id_day_off}', '${dataTabel.order}',  ${renderFormAsync})"
                                                                class="btn btn-lg btn-outline-primary atributs${idx}">
                                                                <i class="icofont-edit text-success"></i>
                                                        </button>

                                                        <button type="button"
                                                                onclick="gettingDeleteItem('.isItemDel${idx}', '${item.Id_day_off}', '${dataTabel.order}', ${renderDelFormAsync})"
                                                                class="btn btn-lg btn-outline-primary deleterow isItemDel${idx}">
                                                                <i class="icofont-ui-delete text-danger"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>`);
            }

        });
    } else if (dataTabel.order == 'scheduleInfoRoom') {
        dataTabel.dataTabel.forEach(function (item, idx) {
            rowType = (idx % 2 == 0 ? 'even' : 'odd');

            if (item.tanggal.toUpperCase().indexOf(targ.toUpperCase()) != -1 ||
                item.tanggal_i.toUpperCase().indexOf(targ.toUpperCase()) != -1
            ) {

                let rowsInrows = '';
                if (item.isTime.length > 2) {
                    item.isTime.forEach((element1, idx1) => {
                        rowsInrows += `<td class="dt-body-right">${element1.nama_doctor}</td>`;
                    });
                } else {
                    item.isTime.forEach((element1, idx1) => {
                        rowsInrows += `<td class="dt-body-right">${element1.nama_doctor}</td>`;
                    });
                    rowsInrows += `<td class="dt-body-right"> - </td>`;
                }

                $('#paginattable').append(`<tr role="row" class="${rowType}">
                                                <td tabindex="0">
                                                    ${idx+1}
                                                </td>
                                                <td class="dt-body-right">${item.tanggal_i}</td>
                                                
                                                ${rowsInrows}
                                            </tr>`);
            }

        });
    }

    setTimeout(() => {
        setupTablePagination(10);
    }, 200);
}