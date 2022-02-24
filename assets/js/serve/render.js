var main = 'mainPages',
    globalDomOverlay = '',
    dataTabel = [];

const meinKosu = (data, order) => {
    return new Promise((resolve) => {
        console.log(data);
        $(`#${main}`).html('');
        const bgCards = ['text-secondary', 'color-lavender-purple', 'color-light-orange', 'color-careys-pink',
            'color-lavender-purple', 'color-light-success'
        ];
        const iconCards = ['icofont-patient-file', 'icofont-doctor-alt', 'icofont-icu', 'icofont-hospital',
            'icofont-brand-designbump', 'icofont-ui-clock'
        ];
        const arrLabels = ['Total Schedule Month', 'Total Doctors', 'Total Rooms', 'Total Department', 'Total Shift', 'Total Day Off'];

        resolve(function () {
            $(`#${main}`).html(`<div class="page-heading">
                                    <h3>Dashboard</h3>
                                </div>
                                
                                <div class="page-content">
                                    <section class="row">
                                        <div class="col-12 col-lg-12">
                                            <div class="row" id="TopTabulatedData">
                                                <div class="col-6 col-lg-3 col-md-6">
                                                    <div class="card">
                                                        <div class="card-body px-3 py-4-5">
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <div class="stats-icon purple">
                                                                        <i class="icon dripicons-archive"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-8">
                                                                    <h6 class="text-muted font-semibold">Schedule</h6>
                                                                    <h6 class="font-extrabold mb-0">112.000</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-6 col-lg-3 col-md-6">
                                                    <div class="card">
                                                        <div class="card-body px-3 py-4-5">
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <div class="stats-icon blue">
                                                                        <i class="iconly-boldProfile"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-8">
                                                                    <h6 class="text-muted font-semibold">Dosen</h6>
                                                                    <h6 class="font-extrabold mb-0">183.000</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-6 col-lg-3 col-md-6">
                                                    <div class="card">
                                                        <div class="card-body px-3 py-4-5">
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <div class="stats-icon green">
                                                                        <i class="icon dripicons-store"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-8">
                                                                    <h6 class="text-muted font-semibold">Ruangan</h6>
                                                                    <h6 class="font-extrabold mb-0">80.000</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-6 col-lg-3 col-md-6">
                                                    <div class="card">
                                                        <div class="card-body px-3 py-4-5">
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <div class="stats-icon red">
                                                                        <i class="iconly-boldBookmark"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-8">
                                                                    <h6 class="text-muted font-semibold">Semester</h6>
                                                                    <h6 class="font-extrabold mb-0">112</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                    <section class="row">
                                        <div class="col-md-12 col-lg-12 col-xl-12">
                                            ${myBGSVG_}
                                        </div>
                                    </section>
                                </div>`);
            implementChartJS(data);
        }());
    });
}

const meinKosu1 = (data, order) => {
    return new Promise((resolve) => {
        var rows = '',
            rowType = '';
        data.forEach((element, idx) => {
            rowType = (idx % 2 == 0 ? 'even' : 'odd');
            rows += `<tr role="row" class="${rowType}">
                        <td tabindex="0">
                            ${idx+1}
                        </td>
                        <td class="dt-body-right">${element.nama_room}</td>
                        <td class="dt-body-right">
                            <div class="btn-group" role="group">
                                <button type="button"
                                        onclick="gettingDataAsync('.atributs${idx}', '${element.Id_room}', '${order}',  ${renderFormAsync})"
                                        class="btn btn-lg btn-outline-primary atributs${idx}">
                                        <i class="fas fa-fw fa-pencil-alt"></i>
                                </button>

                                <button type="button"
                                        onclick="gettingDeleteItem('.isItemDel${idx}', '${element.Id_room}', '${order}', ${renderDelFormAsync})"
                                        class="btn btn-lg btn-outline-danger deleterow isItemDel${idx}">
                                        <i class="fas fa-fw fa-text-danger"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;
        });

        resolve(function () {
            globalBigData = data;
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="page-content">
                                    <div class="row align-items-center">
                                        <div class="border-0 mb-4">
                                            <div class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                                <h3 class="fw-bold mb-0">Daftar Ruangan</h3>

                                                <div class="col-auto d-flex w-sm-100">
                                                    <button type="button" class="btn btn-primary btn-set-task w-sm-100 domCircle" 
                                                            data-bs-toggle="modal" data-bs-target="#expadd"
                                                            onclick="addData('.domCircle', '${order}')">
                                                            <i class="icofont-plus-circle me-2 fs-6"></i>
                                                            Add Data
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row clearfix g-3">
                                        <div class="col-sm-12">
                                            <div class="card mb-3">
                                                <div class="card-body">
                                                    <div id="myProjectTable_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                            
                                                        <div class="row">
                                                            <div class="col-sm-12">
                                                                <table id="myProjectTable"
                                                                    class="table table-hover align-middle mb-0 nowrap dataTable no-footer dtr-inline"
                                                                    style="width: 100%;" role="grid" aria-describedby="myProjectTable_info">
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th style="width: 123.2px;">
                                                                                Nomor
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Nama Ruangan
                                                                            </th>
                                                                            <th style="width: 140.2px;">
                                                                                Actions
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="paginattable">
                            
                                                                        ${rows}
                            
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        <!-- Pagination -->
                                                        ${rowsPagination()}
                            
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);

            dataTabel = {
                dataTabel: data,
                order: order,
            };

            setupTablePagination(10);
        }())
    });
}

const meinKosu2 = (data, order) => {
    return new Promise((resolve) => {
        var rows = '',
            rowType = '';
        data.forEach((element, idx) => {
            rowType = (idx % 2 == 0 ? 'even' : 'odd');
            rows += `<tr role="row" class="${rowType}">
                        <td tabindex="0">
                            ${idx+1}
                        </td>
                        <td class="dt-body-right">${element.nidn}</td>
                        <td class="dt-body-right">${element.nama_dosen}</td>
                        <td class="dt-body-right">${element.jenis_kelamin}</td>
                        <td class="dt-body-right">
                            <div class="btn-group" role="group">
                                <button type="button"
                                        onclick="gettingDataAsync('.atributs${idx}', '${element.Id_dosen}', '${order}',  ${renderFormAsync})"
                                        class="btn btn-lg btn-outline-primary atributs${idx}">
                                        <i class="fas fa-fw fa-pencil-alt"></i>
                                </button>

                                <button type="button"
                                        onclick="gettingDeleteItem('.isItemDel${idx}', '${element.Id_dosen}', '${order}', ${renderDelFormAsync})"
                                        class="btn btn-lg btn-outline-danger deleterow isItemDel${idx}">
                                        <i class="fas fa-fw fa-text-danger"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;
        });

        resolve(function () {
            globalBigData = data;
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="page-content">
                                    <div class="row align-items-center">
                                        <div class="border-0 mb-4">
                                            <div class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                                <h3 class="fw-bold mb-0">Daftar Dosen</h3>

                                                <div class="col-auto d-flex w-sm-100">
                                                    <button type="button" class="btn btn-primary btn-set-task w-sm-100 domCircle" 
                                                            data-bs-toggle="modal" data-bs-target="#expadd"
                                                            onclick="addData('.domCircle', '${order}')">
                                                            <i class="icofont-plus-circle me-2 fs-6"></i>
                                                            Add Data
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row clearfix g-3">
                                        <div class="col-sm-12">
                                            <div class="card mb-3">
                                                <div class="card-body">
                                                    <div id="myProjectTable_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                            
                                                        <div class="row">
                                                            <div class="col-sm-12">
                                                                <table id="myProjectTable"
                                                                    class="table table-hover align-middle mb-0 nowrap dataTable no-footer dtr-inline"
                                                                    style="width: 100%;" role="grid" aria-describedby="myProjectTable_info">
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th style="width: 123.2px;">
                                                                                Nomor
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                NIDN
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Nama Dosen
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Jenis Kelamin
                                                                            </th>
                                                                            <th style="width: 140.2px;">
                                                                                Actions
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="paginattable">
                            
                                                                        ${rows}
                            
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        <!-- Pagination -->
                                                        ${rowsPagination()}
                            
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);

            dataTabel = {
                dataTabel: data,
                order: order,
            };

            setupTablePagination(10);
        }());
    });
}

const meinKosu3 = (data, order) => {
    return new Promise((resolve) => {
        var rows = '';
        data.forEach((element, idx) => {
            $rowType = (idx % 2 == 0 ? 'even' : 'odd');
            rows += `<tr role="row" class="${$rowType}">
                        <td tabindex="0">
                            ${idx+1}
                        </td>
                        <td class="dt-body-right">${element.kode_praktikum}</td>
                        <td class="dt-body-right">${element.nama_praktikum}</td>
                        <td class="dt-body-right">${element.nidn} / ${element.nama_dosen}</td>
                        <td class="dt-body-right">${element.jumlah_sks} SKS</td>
                        <td class="dt-body-right">Semester ${element.semester}</td>
                        <td class="dt-body-right">Ruangan ${element.nama_room}</td>
                        <td class="dt-body-right">
                            <div class="btn-group" role="group">
                                <button type="button"
                                        onclick="gettingDataAsync('.atributs${idx}', '${element.Id_praktikum}', '${order}',  ${renderFormAsync})"
                                        class="btn btn-lg btn-outline-primary atributs${idx}">
                                        <i class="fas fa-fw fa-pencil-alt"></i>
                                </button>

                                <button type="button"
                                        onclick="gettingDeleteItem('.isItemDel${idx}', '${element.Id_praktikum}', '${order}', ${renderDelFormAsync})"
                                        class="btn btn-lg btn-outline-danger deleterow isItemDel${idx}">
                                        <i class="fas fa-fw fa-text-danger"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;
        });

        resolve(function () {
            globalBigData = data;
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="page-content">
                                    <div class="row align-items-center">
                                        <div class="border-0 mb-4">
                                            <div class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                                <h3 class="fw-bold mb-0">Daftar Praktikum</h3>

                                                <div class="col-auto d-flex w-sm-100">
                                                    <button type="button" class="btn btn-primary btn-set-task w-sm-100 domCircle" 
                                                            data-bs-toggle="modal" data-bs-target="#expadd"
                                                            onclick="addData('.domCircle', '${order}')">
                                                            <i class="icofont-plus-circle me-2 fs-6"></i>
                                                            Add Data
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row clearfix g-3">
                                        <div class="col-sm-12">
                                            <div class="card mb-3">
                                                <div class="card-body">
                                                    <div id="myProjectTable_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                            
                                                        <div class="row">
                                                            <div class="col-sm-12">
                                                                <table id="myProjectTable"
                                                                    class="table table-hover align-middle mb-0 nowrap dataTable no-footer dtr-inline"
                                                                    style="width: 100%;" role="grid" aria-describedby="myProjectTable_info">
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th style="width: 63.2px;">
                                                                                Nomor
                                                                            </th>
                                                                            <th style="width: 208.2px;">
                                                                                Kode Praktikum
                                                                            </th>
                                                                            <th style="width: 238.2px;">
                                                                                Nama Praktikum
                                                                            </th>
                                                                            <th style="width: 298.2px;">
                                                                                Nama Dosen
                                                                            </th>
                                                                            <th style="width: 128.2px;">
                                                                                Jumlah SKS
                                                                            </th>
                                                                            <th style="width: 138.2px;">
                                                                                Semester
                                                                            </th>
                                                                            <th style="width: 168.2px;">
                                                                                Ruangan Praktikum
                                                                            </th>
                                                                            <th style="width: 140.2px;">
                                                                                Actions
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="paginattable">
                            
                                                                        ${rows}
                            
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        <!-- Pagination -->
                                                        ${rowsPagination()}
                            
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);

            dataTabel = {
                dataTabel: data,
                order: order,
            };

            setupTablePagination(10);
        }());
    });
}

const meinKosu4 = (data, order) => {
    return new Promise((resolve) => {

        var rows = '',
            rowType = '';
        data.forEach((element, idx) => {
            rowType = (idx % 2 == 0 ? 'even' : 'odd');
            rows += `<tr role="row" class="${rowType}">
                        <td tabindex="0">
                            ${idx+1}
                        </td>
                        <td class="dt-body-right">${element.kode_shift}</td>
                        <td class="dt-body-right">${element.shift}</td>
                        <td class="dt-body-right">${element.jam_mulai}</td>
                        <td class="dt-body-right">${element.jam_selesai}</td>
                        <td class="dt-body-right">
                            <div class="btn-group" role="group">
                                <button type="button"
                                        onclick="gettingDataAsync('.atributs${idx}', '${element.Id_shift}', '${order}',  ${renderFormAsync})"
                                        class="btn btn-lg btn-outline-primary atributs${idx}">
                                        <i class="fas fa-fw fa-pencil-alt"></i>
                                </button>

                                <button type="button"
                                        onclick="gettingDeleteItem('.isItemDel${idx}', '${element.Id_shift}', '${order}', ${renderDelFormAsync})"
                                        class="btn btn-lg btn-outline-danger deleterow isItemDel${idx}">
                                        <i class="fas fa-fw fa-text-danger"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;
        });

        resolve(function () {
            globalBigData = data;
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="page-content">
                                    <div class="row align-items-center">
                                        <div class="border-0 mb-4">
                                            <div class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                                <h3 class="fw-bold mb-0">Daftar Jadwal Sesi</h3>

                                                <div class="col-auto d-flex w-sm-100">
                                                    <button type="button" class="btn btn-primary btn-set-task w-sm-100 domCircle" 
                                                            data-bs-toggle="modal" data-bs-target="#expadd"
                                                            onclick="addData('.domCircle', '${order}')">
                                                            <i class="icofont-plus-circle me-2 fs-6"></i>
                                                            Add Data
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row clearfix g-3">
                                        <div class="col-sm-12">
                                            <div class="card mb-3">
                                                <div class="card-body">
                                                    <div id="myProjectTable_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                            
                                                        <div class="row">
                                                            <div class="col-sm-12">
                                                                <table id="myProjectTable"
                                                                    class="table table-hover align-middle mb-0 nowrap dataTable no-footer dtr-inline"
                                                                    style="width: 100%;" role="grid" aria-describedby="myProjectTable_info">
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th style="width: 123.2px;">
                                                                                Nomor
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Kode Sesi
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Sesi
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Jam Mulai
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Jam Akhir
                                                                            </th>
                                                                            <th style="width: 140.2px;">
                                                                                Actions
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="paginattable">
                            
                                                                        ${rows}
                            
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        <!-- Pagination -->
                                                        ${rowsPagination()}
                            
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);

            dataTabel = {
                dataTabel: data,
                order: order,
            };

            setupTablePagination(10);
        }());
    });
}

const meinKosu5 = (data, order) => {
    return new Promise((resolve) => {
        var rows = '',
            rowType = '';
        data.forEach((element, idx) => {
            rowType = (idx % 2 == 0 ? 'even' : 'odd');
            rows += `<tr role="row" class="${rowType}">
                        <td tabindex="0">
                            ${idx+1}
                        </td>
                        <td class="dt-body-right">${element.nidn}</td>
                        <td class="dt-body-right">${element.nama_dosen}</td>
                        <td class="dt-body-right">${element.kode_shift}</td>
                        <td class="dt-body-right">${element.shift}</td>
                        <td class="dt-body-right">${element.jam_mulai}</td>
                        <td class="dt-body-right">${element.jam_selesai}</td>
                        <td class="dt-body-right">${element.tanggal}</td>
                        <td class="dt-body-right">
                            <div class="btn-group" role="group">
                                <button type="button"
                                        onclick="gettingDataAsync('.atributs${idx}', '${element.Id_shift_request}', '${order}',  ${renderFormAsync})"
                                        class="btn btn-lg btn-outline-primary atributs${idx}">
                                        <i class="fas fa-fw fa-pencil-alt"></i>
                                </button>

                                <button type="button"
                                        onclick="gettingDeleteItem('.isItemDel${idx}', '${element.Id_shift_request}', '${order}', ${renderDelFormAsync})"
                                        class="btn btn-lg btn-outline-danger deleterow isItemDel${idx}">
                                        <i class="fas fa-fw fa-text-danger"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;
        });

        resolve(function () {
            globalBigData = data;
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="page-content">
                                    <div class="row align-items-center">
                                        <div class="border-0 mb-4">
                                            <div class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                                <h3 class="fw-bold mb-0">Daftar Request Sesi</h3>

                                                <div class="col-auto d-flex w-sm-100">
                                                    <button type="button" class="btn btn-primary btn-set-task w-sm-100 domCircle" 
                                                            data-bs-toggle="modal" data-bs-target="#expadd"
                                                            onclick="addData('.domCircle', '${order}')">
                                                            <i class="icofont-plus-circle me-2 fs-6"></i>
                                                            Add Data
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row clearfix g-3">
                                        <div class="col-sm-12">
                                            <div class="card mb-3">
                                                <div class="card-body">
                                                    <div id="myProjectTable_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                            
                                                        <div class="row">
                                                            <div class="col-sm-12">
                                                                <table id="myProjectTable"
                                                                    class="table table-hover align-middle mb-0 nowrap dataTable no-footer dtr-inline"
                                                                    style="width: 100%;" role="grid" aria-describedby="myProjectTable_info">
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th style="width: 123.2px;">
                                                                                Nomor
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                NIDN
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Nama Dosen
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Kode Sesi
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Jadwal Sesi
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Jam Mulai
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Jam Akhir
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Tanggal
                                                                            </th>
                                                                            <th style="width: 140.2px;">
                                                                                Actions
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="paginattable">
                            
                                                                        ${rows}
                            
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        <!-- Pagination -->
                                                        ${rowsPagination()}
                            
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);

            dataTabel = {
                dataTabel: data,
                order: order,
            };

            setupTablePagination(10);
        }());
    });
}

const meinKosu6 = (data, order) => {
    return new Promise((resolve) => {
        var rows = '',
            rowType = '';
        data.forEach((element, idx) => {
            rowType = (idx % 2 == 0 ? 'even' : 'odd');
            rows += `<tr role="row" class="${rowType}">
                        <td tabindex="0">
                            ${idx+1}
                        </td>
                        <td class="dt-body-right">${element.nidn}</td>
                        <td class="dt-body-right">${element.nama_dosen}</td>
                        <td class="dt-body-right">${element.start_date}</td>
                        <td class="dt-body-right">${element.end_date}</td>
                        <td class="dt-body-right">
                            <div class="btn-group" role="group">
                                <button type="button"
                                        onclick="gettingDataAsync('.atributs${idx}', '${element.Id_day_off}', '${order}',  ${renderFormAsync})"
                                        class="btn btn-lg btn-outline-primary atributs${idx}">
                                        <i class="fas fa-fw fa-pencil-alt"></i>
                                </button>

                                <button type="button"
                                        onclick="gettingDeleteItem('.isItemDel${idx}', '${element.Id_day_off}', '${order}', ${renderDelFormAsync})"
                                        class="btn btn-lg btn-outline-danger deleterow isItemDel${idx}">
                                        <i class="fas fa-fw fa-text-danger"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;
        });

        resolve(function () {
            globalBigData = data;
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="page-content">
                                    <div class="row align-items-center">
                                        <div class="border-0 mb-4">
                                            <div class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                                <h3 class="fw-bold mb-0">Daftar Day Off Dosen</h3>

                                                <div class="col-auto d-flex w-sm-100">
                                                    <button type="button" class="btn btn-primary btn-set-task w-sm-100 domCircle" 
                                                            data-bs-toggle="modal" data-bs-target="#expadd"
                                                            onclick="addData('.domCircle', '${order}')">
                                                            <i class="icofont-plus-circle me-2 fs-6"></i>
                                                            Add Data
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row clearfix g-3">
                                        <div class="col-sm-12">
                                            <div class="card mb-3">
                                                <div class="card-body">
                                                    <div id="myProjectTable_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                            
                                                        <div class="row">
                                                            <div class="col-sm-12">
                                                                <table id="myProjectTable"
                                                                    class="table table-hover align-middle mb-0 nowrap dataTable no-footer dtr-inline"
                                                                    style="width: 100%;" role="grid" aria-describedby="myProjectTable_info">
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th style="width: 123.2px;">
                                                                                Nomor
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                NIDN
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Nama Dosen
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Tanggal Mulai
                                                                            </th>
                                                                            <th style="width: 268.2px;">
                                                                                Tangal Akhir
                                                                            </th>
                                                                            <th style="width: 140.2px;">
                                                                                Actions
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="paginattable">
                            
                                                                        ${rows}
                            
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        <!-- Pagination -->
                                                        ${rowsPagination()}
                            
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);

            dataTabel = {
                dataTabel: data,
                order: order,
            };

            setupTablePagination(10);
        }());
    });
}

const meinKosu7 = (data, order) => {
    return new Promise((resolve) => {
        resolve(function () {
            globalBigData = data;
            let status = data.tb_schedul == null ||
                data.tb_schedul == '' ||
                data.tb_schedul == undefined ?
                `<button type="button" 
                    class="btn btn-lg btn-primary border lift mt-1 newSchedule">
                    Add New Schedule
                 </button>` :
                `<button type="button" 
                        class="btn btn-lg btn-primary border lift mt-1 scheduleInfo">
                    See All Schedule
                 </button>`;
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="page-content">
                                    <div class="row align-items-center">
                                        <div class="border-0 mb-4">
                                            <div class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                                <h3 class="fw-bold mb-0">Inisialisasi Jadwal</h3>

                                                <div class="col-auto d-flex w-sm-100">
                                                    <button type="button" class="btn btn-primary btn-set-task w-sm-100 domCircle" 
                                                            data-bs-toggle="modal" data-bs-target="#expadd"
                                                            onclick="addData('.domCircle', '${order}')">
                                                            <i class="icofont-plus-circle me-2 fs-6"></i>
                                                            Add Data
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class="card mb-3">
                                            <div class="card-body text-center p-5">
                                                ${mySVG_}
                                                <div class="mt-4 mb-2">
                                                    <span class="text-muted">Wellcome To Scheduling Page</span>
                                                </div>
                                                
                                                ${status}
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
        }());

    });
}

const meinKosu8 = (data, order) => {
    return new Promise((resolve) => {
        globalBigData = data;
        let rows = '';

        if (data.length > 0) {
            data.forEach((element, idx) => {
                rows += `<div class="col-6 col-lg-2 col-md-6">
                            <div class="card myCardCustumize">
                                <div class="card-body px-3 py-4-5"
                                     onclick="gettingShowSchedule('${element.Year}', 'byYear')">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="stats-icon" style="background:#CDDEFF">
                                                    <i class="fas fa-fw fa-poll-h"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <h6 class="font-extrabold">Jadwal Tahun</h6>
                                                <h6 class="font-extrabold mb-0">${element.Year}</h6>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>`;
            });
        } else {
            rows += `<div class="card-body text-center p-5">
                        ${mySVG_404}
                        <div class="mt-4 mb-2">
                            <button type="button" 
                                    class="btn btn-lg btn-primary border lift mt-1">
                                    Schedule not yet available
                            </button>
                        </div>
                    </div>`;

            $("#forNothingData").html(rows);
        }

        resolve(function () {
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="page-content">
                                    <div class="row g-3 mb-3 row-deck">
                                        <div class="col-lg-12 col-xl-12">
                                            <div class="card">
                                                <div class="card-header py-3 d-flex no-bg align-items-center justify-content-between flex-wrap bg-transparent border-bottom">
                                                    <nav aria-label="breadcrumb">
                                                        <ol class="breadcrumb">
                                                            <li class="breadcrumb-item">
                                                                <a href="javascript:void(0)">
                                                                    Scheduling Page List By Year
                                                                </a>
                                                            </li>
                                                        </ol>
                                                    </nav>
                                                </div>

                                                <div class="row clearfix g-3" id="forNothingData">
                                                    <div class="card-body">
                                                        <div class="room_book">
                                                            <div class="row row-cols-2 row-cols-sm-4 row-cols-md-6 row-cols-lg-6 g-3">
                                                                
                                                                ${rows}
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
        }());

    });
}

const meinKosu9 = data => {
    return new Promise((resolve) => {
        globalBigData = data;
        let chooseMonth = renderMonthMissed();

        resolve(function () {
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="page-content">
                                    <div class="row g-3 mb-3 row-deck">
                                        <div class="col-lg-12 col-xl-12">
                                            <div class="card">
                                                <div class="card-header py-3 d-flex no-bg align-items-center justify-content-between flex-wrap bg-transparent border-bottom">
                                                 
                                                    <nav aria-label="breadcrumb">
                                                        <ol class="breadcrumb">
                                                            <li class="breadcrumb-item">
                                                                <a href="javascript:void(0)"
                                                                   onclick="selectMenu('meinKosu8')">
                                                                    Scheduling Page List By Year
                                                                </a>
                                                            </li>
                                                            <li class="breadcrumb-item">
                                                                <a href="javascript:void(0)"
                                                                   onclick="gettingShowScheduleInfo('byMonth')">
                                                                    Scheduling Page List By Month
                                                                </a>
                                                            </li>
                                                        </ol>
                                                    </nav>
                                                
                                                    <div class="col-auto d-flex">
                                                        
                                                        <div class="form-group">
                                                            <div class="input-group transparent-append">
                                                                <span class="input-group-text">
                                                                    <i class="fa fa-calendar-alt"></i>
                                                                </span>
                                                    
                                                                <select class="form-control" 
                                                                        id="chooseMonthMissed" 
                                                                        onclick="gettingShowScheduleInfo('byMonth')">
                                                                    <option value="">Pilih Bulan</option>
                                                                    ${chooseMonth}
                                                                </select>
                                                    
                                                            </div>
                                                        </div>

                                                    </div>
                                                
                                                
                                                </div>

                                                <div class="row clearfix g-3 mb-3">
                                                    <div class="card-body text-center p-5">
                                                        ${mySVG_}
                                                        <div class="mt-4 mb-2">
                                                            <button type="button" 
                                                                    class="btn btn-lg btn-primary border lift mt-1">
                                                                    Choose Scheduling BY Month
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
        }());

    });
}

const meinKosu10 = (data, order) => {
    return new Promise((resolve) => {
        globalBigData = data;
        let chooseMonth = renderMonthMissed();
        let rows = '';
        // var areMonth = '';
        // var areRoom = '';

        if (data.length !== 0) {
            data.forEach((element, idx) => {
                rows += `<div class="col-6 col-lg-2 col-md-6">
                            <div class="card myCardCustumize">
                                <div class="card-body"
                                     onclick="gettingShowSchedule('${element.Year}.${element.Month}.${element.Id_room}', 'byRoom')">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="stats-icon" style="background:#CDDEFF">
                                                <i class="fas fa-fw fa-door-open"></i> 
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <h6 class="font-extrabold">Ruangan</h6>
                                            <h6 class="font-extrabold">${element.nama_room}</h6>
                                        </div>
    
                                    </div>
                                </div>
                            </div>
                        </div>`;
            });
        } else {
            rows += `<div class="card-body text-center p-5">
                        ${mySVG_404_1}
                        <div class="mt-4 mb-2">
                            <button type="button" 
                                    class="btn btn-lg btn-primary border lift mt-1">
                                    Schedule not yet available<br>
                                    choose another month's schedule
                            </button>
                        </div>
                    </div>`;

            $("#forNothingData").html(rows);
        }


        resolve(function () {
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="page-content">
                                    <div class="row g-3 mb-3 row-deck">
                                        <div class="col-lg-12 col-xl-12">
                                            <div class="card">
                                                <div class="card-header py-3 d-flex no-bg align-items-center justify-content-between flex-wrap bg-transparent border-bottom">
                                                 
                                                    <nav aria-label="breadcrumb">
                                                        <ol class="breadcrumb">
                                                            <li class="breadcrumb-item">
                                                                <a href="javascript:void(0)"
                                                                   onclick="selectMenu('meinKosu8')">
                                                                    Scheduling Page List By Year
                                                                </a>
                                                            </li>
                                                            <li class="breadcrumb-item">
                                                                <a href="javascript:void(0)"
                                                                   onclick="gettingShowScheduleInfo('byMonth')">
                                                                    Scheduling Page List By Month
                                                                </a>
                                                            </li>
                                                        </ol>
                                                    </nav>
                                                
                                                    <div class="col-auto d-flex">
                                                        <div class="form-group">
                                                            <div class="input-group transparent-append">
                                                                <span class="input-group-text">
                                                                    <i class="fa fa-calendar-alt"></i>
                                                                </span>
                                                    
                                                                <select class="form-control" 
                                                                        id="chooseMonthMissed" 
                                                                        onchange="gettingShowScheduleInfo('byMonth')">
                                                                    <option value="">Pilih Bulan</option>
                                                                    ${chooseMonth}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="row clearfix g-3" id="forNothingData">
                                                    <div class="card-body">
                                                        <div class="room_book">
                                                            <div class="row row-cols-2 row-cols-sm-4 row-cols-md-6 row-cols-lg-6 g-3">
                                                                
                                                                ${rows}
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
        }());
    });
}

const meinKosu11 = (data, order) => {
    return new Promise((resolve) => {
        globalBigData = data;
        let chooseMonth = renderMonthMissed();
        let rows = '';
        let areYear = '';
        let areMonth = '';
        let areRoom = '';

        if (data.length !== 0) {
            data.forEach((element, idx) => {
                if (idx === 0) {
                    areYear = element.Year;
                    areMonth = element.Month;
                    areRoom = element.Id_room;
                }
                rows += `<div class="col-6 col-lg-2 col-md-6">
                            <div class="card myCardCustumize">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="stats-icon" style="background:#CDDEFF">
                                                <i class="fas fa-fw fa-door-open"></i> 
                                            </div>
                                        </div>
                                        <div class="col-md-8"
                                             onclick="gettingShowSchedule('${element.Year}.${element.Month}.${element.Id_room}.${element.semester}', 'bySemester')">
                                            <h6 class="font-extrabold">
                                                Semester ${element.semester}
                                            </h6>
                                        </div>
    
                                        <div class="btn-group" role="group"
                                             style="position: relative; bottom: -18px;">
                                            <button type="button"
                                                onclick="gettingDeleteItem('.isItemDel${idx}', '${element.Year}.${element.Month}.${element.Id_room}.${element.nama_room}.${element.semester}', '${order}', ${renderDelFormAsync})"
                                                class="btn btn-sm btn-outline-primary isItemDel${idx}">
                                                <i class="fas fa-fw fa-trash text-danger"></i>  
                                            </button>
                                        </div>
    
                                    </div>
                                </div>
                            </div>
                        </div>`;
            });
        } else {
            rows += `<div class="card-body text-center p-5">
                        ${mySVG_404_1}
                        <div class="mt-4 mb-2">
                            <button type="button" 
                                    class="btn btn-lg btn-primary border lift mt-1">
                                    Schedule not yet available<br>
                                    choose another month's schedule
                            </button>
                        </div>
                    </div>`;

            $("#forNothingData").html(rows);
        }


        resolve(function () {
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="page-content">
                                    <div class="row g-3 mb-3 row-deck">
                                        <div class="col-lg-12 col-xl-12">
                                            <div class="card">
                                                <div class="card-header py-3 d-flex no-bg align-items-center justify-content-between flex-wrap bg-transparent border-bottom">
                                                 
                                                    <nav aria-label="breadcrumb">
                                                        <ol class="breadcrumb">
                                                            <li class="breadcrumb-item">
                                                                <a href="javascript:void(0)"
                                                                   onclick="selectMenu('meinKosu8')">
                                                                    Scheduling Page List By Year
                                                                </a>
                                                            </li>
                                                            <li class="breadcrumb-item">
                                                                <a href="javascript:void(0)"
                                                                   onclick="gettingShowScheduleInfo('byMonth')">
                                                                    Scheduling Page List By Month
                                                                </a>
                                                            </li>
                                                            <li class="breadcrumb-item">
                                                                <a href="javascript:void(0)"
                                                                onclick="gettingShowSchedule('${areYear}.${areMonth}.${areRoom}', 'byRoom')">
                                                                    Scheduling Page List By Room
                                                                </a>
                                                            </li>
                                                        </ol>
                                                    </nav>

                                                    <div class="col-auto d-flex">
                                                        <div class="form-group">
                                                            <div class="input-group transparent-append">
                                                                <span class="input-group-text">
                                                                    <i class="fa fa-calendar-alt"></i>
                                                                </span>
                                                    
                                                                <select class="form-control" 
                                                                        id="chooseMonthMissed" 
                                                                        onchange="gettingShowScheduleInfo('byMonth')">
                                                                    <option value="">Pilih Bulan</option>
                                                                    ${chooseMonth}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="row clearfix g-3" id="forNothingData">
                                                    <div class="card-body">
                                                        <div class="room_book">
                                                            <div class="row row-cols-2 row-cols-sm-4 row-cols-md-6 row-cols-lg-6 g-3">
                                                                
                                                                ${rows}
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
        }());
    });
}

const meinKosu12 = (data, order) => {
    return new Promise((resolve) => {
        console.log(data);
        let rows = '',
            rowType = '';
        let areYear = '';
        let areMonth = '';
        let areRoom = '';
        let semester = '';
        let roomName = '';
        let newFormat = [];



        data.forEach((element, idx) => {
            if (element.Id_praktikum != 0) {
                areYear = element.Year;
                areMonth = element.Month;
                areRoom = element.Id_room;
                semester = element.semester;
                roomName = element.nama_room;
            }
            const itemExists = newFormat.some(item => item.tanggal == element.tanggal);
            const index = newFormat.findIndex(ai => ai.tanggal == element.tanggal);
            if (itemExists) {
                newFormat[index].isTime.push({
                    shift: element.shift,
                    Id_praktikum: element.Id_praktikum,
                    kode_praktikum: element.kode_praktikum,
                    nama_praktikum: element.nama_praktikum,
                    Id_dosen: element.Id_dosen,
                    nama_dosen: element.nama_dosen,
                });
            } else {
                newFormat.push({
                    tanggal: element.tanggal,
                    tanggal_i: element.tanggal_i,
                    isTime: [{
                        shift: element.shift,
                        Id_praktikum: element.Id_praktikum,
                        kode_praktikum: element.kode_praktikum,
                        nama_praktikum: element.nama_praktikum,
                        Id_dosen: element.Id_dosen,
                        nama_dosen: element.nama_dosen,
                    }],
                });
            }
        });
        console.log(newFormat);
        newFormat.sort(function (a, b) {
            return new Date(fDateMMDDYY(a.tanggal_i.split(" ")[1])) - new Date(fDateMMDDYY(b.tanggal_i.split(" ")[1]));
        });

        const countCheck = {};

        for (const element of newFormat) {
            for (const element1 of element.isTime) {
                if (countCheck[element1.Id_dosen]) {
                    countCheck[element1.Id_dosen].count += 1;
                } else {
                    countCheck[element1.Id_dosen] = {
                        count: 1,
                        nama: element1.nama_dosen,
                        praktikum: element1.nama_praktikum
                    };
                }
            }
        }

        const filteredByValue = data => {
            let resultValue = [];
            for (const key in data) {
                if (key != 0) {
                    if (data[key].count < 8) {
                        console.log(`${key}: ${data[key]}`);
                        resultValue.push(data[key]);
                    }
                }
            }

            return resultValue;
        }

        let dataLessThen8 = filteredByValue(countCheck);
        console.log(dataLessThen8);
        let scheduleStatus = '';
        if (dataLessThen8.length > 0) {
            dataLessThen8.forEach(element => {
                scheduleStatus += ` <tr>
                                        <td class="col-3">${element.nama}</td>
                                        <td class="col-6">
                                            <div class="progress progress-danger">
                                                <div class="progress-bar" role="progressbar" style="width: ${element.count}0%" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="80"></div>
                                            </div>
                                        </td>
                                        <td class="col-3 text-center">${element.count} Pertemuan
                                    </tr>`;


            });
        } else {
            scheduleStatus += `<tr>
                                    <td class="col-3">All Schedule Complete</td>
                                    <td class="col-6">
                                        <div class="progress progress-info">
                                            <div class="progress-bar" role="progressbar" style="width: 100%" aria-valuenow="0"
                                                aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </td>
                                    <td class="col-3 text-center">100%</td>
                               </tr>`;
        }

        newFormat.forEach((element, idx) => {
            rowType = (idx % 2 == 0 ? 'even' : 'odd');
            let rowsInrows = '';
            if (element.isTime.length > 2) {
                element.isTime.forEach((element1, idx1) => {
                    rowsInrows += `<td class="dt-body-right">
                                            ${(element1.Id_dosen != 0 ? 
                                                `<table>
                                                    <tbody>
                                                        <tr>
                                                            <td>${element1.nama_praktikum}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>${element1.nama_dosen}</td>
                                                        </tr>
                                                    </tbody>
                                                 </table>` : 
                                                '-')}
                                       </td>`;
                });
            } else {
                element.isTime.forEach((element1, idx1) => {
                    rowsInrows += `<td class="dt-body-right">
                                            ${(element1.Id_dosen != 0 ? 
                                                `<table>
                                                    <tbody>
                                                        <tr>
                                                            <td>${element1.nama_praktikum}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>${element1.nama_dosen}</td>
                                                        </tr>
                                                    </tbody>
                                                 </table>` : 
                                                '-')}
                                       </td>`;
                });
            }

            rows += `<tr role="row" class="${rowType}">
                        <td tabindex="0">
                            ${idx+1}
                        </td>
                        <td class="dt-body-right">${element.tanggal_i}</td>
                        
                        ${rowsInrows}
                    </tr>`;
        });


        resolve(function () {
            globalBigData = data;
            $(`#${main}`).html('');

            $(`#${main}`).html(`<div class="page-content">

                                    <div class="row">
                                        <div class="col-lg-6">
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="card widget-todo px-0 py-1">
                                                <div class="card-header border-bottom d-flex justify-content-between align-items-center">
                                                    <h4 class="card-title d-flex">
                                                        <i class="fas fa-fw fa-calendar-alt font-medium-5 pl-25 pr-75"></i>
                                                        Schedule Status
                                                    </h4>
                                                </div>
                                                <div class="card-body px-0 py-1">
                                                    <table class="table table-borderless">
                                                        <tbody>
                                                            ${scheduleStatus}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>                                            
                                    </div>

                                    <div class="row g-3 mb-3 row-deck">
                                        <div class="col-lg-12 col-xl-12">
                                            <div class="card">
                                                <div class="card-header py-3 d-flex no-bg align-items-center justify-content-between flex-wrap bg-transparent border-bottom">
                                                 
                                                    <nav aria-label="breadcrumb">
                                                        <ol class="breadcrumb">
                                                            <li class="breadcrumb-item">
                                                                <a href="javascript:void(0)"
                                                                   onclick="selectMenu('meinKosu8')">
                                                                    Scheduling Page List By Year
                                                                </a>
                                                            </li>
                                                            <li class="breadcrumb-item">
                                                                <a href="javascript:void(0)"
                                                                   onclick="gettingShowScheduleInfo('byMonth')">
                                                                    Scheduling Page List By Month
                                                                </a>
                                                            </li>
                                                            <li class="breadcrumb-item">
                                                                <a href="javascript:void(0)"
                                                                onclick="gettingShowSchedule('${areYear}.${areMonth}.${areRoom}', 'byRoom')">
                                                                    Scheduling Page List By Room
                                                                </a>
                                                            </li>
                                                            <li class="breadcrumb-item">
                                                                <a href="javascript:void(0)">
                                                                    Daftar Praktikum Ruangan ${roomName} Semester ${semester}
                                                                </a>
                                                            </li>
                                                        </ol>
                                                    </nav>

                                                    <div class="col-auto d-flex">
                                                        <div class="form-group">
                                                            <div class="input-group transparent-append">
                                                                <div class="col-auto d-flex">
                                                                    <button type="button" class="btn btn-primary btn-set-task w-sm-100" data-bs-toggle="modal" data-bs-target="#expadd" 
                                                                            onclick="processExportingData('${areYear}.${areMonth}.${areRoom}.${semester}', 'dataExport')">
                                                                            <i class="fas fa-fw fa-file-pdf"></i>
                                                                            Export Data
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="row clearfix g-3">
                                                    <div class="col-sm-12">
                                                        <div class="card mb-3">
                                                            <div class="card-body">
                                                                <div id="myProjectTable_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                                        
                                                                    <div class="row">
                                                                        <div class="col-sm-12">
                                                                            <table id="myProjectTable"
                                                                                class="table table-hover align-middle mb-0 nowrap dataTable no-footer dtr-inline"
                                                                                style="width: 100%;" role="grid" aria-describedby="myProjectTable_info">
                                                                                <thead>
                                                                                    <tr role="row">
                                                                                        <th style="width: 123.2px;">
                                                                                            Nomor
                                                                                        </th>
                                                                                        <th style="width: 268.2px;">
                                                                                            Tanggal
                                                                                        </th>
                                                                                        <th style="width: 268.2px;">
                                                                                            Pagi
                                                                                        </th>
                                                                                        <th style="width: 268.2px;">
                                                                                            Siang
                                                                                        </th>
                                                                                        <th style="width: 268.2px;">
                                                                                            Sore
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody id="paginattable">
                                        
                                                                                ${rows}
                                        
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>

                                                                    
                                        
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>`);

            dataTabel = {
                dataTabel: newFormat,
                order: order,
            };

            // setupTablePagination(10);
        }());
    });
}





const scheduleInfo = (data, order) => {
    // order = scheduleInfo
    return new Promise((resolve) => {
        resolve(function () {
            globalBigData = data;
            let rows = '';

            data.forEach(element => {
                rows += `<div class="col" style="cursor:pointer;" onclick="showScheduleInfo('${element.Month}', '${order}Month')">
                            <div class="patientinfo-file shadow-sm p-3">
                                <div class="patient-did p-2 bg-primary">
                                    <i class="icofont-ui-calendar fs-4 text-white"></i>
                                </div>
                                <h6 class="fw-bold mt-4 pt-4 mb-4">${element.Month}</h6>
                            </div>
                        </div>`;
            });

            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="container-xxl">

                                    <div class="row align-items-center">
                                        <div class="border-0 mb-4">
                                            <div
                                                class="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                                <h3 class="fw-bold mb-0">Schedule Overview</h3>
                                            </div>
                                        </div>
                                    </div>
                        
                                    <div class="row g-3 mb-3">
                                        <div class="col-xl-12 col-lg-12 col-md-12">
                                            <div class="card mb-3">
                                                <div class="card-body">
                                                    <div class="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-4">
                                                        
                                                        
                                                        ${rows}


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
        }());
    });
}

const scheduleMonth = (data, order) => {
    return new Promise((resolve) => {
        resolve(function () {
            console.log(order + "annon");
            globalBigData = data;
            let rows = '';

            data.forEach((element, idx) => {
                rows += `<div class="room col" onclick="showScheduleInfo('${element.Month},${element.Id_room}', 'scheduleInfoRoom')">
                            <input type="checkbox" id="${idx+1}A">
                            <label for="${idx+1}A">
                                <i class="icofont-patient-bed fs-2"></i>
                                <span class="text-muted">${element.nama_room}</span>
                            </label>
                        </div>`;
            });

            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="container-xxl">
                                    <div class="row g-3 mb-3 row-deck">
                                        <div class="col-lg-12 col-xl-6">
                                            <div class="card">
                                                <div class="card-header py-3 d-flex  bg-transparent border-bottom-0">
                                                    <h6 class="mb-0 fw-bold ">Hospital Room Scheduling</h6>
                                                </div>
                            
                                                <div class="card-body">
                                                    <div class="room_book">
                                                        <div class="row row-cols-2 row-cols-sm-4 row-cols-md-6 row-cols-lg-6 g-3">
                                                            
                                                            ${rows}
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
        }());
    });
}

const scheduleMonth1 = (data, order) => {
    return new Promise((resolve) => {
        globalBigData = data;
        let chooseMonth = renderMonthMissed();
        var areMonth = '';
        var areRoom = '';
        let rows = '';

        data.forEach((element, idx) => {
            if (idx == 0) {
                areMonth = element.Month;
                areRoom = element.Id_room;
            }
            rows += `<div class="col-md-4 col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <button type="button"
                                        onclick="gettingDeleteItem('.isItemDel${idx}', '${areMonth}.${areRoom}', '${order}', ${renderDelFormAsync})"
                                        class="btn btn-sm btn-outline-primary deleterow isItemDel${idx}">
                                        <i class="icofont-ui-delete text-danger"></i>
                                </button>


                                <div class="room col"
                                    onclick="showScheduleInfo('${element.Month},${element.Id_room}', 'scheduleInfoRoom')">
                                    <input type="checkbox" id="${idx+1}A">
                                    <label for="${idx+1}A">
                                        <i class="icofont-patient-bed fs-2"></i>
                                        <span class="text-muted">${element.nama_room}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                     </div>`;
        });

        resolve(function () {
            $(`#${main}`).html('');
            $(`#${main}`).html(`<div class="container-xxl">
                                    <div class="row g-3 mb-3 row-deck">
                                        <div class="col-lg-12 col-xl-12">
                                            <div class="card">
                                                <div class="card-header py-3 d-flex no-bg align-items-center justify-content-between flex-wrap bg-transparent border-bottom">
                                                 
                                                    <h6 class="mb-0 fw-bold ">Hospital Room Scheduling</h6>
                                                
                                                    <div class="col-auto d-flex">
                                                        
                                                        <div class="form-group">
                                                            <div class="input-group transparent-append">
                                                                <span class="input-group-text">
                                                                    <i class="fa fa-venus-mars"></i>
                                                                </span>
                                                    
                                                                <select class="form-control" id="chooseMonthMissed" onchange="gettingShowScheduleInfo('scheduleInfoMonth1')">
                                                                    <option value="">Pilih Bulan</option>
                                                                    ${chooseMonth}
                                                                </select>
                                                    
                                                            </div>
                                                        </div>

                                                    </div>
                                                
                                                
                                                </div>

                                                <div class="row clearfix g-3">
                                                    <div class="card-body">
                                                        <div class="room_book">
                                                            <div class="row row-cols-2 row-cols-sm-4 row-cols-md-6 row-cols-lg-6 g-3">
                                                                
                                                                ${rows}
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
        }());

    });
}