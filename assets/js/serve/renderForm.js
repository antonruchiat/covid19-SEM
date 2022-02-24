function rowsPagination() {
    return `<div class="row"> 
                <div class="col-sm-12 col-md-5">
                    <div class="dataTables_info" id="dataTables_infoEE" role="status" aria-live="polite">
                        Showing 1 to 6 of 6 entries
                    </div>
                </div>
                <div class="col-sm-12 col-md-7">
                    <div class="dataTables_paginate paging_simple_numbers">
                        <ul class="pagination" id="paginatae_infoEE">
                            <li class="paginate_button page-item previous disabled">
                                <a href="javascript:void(0)" aria-controls="myProjectTable"
                                   data-dt-idx="0" tabindex="0" class="page-link">
                                   Previous
                                </a>
                            </li>

                            <li class="paginate_button page-item active">
                                <a href="javascript:void(0)" aria-controls="myProjectTable" 
                                   data-dt-idx="1" tabindex="0" class="page-link">
                                   1
                                </a>
                            </li>

                            <li class="paginate_button page-item next disabled">
                                <a href="javascript:void(0)" aria-controls="myProjectTable"
                                   data-dt-idx="2" tabindex="0" class="page-link">
                                    Next
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`;
}

const formRoom = params => {
    return new Promise((resolve) => {
        resolve(function () {
            let checkLength = params.length;
            globalIdTable = (checkLength != 0 ? params.Id_room : 'anruc');

            $('.overlayFormBody').html(``)
            $('.overlayFormBody').html(`<div class="card-body normalizeBorderRadius">
                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label">Nama Ruangan</label>
                                                        <div class="input-group transparent-append">
                                                            <span class="input-group-text"> 
                                                                <i class="fa fa-align-left"></i> 
                                                            </span>
                                                            <input type="text" class="form-control" id="roomName"
                                                                value="${checkLength != 0 ? params.nama_room : ''}"
                                                                placeholder="Nama Ruangan">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`);
        }())
    });
}

const formDosen = params => {
    return new Promise((resolve) => {
        resolve(function () {
            let checkLength = params.length;
            globalIdTable = (checkLength != 0 ? params.Id_dosen : 'anruc');

            $('.overlayFormBody').html(``);
            $('.overlayFormBody').html(`<div class="card-body normalizeBorderRadius">

                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label">NIDN</label>
                                                        <div class="input-group transparent-append">
                                                        <span class="input-group-text"> 
                                                            <i class="fa fa-address-card"></i> 
                                                        </span>
                                                        <input type="text" class="form-control" id="dosenNIDN"
                                                            value="${checkLength != 0 ? params.nidn : ''}"
                                                            placeholder="Nomor NIDN">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br>

                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label">Nama Dosen</label>
                                                        <div class="input-group transparent-append">
                                                        <span class="input-group-text"> 
                                                            <i class="fa fa-user-tie"></i> 
                                                        </span>
                                                        <input type="text" class="form-control" id="dosenName"
                                                            value="${checkLength != 0 ? params.nama_dosen : ''}"
                                                            placeholder="Nama Dosen">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br>

                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label">Jenis Kelamin</label>
                                                        <div class="input-group transparent-append">
                                                           <span class="input-group-text"> 
                                                                <i class="fa fa-venus-mars"></i> 
                                                            </span>
                                                            <select class="form-control" id="dosenGender">
                                                            ${checkLength != 0 ? `<option>${params.jenis_kelamin}</option>` : '<option>Jenis Kelamin</option>'}
                                                                <option>Laki - Laki</option>
                                                                <option>Perempuan</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`);
        }());
    });
}

async function getDataBeforeForm(paramFunctions, params, order) {
    try {
        let otherOrder, otherData, otherData1, otherData2, otherData3;
        if (order == 'meinKosu7') {
            otherOrder = await convertContextAsync(order);
            otherData1 = await fetching(_URLVALID, otherOrder);
            if (parseInt(otherData1) === 0) {
                return await auth(otherData1);
            }
            otherData2 = await monthMissed();
            otherData3 = await currentYear();

            otherData = {
                otherData1: otherData1,
                otherData2: otherData2,
                otherData3: otherData3,
            }
        } else {
            otherOrder = await convertContextAsync(order);
            otherData = await fetching(_URLVALID, otherOrder);
            if (parseInt(otherData) === 0) {
                return await auth(otherData);
            }
        }

        params = {
            additionalData: otherData,
            data: params,
        }
        return await paramFunctions(params);
    } catch (rejectedReason) {
        return toastr.error('Error NetWork');
    }
}

const formPraktikum = params => {
    return new Promise((resolve) => {
        resolve(function () {
            let checkLength = params.data.length;
            globalIdTable = (checkLength != 0 ? params.data.Id_praktikum : 'anruc');

            const itemExists = params.additionalData.tb_dosen.some(item => item.Id_dosen == params.data.Id_dosen);
            const index = params.additionalData.tb_dosen.findIndex(ai => ai.Id_dosen == params.data.Id_dosen);

            let selectOps = convertFormOps(params.additionalData.tb_dosen, 'dosen');
            let opsSelect = '';

            if (!itemExists) {
                opsSelect = `<select class="form-control" id="dosenSelectOps">
                                <option data-id="kosong">
                                    Sudah Dihapus
                                </option>
                                <option value="">Pilih Dosen</option>
                                ${selectOps}           
                             </select>`;
            } else {
                opsSelect = `<select class="form-control" id="dosenSelectOps">
                                <option data-id="${params.data.Id_dosen}">
                                        ${params.data.nama_dosen}
                                </option>
                                <option value="">Pilih Dosen</option>
                                ${selectOps}           
                             </select>`;
            }

            const itemExists1 = params.additionalData.tb_room.some(item => item.Id_room == params.data.Id_room);
            const index1 = params.additionalData.tb_room.findIndex(ai => ai.Id_room == params.data.Id_room);

            let selectOps1 = convertFormOps(params.additionalData.tb_room, 'room');
            let opsSelect1 = '';

            if (!itemExists1) {
                opsSelect1 = `<select class="form-control" id="roomSelectOps">
                                <option data-id="kosong">
                                    Sudah Dihapus
                                </option>
                                <option value="">Pilih Ruangan</option>
                                ${selectOps1}           
                              </select>`;
            } else {
                opsSelect1 = `<select class="form-control" id="roomSelectOps">
                                <option data-id="${params.data.Id_room}">
                                        ${params.data.nama_room}
                                </option>
                                <option value="">Pilih Ruangan</option>
                                ${selectOps1}           
                              </select>`;
            }


            let selectOps2 = convertFormOps('static', 'semester');


            $('.overlayFormBody').html(``);
            $('.overlayFormBody').html(`<div class="card-body normalizeBorderRadius">

                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label"> Dosen Praktikum </label>

                                                        <div class="input-group transparent-append">
                                                            <span class="input-group-text"> 
                                                                <i class="fa fa-user-tie"></i> 
                                                            </span>

                                                            ${checkLength != 0 ? opsSelect : 
                                                            `<select class="form-control" id="dosenSelectOps">
                                                                <option value="">Pilih Dosen</option>
                                                                ${selectOps}           
                                                            </select>`}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label"> Ruangan Praktikum </label>

                                                        <div class="input-group transparent-append">
                                                            <span class="input-group-text"> 
                                                                <i class="fa fa-door-open"></i> 
                                                            </span>

                                                            ${checkLength != 0 ? opsSelect1 : 
                                                            `<select class="form-control" id="roomSelectOps">
                                                                <option value="">Pilih Ruangan</option>
                                                                ${selectOps1}           
                                                            </select>`}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label">Kode Praktikum</label>
                                                        <div class="input-group transparent-append">
                                                        <span class="input-group-text"> 
                                                            <i class="fa fa-braille"></i> 
                                                        </span>
                                                        <input type="text" class="form-control" id="praktikumKode"
                                                            value="${checkLength != 0 ? params.data.kode_praktikum : ''}"
                                                            placeholder="Kode Praktikum">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label">Nama Praktikum</label>
                                                        <div class="input-group transparent-append">
                                                        <span class="input-group-text"> 
                                                            <i class="fa fa-bookmark"></i> 
                                                        </span>
                                                        <input type="text" class="form-control" id="praktikumName"
                                                            value="${checkLength != 0 ? params.data.nama_praktikum : ''}"
                                                            placeholder="Nama Praktikum">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label">Jumlah SKS</label>
                                                        <div class="input-group transparent-append">
                                                        <span class="input-group-text"> 
                                                            <i class="fa fa-equals"></i> 
                                                        </span>
                                                        <input type="number" class="form-control" id="jumlahPraktikum"
                                                            value="${checkLength != 0 ? params.data.jumlah_sks : ''}"
                                                            placeholder="Jumlah SKS">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label"> Semester </label>

                                                        <div class="input-group transparent-append">
                                                            <span class="input-group-text"> 
                                                                <i class="fa fa-external-link-square-alt"></i> 
                                                            </span>

                                                            <select class="form-control" id="semester">
                                                                ${checkLength != 0 ? `<option data-semester="${params.data.semester}">
                                                                                        Semester ${params.data.semester}</option>
                                                                                        <option value="">Pilih Semester</option>
                                                                                        ${selectOps2}` : 
                                                                                     `<option value="">Pilih Semester</option>
                                                                                        ${selectOps2}`}   
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>`);
        }())
    });
}

const formShift = params => {
    return new Promise((resolve) => {
        resolve(function () {
            let checkLength = params.length;
            globalIdTable = (checkLength != 0 ? params.Id_shift : 'anruc');


            $('.overlayFormBody').html(``);

            $('.overlayFormBody').html(`<div class="card-body normalizeBorderRadius">
                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label">Kode Sesi</label>
                                                        <div class="input-group transparent-append">
                                                            <span class="input-group-text"> 
                                                                <i class="fa fa-align-left"></i> 
                                                            </span>
                                                            <input type="text" class="form-control" id="kodeSesi"
                                                                value="${checkLength != 0 ? params.kode_shift : ''}"
                                                                placeholder="Kode Sesi">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label">Sesi</label>
                                                        <div class="input-group transparent-append">
                                                            <span class="input-group-text"> 
                                                                <i class="fa fa-align-left"></i> 
                                                            </span>
                                                            <input type="text" class="form-control" id="namaSesi"
                                                                value="${checkLength != 0 ? params.shift : ''}"
                                                                placeholder="Nama Sesi">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label">Jam Mulai</label>
                                                        <div class="input-group transparent-append">
                                                            <span class="input-group-text"> 
                                                                <i class="fa fa-align-left"></i> 
                                                            </span>
                                                            <input type="time" class="form-control" id="waktuMulai" 
                                                                value="${checkLength != 0 ?  params.jam_mulai : ''}"
                                                                placeholder="07:30:00">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label">Jam Akhir</label>
                                                        <div class="input-group transparent-append">
                                                            <span class="input-group-text"> 
                                                                <i class="fa fa-align-left"></i> 
                                                            </span>
                                                            <input type="time" class="form-control" id="waktuAkhir" 
                                                                value="${checkLength != 0 ?  params.jam_selesai : ''}"
                                                                placeholder="13:00:00">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>`);
        }());
    });
}

const formSesiRequest = params => {
    return new Promise((resolve) => {
        resolve(function () {
            let checkLength = params.data.length;
            globalIdTable = (checkLength != 0 ? params.data.Id_shift_request : 'anruc');

            const itemExists = params.additionalData.tb_dosen.some(item => item.Id_dosen == params.data.Id_dosen);
            const index = params.additionalData.tb_dosen.findIndex(ai => ai.Id_dosen == params.data.Id_dosen);

            let selectOps = convertFormOps(params.additionalData.tb_dosen, 'dosen');
            let opsSelect = '';

            if (!itemExists) {
                opsSelect = `<select class="form-control" id="dosenSelectOps1">
                                <option data-id="kosong">
                                    Sudah Dihapus
                                </option>
                                <option value="">Pilih Dosen</option>
                                ${selectOps}           
                             </select>`;
            } else {
                opsSelect = `<select class="form-control" id="dosenSelectOps1">
                                <option data-id="${params.data.Id_dosen}">
                                        ${params.data.nama_dosen}
                                </option>
                                <option value="">Pilih Dosen</option>
                                ${selectOps}           
                             </select>`;
            }

            const itemExists1 = params.additionalData.tb_shift.some(item => item.Id_shift == params.data.Id_shift);
            const index1 = params.additionalData.tb_shift.findIndex(ai => ai.Id_shift == params.data.Id_shift);

            let selectOps1 = convertFormOps(params.additionalData.tb_shift, 'jadwal');
            let opsSelect1 = '';

            if (!itemExists1) {
                opsSelect1 = `<select class="form-control" id="jadwalSesiSelectOps">
                                <option data-id="kosong">
                                    Sudah Dihapus
                                </option>
                                <option value="">Pilih Sesi</option>
                                ${selectOps1}           
                             </select>`;
            } else {
                opsSelect1 = `<select class="form-control" id="jadwalSesiSelectOps">
                                <option data-id="${params.data.Id_shift}">
                                        ${params.data.shift}
                                </option>
                                <option value="">Pilih Sesi</option>
                                ${selectOps1}           
                             </select>`;
            }



            $('.overlayFormBody').html(``);
            $('.overlayFormBody').html(`<div class="card-body normalizeBorderRadius">
                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label"> Nama Dosen </label>

                                                        <div class="input-group transparent-append">
                                                            <span class="input-group-text"> 
                                                                <i class="fa fa-user-tie"></i> 
                                                            </span>

                                                            ${checkLength != 0 ? opsSelect : 
                                                            `<select class="form-control" id="dosenSelectOps1">
                                                                <option value="">Pilih Dosen</option>
                                                                ${selectOps}           
                                                            </select>`}
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label"> Sesi </label>

                                                        <div class="input-group transparent-append">
                                                            <span class="input-group-text"> 
                                                                <i class="fa fa-list-alt"></i> 
                                                            </span>

                                                            ${checkLength != 0 ? opsSelect1 : 
                                                            `<select class="form-control" id="jadwalSesiSelectOps">
                                                                <option value="">Pilih Sesi</option>
                                                                ${selectOps1}           
                                                            </select>`}
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label"> Tanggal </label>

                                                        <div class="input-group transparent-append">
                                                            <span class="input-group-text"> 
                                                                <i class="fa fa-calendar-day"></i>  
                                                            </span>

                                                            <input type="date" class="form-control" id="tanggalRequest"
                                                            value="${checkLength != 0 ? params.data.tanggal : ''}"
                                                            placeholder="2021-09-19">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`);
        }());
    });
}

const formDayOff = params => {
    return new Promise((resolve) => {
        resolve(function () {
            let checkLength = params.data.length;
            globalIdTable = (checkLength != 0 ? params.data.Id_day_off : 'anruc');

            const itemExists = params.additionalData.tb_dosen.some(item => item.Id_dosen == params.data.Id_dosen);
            const index = params.additionalData.tb_dosen.findIndex(ai => ai.Id_dosen == params.data.Id_dosen);

            let selectOps = convertFormOps(params.additionalData.tb_dosen, 'dosen');
            let opsSelect = '';

            if (!itemExists) {
                opsSelect = `<select class="form-control" id="dosenSelectOps2">
                                <option data-id="kosong">
                                    Sudah Dihapus
                                </option>
                                <option value="">Pilih Dosen</option>
                                ${selectOps}           
                             </select>`;
            } else {
                opsSelect = `<select class="form-control" id="dosenSelectOps2">
                                <option data-id="${params.data.Id_dosen}">
                                        ${params.data.nama_dosen}
                                </option>
                                <option value="">Pilih Dosen</option>
                                ${selectOps}           
                             </select>`;
            }


            $('.overlayFormBody').html(``);
            $('.overlayFormBody').html(`<div class="card-body normalizeBorderRadius">
                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label"> Nama Dosen </label>

                                                        <div class="input-group transparent-append">
                                                            <span class="input-group-text"> 
                                                                <i class="fa fa-user-tie"></i> 
                                                            </span>

                                                            ${checkLength != 0 ? opsSelect : 
                                                            `<select class="form-control" id="dosenSelectOps2">
                                                                <option value="">Pilih Dosen</option>
                                                                ${selectOps}           
                                                            </select>`}
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label">Tanggal Mulai</label>
                                                        <div class="input-group transparent-append">
                                                        <span class="input-group-text"> 
                                                            <i class="fa fa-calendar-check"></i> 
                                                        </span>
                                                        <input type="date" class="form-control" id="startDate"
                                                            value="${checkLength != 0 ? params.data.start_date : ''}"
                                                            placeholder="Tanggal Mulai">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row g-3 align-items-center">
                                                <div class="basic-form">
                                                    <div class="form-group">
                                                        <label class="text-label">Tanggal Akhir</label>
                                                        <div class="input-group transparent-append">
                                                        <span class="input-group-text"> 
                                                            <i class="fa fa-calendar-check"></i> 
                                                        </span>
                                                        <input type="date" class="form-control" id="endDate"
                                                            value="${checkLength != 0 ? params.data.end_date : ''}"
                                                            placeholder="Tanggal Akhir">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`);
        }())
    });
}

const formSchedul = params => {
    return new Promise((resolve) => {
        resolve(function () {
            console.log(params);
            // let checkLength = params.data.length;
            // globalIdTable = (checkLength != 0 ? params.data.Id_schedul : 'anruc');

            let montMisseds = params.additionalData.otherData2;
            let currentYear = params.additionalData.otherData3;
            let selectOps = convertFormOps(montMisseds, 'month');
            let selectOps1 = convertFormOps(currentYear, 'year');
            let selectOps2 = convertFormOps(params.additionalData.otherData1.tb_room, 'room');
            let selectOps3 = convertFormOps('static', 'semester');
            $('.overlayFormBody').html(``);
            $('.overlayFormBody').html(`<div class="card-body normalizeBorderRadius">
                                            <div class="row g-3 align-items-center">
                                                <div class="col-sm-6">
                                                    <div class="basic-form">
                                                        <div class="form-group">
                                                            <label class="text-label"> Bulan </label>

                                                            <div class="input-group transparent-append">
                                                                <span class="input-group-text">
                                                                    <i class="fa fa-calendar-day"></i>
                                                                </span>

                                                                <select class="form-control" id="monthSchedul" onchange="getMonthInfo()">
                                                                    <option value="">Pilih Bulan</option>
                                                                    ${selectOps}
                                                                </select>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-sm-6">
                                                    <div class="basic-form">
                                                        <div class="form-group">
                                                            <label class="text-label"> Tahun </label>

                                                            <div class="input-group transparent-append">
                                                                <span class="input-group-text">
                                                                    <i class="fa fa-external-link-square-alt"></i>
                                                                </span>

                                                                <select class="form-control" id="yearSchedul" readonly>
                                                                    ${selectOps1}
                                                                </select>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br>


                                            <div class="row g-3 align-items-center">
                                                <div class="col-sm-6">
                                                    <div class="basic-form">
                                                        <div class="form-group">
                                                            <label class="text-label"> Semester </label>

                                                            <div class="input-group transparent-append">
                                                                <span class="input-group-text"> 
                                                                    <i class="fa fa-external-link-square-alt"></i> 
                                                                </span>

                                                                <select class="form-control" id="semesterSchedule">
                                                                    <option value="">Pilih Semester</option>
                                                                    ${selectOps3}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-sm-6">
                                                    <div class="basic-form">
                                                        <div class="form-group">
                                                            <label class="text-label"> Ruangan Praktikum </label>

                                                            <div class="input-group transparent-append">
                                                                <span class="input-group-text"> 
                                                                    <i class="fa fa-door-open"></i> 
                                                                </span>

                                                                <select class="form-control" id="roomSchedul" onchange="getShiftPraktikumInfo()">
                                                                    <option value="">Pilih Ruangan</option>
                                                                    ${selectOps2}           
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <br>

                                            <div class="customer-like mt-5" id="forResultMonthSelect">

                                            </div>

                                            <div class="customer-like mt-5" id="forResultRoomSelect">

                                            </div>

                                        </div>`);
        }());
    });
}

function formDelete(paramId, context) {
    globalIdTable = (paramId != '' ? paramId : 'anruc');
    return new Promise((resolve) => {
        resolve(function () {
            $('.overlayBodyDelete').html(``);
            $('.overlayBodyDelete').html(`<div class="alert alert-danger left-icon-big alert-dismissible fade show">
                                            <h4 class="alert-heading">Perhatian!!</h4>
                                            <p class="mb-0">Apakah Anda Akan Menghapus Data ${context} Berikut ?</p>
                                          </div>`);
        }());
    });
}

function formResetAppAdmin(order, params) {
    return new Promise((resolve) => {
        $(`#${main}`).html('');
        console.log(params)

        let checkLength = isEmptyObject(params);
        if (!checkLength) {
            globalIdTable = params.Id_appcontroller;
        } else {
            globalIdTable = 'anruc'
        }

        resolve(function () {
            $(`#${main}`).html(`<div class="container-xxl">
                                    <div class="row">
                                        <div class="col-10 col-lg-10">
                                            <div class="card radius-15">
                                                <div class="no-gutters">
                                                    <div class="card-body p-md-5">
                                                        <div class="text-center">
                                                            <h3 class="mt-4 font-weight-bold">Welcome Back</h3>
                                                        </div>
                                                        <div class="login-separater text-center"> 
                                                            <span>APPLICATION SETTING</span>
                                                            <hr>
                                                        </div>
                                                        <div class="card border-lg-top-danger">
                                                            <div class="card-body p-5">
                                                                <div class="form-body">

                                                                    <div class="row g-3 align-items-center">
                                                                        <div class="basic-form">
                                                                            <div class="form-group">
                                                                                <label class="text-label">Nama Lengkap</label>
                                                                                <div class="input-group transparent-append">
                                                                                    <span class="input-group-text">
                                                                                        <i class="fa fa-user"></i> 
                                                                                    </span>
                                                                                    <input class="form-control" type="text" 
                                                                                           id="appAdmSetNameId" 
                                                                                           placeholder="Name"
                                                                                           value="${(checkLength) ? '' : params.nama}">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <br>

                                                                    <div class="g-3 align-items-center">
                                                                        <div class="basic-form">
                                                                            <div class="form-group">
                                                                                <label class="text-label">Jenis Kelamin</label>
                                                                                <div class="input-group transparent-append">
                                                                                    <span class="input-group-text">
                                                                                        <i class="fa fa-transgender"></i>
                                                                                    </span>
                                                                                    <select class="form-control custom-select" 
                                                                                            id="appAdmSetGenderId">
                                                                                            ${(checkLength) ? 
                                                                                            `<option>Jenis Kelamin</option>` :
                                                                                            `<option>${params.jenis_kelamin}</option>`}
                                                                                            <option>LAKI - LAKI</option>
                                                                                            <option>PEREMPUAN</option>                
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <br>

                                                                    <div class="row g-3 align-items-center">
                                                                        <div class="basic-form">
                                                                            <div class="form-group">
                                                                                <label class="text-label">Tanggal Lahir</label>
                                                                                <div class="input-group transparent-append">
                                                                                    <span class="input-group-text">
                                                                                        <i class="fa fa-calendar"></i> 
                                                                                    </span>
                                                                                    <input class="form-control" type="date" 
                                                                                           id="appAdmSetBirthDayId" 
                                                                                           placeholder="Gender"
                                                                                           value="${(checkLength) ? '' : params.tanggal_lahir}">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <br>

                                                                    <div class="row g-3 align-items-center">
                                                                        <div class="basic-form">
                                                                            <div class="form-group">
                                                                                <label class="text-label">Nomor HandPhone</label>
                                                                                <div class="input-group transparent-append">
                                                                                    <span class="input-group-text">
                                                                                        <i class="fa fa-mobile"></i> 
                                                                                    </span>
                                                                                    <input class="form-control" type="tel" 
                                                                                           id="appAdmSetPhoneDayId"
                                                                                           pattern="[0]{1}-[0-9]{14}" 
                                                                                           maxlength="15"
                                                                                           placeholder="Nomor HandPhone"
                                                                                           value="${(checkLength) ? '' : (params.kontak == null ? '' : params.kontak)}">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <br>

                                                                    <div class="row g-3 align-items-center">
                                                                        <div class="basic-form">
                                                                            <div class="form-group">
                                                                                <label class="text-label">ALamat Email</label>
                                                                                <div class="input-group transparent-append">
                                                                                    <span class="input-group-text">
                                                                                        <i class="fa fa-at"></i> 
                                                                                    </span>
                                                                                    <input class="form-control" type="email" 
                                                                                           id="appAdmSetEmailId"
                                                                                           placeholder="ALamat Email"
                                                                                           value="${(checkLength) ? '' : params.email}">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <br>

                                                                    <div class="row g-3 align-items-center">
                                                                        <div class="basic-form">
                                                                            <div class="form-group">
                                                                                <label class="text-label">Password</label>
                                                                                <div class="input-group transparent-append">
                                                                                    <span class="input-group-text">
                                                                                        <i class="fa fa-lock"></i>  
                                                                                    </span>
                                                                                    <input class="form-control" type="password" 
                                                                                           id="appAdmSetPassId"
                                                                                           placeholder="Choose Password"
                                                                                           value="${(checkLength) ? '' : ''}">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <br>

                                                                    <div class="row g-3 align-items-center">
                                                                        <div class="basic-form">
                                                                            <div class="form-group">
                                                                                <label class="text-label">Confirm Password</label>
                                                                                <div class="input-group transparent-append">
                                                                                    <span class="input-group-text">
                                                                                        <i class="fa fa-lock"></i>  
                                                                                    </span>
                                                                                    <input class="form-control" type="password" 
                                                                                           id="appAdmSetRepassId"
                                                                                           placeholder="Confirm Password"
                                                                                           value="${(checkLength) ? '' : ''}">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <br>

                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div class="btn-group mt-3 w-100">
                                                            <button type="button" id="updateAppSetting" 
                                                                class="btn btn-primary btn-block">
                                                                Update
                                                                <i class="fa fa-arrow-right"></i>
                                                            </button>
                                                        </div>
                                                        <hr>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
        }());
    });
}