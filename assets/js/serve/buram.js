// TODO!! ini untuk generate Bulan, dan Nama Hari
// function getDaysInMonthUTC(month, year) {
//   var date = new Date(Date.UTC(year, month, 1));
//   var days = [];
//   while (date.getUTCMonth() === month) {
//     days.push(new Date(date));
//     date.setUTCDate(date.getUTCDate() + 1);
//   }
//   return days;
// }

// console.log(getDaysInMonthUTC(11, 2021));

// const getDaysInMonth = (month, year) => (new Array(31)).fill('').map((v,i)=>new Date(year,month-1,i+1)).filter(v=>v.getMonth()===month-1);
// console.log(getDaysInMonth(11, 2021));


const getAllDaysInMonth = (month, year) =>
    Array.from({
            length: new Date(year, month, 0).getDate() - 1
        },
        (_, i) => new Date(year, month, i + 1)
    );
// id for indonesian
const example = getAllDaysInMonth(10, 2021).map(x => x.toLocaleString('en-US', {
    weekday: 'short', // long, short, narrow
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'numeric', // numeric, 2-digit, long, short, narrow
    // hour: 'numeric', // numeric, 2-digit
    // minute: 'numeric', // numeric, 2-digit
    // second: 'numeric', // numeric, 2-digit
}))
console.log(example)

// console.log(date.toLocaleString('en-US', {
//     weekday: 'short', // long, short, narrow
//     day: 'numeric', // numeric, 2-digit
//     year: 'numeric', // numeric, 2-digit
//     month: 'long', // numeric, 2-digit, long, short, narrow
//     hour: 'numeric', // numeric, 2-digit
//     minute: 'numeric', // numeric, 2-digit
//     second: 'numeric', // numeric, 2-digit
// }));


// TODO!!! ini untuk mendapatkan nama bulan aktif dan belum terlewatin
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var date = new Date();

let currentMonthYear = months[date.getMonth()] + '-' + date.getFullYear();
let itsMonth = currentMonthYear.split("-")[0];
console.log(itsMonth);

let areIndex = monthNames.indexOf(itsMonth);
console.log(areIndex)

let tmpMissedMonth = [];

monthNames.forEach((item, idx) => {
    if (idx > areIndex) {
        tmpMissedMonth.push(item);
    }
});

console.log(tmpMissedMonth);





// TODO!!! untuk Algoritma Kombinasi
let arr = ["a", "b", "c"];

// 2 kombinasi
let arr2Combination = [];
let tmp = ``;
arr.forEach((item, idx) => {
    arr.forEach((item1, idx1) => {
        if (item != item1) {
            tmp += `${item},${item1}`;
            arr2Combination.push(tmp);
        }
        tmp = '';
    });
});

console.log(arr2Combination);


// 3 kombinasi
let arr3Combination = [];
let tmp1 = ``;
arr.forEach((item, idx) => {
    arr.forEach((item1, idx1) => {
        if (item != item1) {
            if (idx1 == arr.length - 1) {
                tmp1 += `${item1}`;
            } else {
                tmp1 += `${item1},`;
            }
        }
    });
    tmp1 = `${item},${tmp1}`;
    arr3Combination.push(tmp1);
    tmp1 = '';
});
console.log(arr3Combination);





















// TODO!!! ini dipakai



// TODO!!! =================== sebelumnya harus uji kelayakan dulu ===================













// let tmpExtendedSundayShift = [];

// arrCandidat1.forEach(element => {
//     element.forEach(item => {
//         if (item != '_') {
//             tmpExtendedSundayShift.push(item);
//         }
//     });
// });
// console.log(tmpExtendedSundayShift);


// let forSundayShift = [];
// let tmpSundayShift = [];
// tmpExtendedSundayShift.forEach(element => {
//     tmpSundayShift.push(element);
//     if (tmpSundayShift.length == 3) {
//         forSundayShift.push(tmpSundayShift);
//         tmpSundayShift = [];
//     }
// });
// console.log(forSundayShift);

// ["Not Verified", "Not Verified", "Not Verified"].every(function (value) {
//     return value === "Not Verified"
// }); // true
// ["Verified", "Verified", "Verified"].every(function (value) {
//     return value === "Not Verified"
// }); // false
// ["Not Verified", "Verified"].every(function (value) {
//     return value === "Not Verified"
// }); // false











// GET RANDOMM
// const arr = [2, 5, 4, 45, 32, 46, 78, 87, 98, 56, 23, 12];
// const chooseRandom = (arr, num = 1) => {
//    const res = [];
//    for (let i = 0; i < num;) {
//       const random = Math.floor(Math.random() * arr.length);
//       if (res.indexOf(arr[random]) !== -1) {
//          continue;
//       };
//       res.push(arr[random]);
//       i++;
//    };
//    return res;
// };
// console.log(chooseRandom(arr, 6));



// GE COUNT EVERY
// const countEveryItem = (itemCheck, resultNotSundayShift, combained) => {
//     console.log(itemCheck)
//     resultNotSundayShift.forEach((el, idx) => {
//         el.dosen.forEach((el1, idx1) => {
//             if ((el1.includes("_shiftReq:") == false) || (el1.includes("_Off:") == false)) {
//                 if (el1.split('.')[1] == itemCheck) {
//                     combained.count1 += 1;
//                 }
//             } else {
//                 if (el1.includes("_shiftReq:")) {
//                     console.log(el1.includes("_shiftReq:"));
//                     console.log(`${el1.split(`_shiftReq:`)[1]} === ${itemCheck}`);
//                     if (el1.split(`_shiftReq:`)[1] == itemCheck) {
//                         combained.count2 += 1;
//                         combained.arr_shiftReq.push(`${itemCheck}_shiftReq`);
//                     }
//                 }
//                 if (el1.includes("_Off:")) {
//                     if (el1.split(`_Off:`)[1] == itemCheck) {
//                         combained.count3 += 1;
//                         combained.arr_dOff.push(`${itemCheck}_dOff`);
//                     }
//                 }
//             }
//         });
//     });

//     return {
//         notBoth: {
//             count: combained.count1,
//         },
//         dOff: {
//             count: combained.count3,
//             arr: combained.arr_dOff,
//         },
//         shiftReq: {
//             count: combained.count2,
//             arr: combained.arr_shiftReq,
//         },

//     };
// }
// TODO!! SOLVE THIS
// Do you really want to execute "ALTER TABLE `tb_schedul` ADD INDEX(`Id_doctor`);"?