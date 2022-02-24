const getAllDaysInMonth = (month, year) =>
    Array.from({
            length: new Date(year, month, 0).getDate() - 1
        },
        (_, i) => new Date(year, month, i + 1)
    );

const areMonth = getAllDaysInMonth(10, 2021).map(x => x.toLocaleString('id', {
    weekday: 'long', // long, short, narrow
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'numeric', // numeric, 2-digit, long, short, narrow
}));
console.log(areMonth.length);
console.log(areMonth);

count = 0;
let monthHasSundday = [];
let monthHasNotSundday = [];
areMonth.forEach(item => {
    if (item.includes("Minggu")) {
        count++;
        monthHasSundday.push(item);
    } else {
        monthHasNotSundday.push(item);
    }
});
console.log(count);
console.log('\n');
console.log('\n');
console.log(monthHasSundday);
console.log(monthHasNotSundday);
















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

console.log(tmpMissedMonth)


// let arr = ["a", "b", "c"];
let arr = ["a", "b", "c", "d", "e", "f", "g", "h"];

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




// let arr = ["a", "b", "c"];
// let arr = ["a", "b", "c", "d", "e", "f", "g", "h"];

let arr = ["a", "b", "c", "d", "e"];

// 3 kombinasi
let arr3Combination = [];
let tmp1 = ``;
let flag = false;
arr.forEach((item, idx) => {
    arr.forEach((item1, idx1) => {
        if (item != item1) {
            if (tmp1.length == 2) {
                tmp1 += `${item1}`;
            } else {
                tmp1 += `${item1},`;
            }

        }

        if (tmp1.length == 3) {
            tmp1 = `${item},${tmp1}`;
            arr3Combination.push(tmp1);
            tmp1 = '';
        }

    });
});
console.log(arr3Combination);


//  if (idx1 == arr.length - 1) {
//                 tmp1 += `${item1}`;
//             } else {
//                 tmp1 += `${item1},`;
//                 if (tmp1.length == 3) {
//                   flag = true; 
//                 }
//             } 


















// TODO!!! FOR PERMUTATION
let arr = [];

function printPermutations(array, k) {
    var combinations = [];
    var indices = [];


    function run(level, start) {

        for (var i = 0; i < array.length; i++) {

            if (!indices[i]) {

                indices[i] = true;

                combinations[level] = array[i];

                if (level < k - 1) {
                    run(level + 1, i + 1);
                } else {
                    // console.log(combinations.join(" "));
                    arr.push(combinations.join(" "));
                }

                indices[i] = false;
            }
        }

    }


    run(0, 0);
}


printPermutations([1, 2, 3, 4], 3);

console.log(arr);

// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sets/permutations
// https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sets/permutations/permutateWithoutRepetitions.
// https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sets/permutations/permutateWithRepetitions.js
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sets/combinations
// https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sets/combinations/combineWithoutRepetitions.js
// https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/sets/combinations/combineWithRepetitions.



/**
 * @param {*[]} permutationOptions
 * @param {number} permutationLength
 * @return {*[]}
 */


function permutateWithRepetitions(
    permutationOptions,
    permutationLength = permutationOptions.length,
) {
    if (permutationLength === 1) {
        return permutationOptions.map((permutationOption) => [permutationOption]);
    }

    // Init permutations array.
    const permutations = [];

    // Get smaller permutations.
    const smallerPermutations = permutateWithRepetitions(
        permutationOptions,
        permutationLength - 1,
    );

    // Go through all options and join it to the smaller permutations.
    permutationOptions.forEach((currentOption) => {
        smallerPermutations.forEach((smallerPermutation) => {
            permutations.push([currentOption].concat(smallerPermutation));
        });
    });

    return permutations;
}

// let arr = ["a", "b", "c", "d", "e"];
let arr = [1, 2, 3, 4];

console.log(permutateWithRepetitions(arr, 3));






function formatDate(input) {
    var datePart = input.match(/\d+/g),
        year = datePart[0].substring(0), // get only two digits
        month = datePart[1],
        day = datePart[2];

    return day + '/' + month + '/' + year;
}

let syl1 = formatDate("2021-09-19");

console.log(syl1);

var datearray = syl1.split("/");

var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
console.log(newdate)






var Date_1 = "11/8/2021";
var Date_2 = "11/13/2021";
var Date_to_check = "11/10/2021";

function gfg_Run() {
    D_1 = Date_1.split("/");
    D_2 = Date_2.split("/");
    D_3 = Date_to_check.split("/");

    var d1 = new Date(D_1[2], parseInt(D_1[1]) - 1, D_1[0]);
    var d2 = new Date(D_2[2], parseInt(D_2[1]) - 1, D_2[0]);
    var d3 = new Date(D_3[2], parseInt(D_3[1]) - 1, D_3[0]);

    if (d3 > d1 && d3 < d2) {
        console.log("Date is in between the " + "Date 1 and Date 2");
    } else {
        console.log("Date is not in between " + "the Date 1 and Date 2");
    }
}

gfg_Run()