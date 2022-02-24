const permut2Combination = (data, num) => {
    var combinations = [];
    var indices = [];
    var result = [];

    function run(level, start) {
        for (var i = 0; i < data.length; i++) {

            if (!indices[i]) {

                indices[i] = true;

                combinations[level] = data[i];

                if (level < num - 1) {
                    run(level + 1, i + 1);
                } else {
                    // console.log(combinations.join(" "));
                    result.push(combinations.join(" "));
                }

                indices[i] = false;
            }
        }

    }
    run(0, 0);

    return result;
}

function permut2CombinationRepetion(permutationOptions,
    permutationLength = permutationOptions.length) {

    if (permutationLength === 1) {
        return permutationOptions.map((permutationOption) => [permutationOption]);
    }

    // Init permutations array.
    const permutations = [];

    // Get smaller permutations.
    const smallerPermutations = permut2CombinationRepetion(
        permutationOptions,
        permutationLength - 1
    );

    // Go through all options and join it to the smaller permutations.
    permutationOptions.forEach((currentOption) => {
        smallerPermutations.forEach((smallerPermutation) => {
            permutations.push([currentOption].concat(smallerPermutation));
        });
    });

    return permutations;
}

function fDateMMDDYY_stringIwant(inputDate) {
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        var day = date.getDate().toString();
        var month = (date.getMonth() + 1).toString();
        // Months use 0 index.

        // return (month[1] ? month : '0' + month[0]) + '/' +
        //   (day[1] ? day : '0' + day[0]) + '/' + 
        //   date.getFullYear();

        return `${day}/${month}/${date.getFullYear()}`
    }
}

function checkEqualsDate(input1, input2) {
    let dateParts1 = input1.split("/");
    let day1 = dateParts1[0];
    let month1 = dateParts1[1] - 1;
    let year1 = dateParts1[2];
    // set a date
    let someday1 = new Date(year1, month1, day1);

    let dateParts2 = input2.split("/");
    let day2 = dateParts2[0];
    let month2 = dateParts2[1] - 1;
    let year2 = dateParts2[2];
    // set a date
    let someday2 = new Date(year2, month2, day2);

    if (someday1 > someday2) {
        text = "Someday1 is Bigger";
        return false;
    } else if (someday2 > someday1) {
        text = "Someday2 is Bigger";
        return false;
    } else {
        text = "someday2 are same with someday1.";
        return true;
    }
}

function fDateDDMMYY(input) {
    var datePart = input.match(/\d+/g),
        year = datePart[0].substring(0), // get only two digits
        month = datePart[1],
        day = datePart[2];

    return day + '/' + month + '/' + year;
}

function fDateMMDDYY(input) {
    var datearray = input.split("/");
    var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
    return newdate;
}

function getTomorrow(input) {
    // let day = new Date(fDateMMDDYY(input)); //mmddyyy
    // let tomorrow = new Date(day);
    // tomorrow = tomorrow.setDate(day.getDate() + 1);
    // tomorrow = tomorrow.toLocaleDateString();
    // console.log(tomorrow);
    // return tomorrow;
    input = fDateMMDDYY(input);
    var today = new Date(input); //mmddyyy
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow = tomorrow.toLocaleDateString();
    console.log(tomorrow);
    return tomorrow;
    // console.log(tomorrow.toLocaleDateString());
}


function checkIntervalDate(Date_1, Date_2, Date_to_check) {

    // var Date_1 = "11/8/2021";
    // var Date_2 = "11/13/2021";
    // var Date_to_check = "11/10/2021";

    let D_1 = Date_1.split("/");
    let D_2 = Date_2.split("/");
    let D_3 = Date_to_check.split("/");
    let flag;

    var d1 = new Date(D_1[2], parseInt(D_1[1]) - 1, D_1[0]);
    var d2 = new Date(D_2[2], parseInt(D_2[1]) - 1, D_2[0]);
    var d3 = new Date(D_3[2], parseInt(D_3[1]) - 1, D_3[0]);

    if (d3 >= d1 && d3 <= d2) {
        console.log("Date is in between the " + "Date 1 and Date 2");
        return true;
    } else {
        console.log("Date is not in between " + "the Date 1 and Date 2");
        return false;
    }
}

const allEqual = arr => arr.every(v => v === arr[0]);

const convertKodeShift = kode => {
    if (kode == 'P') {
        return 0;
    } else if (kode == 'S') {
        return 1;
    } else {
        return 2;
    }
}

const feasibilityTest_dayOff = (arrCandidateShift, targInRoom) => {
    // TODO untuk cek kelayakan ada diantara day off
    let itemExists, index, Date_1, Date_2, Date_to_check;

    arrCandidateShift.forEach((item, idx) => {
        item.dosen.forEach((item1, idx1) => {
            itemExists = targInRoom.some(any => parseInt(any.Id_dosen) == parseInt(item1.split('.')[1]));
            index = targInRoom.findIndex(ai => parseInt(ai.Id_dosen) == parseInt(item1.split('.')[1]));

            if (itemExists && targInRoom[index].start_date != null) {
                Date_1 = fDateMMDDYY(fDateDDMMYY(targInRoom[index].start_date));
                Date_2 = fDateMMDDYY(fDateDDMMYY(targInRoom[index].end_date));
                Date_to_check = fDateMMDDYY(item.date.split(" ")[1]);
                if (checkIntervalDate(Date_1, Date_2, Date_to_check)) {
                    item.dosen[idx1] = `${item1}_Off:${item1.split('.')[1]}`;
                    item.day_off.push(`${item1.split('.')[1]}:Off#[${idx1}]__${item.date}`);
                    item.flagD_Off = true;
                }
            }
            // else if (!itemExists && targInRoom[index].start_date != null) {
            //     Date_1 = fDateMMDDYY(fDateDDMMYY(targInRoom[index].start_date));
            //     Date_2 = fDateMMDDYY(fDateDDMMYY(targInRoom[index].end_date));
            //     Date_to_check = fDateMMDDYY(item.date.split(" ")[1]);
            //     if (checkIntervalDate(Date_1, Date_2, Date_to_check)) {
            //         item.dosen[idx1] = `${item1}_Off:${item1.split('.')[1]}`;
            //         item.day_off.push(`${item1.split('.')[1]}:Off#[${idx1}]__${item.date}`);
            //         item.flagD_Off = true;
            //     }
            // }
        });
    });
    // console.log(arrCandidateShift);
    return arrCandidateShift;
}

const feasibilityTest_shiftReq = (arrCandidateShift, targInRoom) => {
    // TODO untuk cek kelayakan ada request yang sama dengan jadwal baru
    let itemExists1, index1;

    arrCandidateShift.forEach((item, idx) => {
        if (item.flagD_Off != true) {
            item.dosen.forEach((item1, idx1) => {
                itemExists1 = targInRoom.some(any => parseInt(any.Id_dosen) == parseInt(item1.split('.')[1]));
                index1 = targInRoom.findIndex(ai => parseInt(ai.Id_dosen) == parseInt(item1.split('.')[1]));

                if (itemExists1 && targInRoom[index1].tanggal != null) {
                    let dateToCheck1 = fDateMMDDYY_stringIwant(targInRoom[index1].tanggal);
                    let dateToCheck2 = item.date.split(" ")[1];
                    let checTheDate = checkEqualsDate(dateToCheck1, dateToCheck2);
                    let sesiIndex = convertKodeShift(targInRoom[index1].kode_shift);
                    if (checTheDate == true) {
                        item.dosen[idx1] = `${item1}_shiftReq:${item1.split('.')[1]}`;
                        item.shift_req.push(`${item1.split('.')[1]}:shiftReq${idx1}#${sesiIndex}__${item.date}`);
                        item.flagShiftReq = true;
                    }
                }
                // else if (!itemExists1) {
                //     if (checTheDate == true) {
                //         item.dosen[idx1] = `${item1}_shiftReq:${item1.split('.')[1]}`;
                //         item.shift_req.push(`${item1.split('.')[1]}:shiftReq${idx1}#${sesiIndex}__${item.date}`);
                //         item.flagShiftReq = true;
                //     }
                // }
            });
        }
    });

    console.log(arrCandidateShift);
    return arrCandidateShift;
}

const schedul3Combination = (data, arrDosenID) => {
    let cloneArrDosenID = [...arrDosenID];

    if (cloneArrDosenID.length == 1) {
        cloneArrDosenID.push('x');
        cloneArrDosenID.push('x');
    } else if (cloneArrDosenID.length == 2) {
        cloneArrDosenID.push('x');
    }

    let arr3Combination = permut2CombinationRepetion(cloneArrDosenID, 3); //For NotSaturday Shift

    arr3Combination.forEach((elemen, idx) => {
        if (allEqual(elemen)) {
            arr3Combination.splice(idx, 1);
        }
    });

    console.log(arr3Combination);

    let notSaturdayShift = firstSearch(data.resultMonth.monthHasNotSaturday, arr3Combination);
    let test_NotSaturdayShift1 = feasibilityTest_dayOff(notSaturdayShift, data.dosenInRoom);
    let test_NotSaturdayShift2 = feasibilityTest_shiftReq(test_NotSaturdayShift1, data.dosenInRoom);

    console.log(test_NotSaturdayShift2);
    return test_NotSaturdayShift2;
}

const schedul2Combination = (data, arrDosenID) => {
    let cloneArrDosenID = [...arrDosenID];

    if (cloneArrDosenID.length == 1) {
        cloneArrDosenID.push('x');
    }

    let arr2Combination = permut2CombinationRepetion(cloneArrDosenID, 2); //For saturday Shift
    let saturdayShift = firstSearch(data.resultMonth.monthHasSaturday, arr2Combination);
    let test_SaturdayShift1 = feasibilityTest_dayOff(saturdayShift, data.dosenInRoom);
    let test_SaturdayShift2 = feasibilityTest_shiftReq(test_SaturdayShift1, data.dosenInRoom);

    // console.log(test_SaturdayShift2);
    return test_SaturdayShift2;
};

function firstSearch(resultMonth, doctorCandidate, flagContain = true) {
    let tmpResult_one = [];
    resultMonth.forEach((element, idx) => {
        doctorCandidate.forEach((element1, idx1) => {
            if (idx == idx1) {
                tmpResult_one.push({
                    date: element,
                    dosen: element1,
                    day_off: [],
                    shift_req: [],
                });
            }
        });
    });

    // console.log(`${resultMonth.length} === ${doctorCandidate.length}`);

    if (resultMonth.length <= doctorCandidate.length) {
        return tmpResult_one;
    } else {
        let start;
        if (flagContain) {
            // untuk resultMonth.length > doctorCandidate.length
            if (tmpResult_one.length != resultMonth.length) {
                start = doctorCandidate.length - 1;
                return continueSearch(start, resultMonth, doctorCandidate, tmpResult_one, flagContain);
            }
        } else {
            // untuk doctorCandidate.length > resultMonth.length (OPTIONS: jika Ingin Memakai Semua Kombinasi)
            if (tmpResult_one.length != doctorCandidate.length) {
                start = resultMonth.length - 1;
                return continueSearch(start, resultMonth, doctorCandidate, tmpResult_one, flagContain);
            }
        }
    }
}

function continueSearch(start, resultMonth, doctorCandidate, tmpResult_one, flagContain) {
    let tmpIndex;
    if (flagContain) {
        resultMonth.forEach((element, idx) => {
            doctorCandidate.forEach((element1, idx1) => {
                if (idx > start) {
                    if (idx1 == (idx - (start + 1))) {
                        tmpResult_one.push({
                            date: element,
                            dosen: element1,
                            day_off: [],
                            shift_req: [],
                        });

                        if (idx1 == doctorCandidate.length - 1) {
                            tmpIndex = idx;
                        }
                    }
                }
            });
        });

        if (tmpResult_one.length != resultMonth.length) {
            let startAgain = tmpIndex;
            return continueSearch(startAgain, resultMonth, doctorCandidate, tmpResult_one, flagContain);
        } else {
            // console.log(tmpResult_one);
            return tmpResult_one;
        }
    } else {
        resultMonth.forEach((element, idx) => {
            doctorCandidate.forEach((element1, idx1) => {
                if (idx1 > start) {
                    if (idx1 == (start + 1 + idx)) {
                        tmpResult_one.push({
                            date: element,
                            dosen: element1,
                            day_off: [],
                            shift_req: [],
                        });
                    }
                }
            });
        });

        if (tmpResult_one.length != doctorCandidate.length) {
            let startAgain = tmpResult_one.length - 1;
            return continueSearch(startAgain, resultMonth, doctorCandidate, tmpResult_one, flagContain);
        } else {
            console.log(tmpResult_one);
            return tmpResult_one;
        }
    }
}


const bestFinalResult = (combinedSchedule, arrDosenID) => {
    let shiftReq_DOff = [];
    combinedSchedule.forEach(element => {
        if (element.flagShiftReq) {
            shiftReq_DOff.push(element);
        }
    });

    console.log(shiftReq_DOff);

    arrDosenID.forEach((element, indexx) => {
        let oldItemCheck = 'anruc';
        let count1 = 0;
        if (element.split('.')[1] != oldItemCheck) {
            oldItemCheck = element.split('.')[1];

            if (shiftReq_DOff.length > 0) {
                shiftReq_DOff.forEach((el, inx) => {
                    el.dosen.forEach((el1, inx1) => {
                        if (el1.includes("_shiftReq:")) {
                            if (el1.split(`_shiftReq:`)[1] == element.split('.')[1] &&
                                el1.split(`_shiftReq:`)[0].split(".")[0] == element.split('.')[0]) {
                                if (count1 > 8) {
                                    item.dosen[idx1] = 'x';
                                } else {
                                    count1 += 1;
                                    if (count1 > 8) {
                                        item.dosen[idx1] = 'x';
                                    }
                                }
                            }
                        }
                    });
                });
            }

            combinedSchedule.forEach((item, idx) => {
                item.dosen.forEach((item1, idx1) => {
                    if ((!(item1.includes("_Off:"))) || (!(item1.includes("_shiftReq:")))) {
                        if (item1 !== 'x') {
                            if (item1.split('.')[1] == element.split('.')[1] &&
                                item1.split('.')[0] == element.split('.')[0]) {
                                if (count1 > 8) {
                                    item.dosen[idx1] = 'x';
                                } else {
                                    count1 += 1;
                                    if (count1 > 8) {
                                        item.dosen[idx1] = 'x';
                                    }
                                }
                            }
                        }
                    }
                });

            });

        }
    });


    let resultScheduleShift = [];
    arrDosenID.forEach((element, indexx) => {
        let oldItemCheck1 = 'anruc';
        if (element.split('.')[1] != oldItemCheck1) {
            oldItemCheck1 = element.split('.')[1];

            combinedSchedule.forEach((item, idx) => {
                item.dosen.forEach((item1, idx1) => {
                    if (item1.includes("_shiftReq:")) {
                        if (item1.split(`_shiftReq:`)[1] == element.split('.')[1]) {
                            resultScheduleShift.push(item);
                        }
                    }
                });

                if (item.dosen.includes(element)) {
                    resultScheduleShift.push(item);
                }

            });
        }
    });

    const allDateCandidate = resultScheduleShift.map(o => o.date);
    const removeDuplicateDate = resultScheduleShift.filter(({
        date
    }, index) => !allDateCandidate.includes(date, index + 1));

    arrDosenID.forEach((element, indexx) => {
        let oldItemCheck2 = 'anruc';
        if (element.split('.')[1] != oldItemCheck2) {
            oldItemCheck2 = element.split('.')[1];
            removeDuplicateDate.forEach((el, inx) => {
                el.dosen.forEach((el1, inx1) => {
                    if (el1.includes("_shiftReq:")) {
                        if (el1.split(`_shiftReq:`)[1] == element.split('.')[1]) {
                            // jadwal shift bisa, jika dosennya tersedia pada kandidat kombinasi
                            el.shift_req.forEach((el2, inx2) => {
                                let tag = el2.split(`:shiftReq`)[1].split(`__`)[0].split(`#`);
                                console.log(tag);
                                if (tag[0] == inx1) {
                                    let tmpOld = el.dosen[tag[1]];
                                    el.dosen[tag[1]] = `${el1.split(`_shiftReq:`)[0].split('.')[0]}.${el1.split(`_shiftReq:`)[1]}`;
                                    el.dosen[inx1] = tmpOld;
                                }
                            });
                        }
                    }

                    if (el1.includes("_Off:")) {
                        el.dosen[inx1] = 'x';
                    }
                });
            });
        }
    });

    return removeDuplicateDate;
}

const createNewOneSchedule = (notSundayShift, sundayShift, arrDosenID) => {

    const combinedSchedule = [...notSundayShift, ...sundayShift];

    combinedSchedule.sort(function (a, b) {
        return new Date(fDateMMDDYY(a.date.split(" ")[1])) - new Date(fDateMMDDYY(b.date.split(" ")[1]));
    });


    let resultData = bestFinalResult(combinedSchedule, arrDosenID);


    return resultData;
}


const createNewLatestSchedule = (notSundayShift, sundayShift, arrDosenID, oldDataSchedule, Id_room) => {

    const combinedSchedule = [...notSundayShift, ...sundayShift];

    let newFormat = [];
    oldDataSchedule.forEach((element, idx) => {
        const itemExists = newFormat.some(item =>
            (item.identifier.split("_")[0] == element.tanggal_i &&
                item.identifier.split("_")[1].split("#")[0] == element.Id_room &&
                item.identifier.split("_")[1].split("#")[1] == element.semester)
        );

        const index = newFormat.findIndex(ai =>
            (ai.identifier.split("_")[0] == element.tanggal_i &&
                ai.identifier.split("_")[1].split("#")[0] == element.Id_room &&
                ai.identifier.split("_")[1].split("#")[1] == element.semester)
        );

        if (itemExists) {
            newFormat[index].isTime.push({
                shift: element.shift,
                Id_praktikum: element.Id_praktikum,
                Id_dosen: element.Id_dosen,
            });
        } else {
            newFormat.push({
                identifier: `${element.tanggal_i}_${element.Id_room}#${element.semester}`,
                tanggal_i: `${element.tanggal_i}`,
                tanggal: element.tanggal,
                Id_room: element.Id_room,
                isTime: [{
                    shift: element.shift,
                    Id_praktikum: element.Id_praktikum,
                    Id_dosen: element.Id_dosen,
                }],
            });
        }
    });

    combinedSchedule.sort(function (a, b) {
        return new Date(fDateMMDDYY(a.date.split(" ")[1])) - new Date(fDateMMDDYY(b.date.split(" ")[1]));
    });

    newFormat.sort(function (a, b) {
        return new Date(fDateMMDDYY(a.tanggal_i.split(" ")[1])) - new Date(fDateMMDDYY(b.tanggal_i.split(" ")[1]));
    });

    combinedSchedule.forEach((item, idx) => {
        item.dosen.forEach((item1, idx1) => {

            newFormat.forEach((element, indexx) => {
                element.isTime.forEach((element1, indexx1) => {

                    let dateCandidate = item.date.split(" ")[1];
                    let oldDateData = element.tanggal_i.split(" ")[1];
                    let checTheDate = checkEqualsDate(oldDateData, dateCandidate);
                    if (Id_room == element.Id_room) {
                        // jika jadwal dibuat pada ruangan yang sama

                        if (checTheDate) {
                            if ((element1.Id_praktikum != 0) && (idx1 === indexx1)) {
                                item.dosen[idx1] = 'x';
                            }
                        }
                    } else {
                        // jika jadwal dibuat pada ruangan yang berbeda

                        if (checTheDate) {
                            if ((item1.split(".")[1] == element1.Id_dosen) && (idx1 === indexx1)) {
                                item.dosen[idx1] = 'x';
                            }

                            if (item1.includes(`_shiftReq:`)) {
                                if (item1.split(`_shiftReq:`)[1] == element1.Id_dosen) {
                                    item.dosen[idx1] = 'x';
                                }
                            }
                        }
                    }

                });
            });

        });
    });

    let resultData = bestFinalResult(combinedSchedule, arrDosenID);

    console.log(oldDataSchedule);
    console.log(newFormat);
    console.log(combinedSchedule);
    console.log(resultData);

    return resultData;

}