/* TODO
Implement binary search of a sorted array of integers
Implement binary search in a rotated array (ex. {5,6,7,8,1,2,3})
Use dynamic programming to find the first X prime numbers
Write a function that prints out the binary form of an int
Implement parseInt
Implement squareroot function
Implement an exponent function (bonus: now try in log(n) time)
Write a multiply function that multiples 2 integers without using *
HARD: Given a function rand5() that returns a random int between 0 and 5, implement rand7()
HARD: Given a 2D array of 1s and 0s, count the number of "islands of 1s" (e.g. groups of connecting 1s)
*/

var assert = require("assert")

module.exports = function (){
    mostFrequentTest();
    pairTenTest();
    isRotationTest();
    fibTest();
    findUniqueTest();

    console.log("All general tests passed");
}

// Find the most frequent integer in an array
// Dirty first round
function mostFrequent(intArray) {
    var counts = {};
    var vals = [];
    intArray.forEach(function(val){
        if(counts[val]){
            counts[val]++;
        }
        else {
            counts[val] = 1;
            vals.push(val);
        }
    });

    return vals.reduce(function(highest, val){
        return highest[1] >= counts[val] ? highest : [val, counts[val]];
    }, [undefined, 0])[0]
}

function mostFrequentTest() {
    // Most frequent expected = 3
    var arr = [1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 1, 2, 3, 11];
    assert(mostFrequent(arr) === 3);
    assert(mostFrequent(arr.slice(1, 4)) === 2);

    console.log("mostFrequent tests passed");
}

// Find pairs in an integer array whose sum is equal to 10 (bonus: do it in linear time)
function pairTen(intArray){
    var hashTable = {};
    // Looks for hash collisions, if a collision exists, then the pair exists.
    // The output are the two values in the array which add to 10.  The first
    // is the first to appear in the array
    for(var i = 0; i < intArray.length; i++){
        var val = intArray[i];
        if(hashTable[val]){
            return [10-val, val];
        }
        hashTable[10-val] = true;
    }
    return false; // None found
}

function pairTenTest() {
    var arr = [0, 0, 0];
    var arr2 = [0, 1, 2, 3, 4, 5, 6];
    var arr3 = [-1, 2, 3, 4, 10, 12, 2, 2, 3];
    var arr4 = [10]; // Should fail because it's not a pair
    var arr5 = [10, 0];

    assert(pairTen(arr) === false);
    assert(pairTen(arr2)[0] === 4);
    assert(pairTen(arr3) === false);
    assert(pairTen(arr4) === false);
    assert(pairTen(arr5)[0] === 10);

    console.log("pairTen tests passed");
};

// Given 2 integer arrays, determine of the 2nd array is a rotated version of the 1st array. Ex. Original Array A={1,2,3,5,6,7,8} Rotated Array B={5,6,7,8,1,2,3}
function isRotation(arr1, arr2) {
    var len = arr1.length;
    if(len - arr2.length !== 0){
        return false;
    }
    if(len === 0){
        return true;
    }
    var doubleArray = arr1.concat(arr1);

    var isRotate = false;

    for(var i = 0; i < len; i++){
        var rotation = doubleArray.slice(i, i+len);
        isRotate = isRotate || rotation.reduce(function(acc, val, idx){
            return acc && (val === arr2[idx]);
        }, true);
    }

    return isRotate;
};

function isRotationTest() {
    var arr1 = [0];
    var arr2 = [1];
    var arr3 = [0];
    var arr4 = [0, 1];
    var arr5 = [1, 0];
    var arr6 = [0, 0];
    var arr7 = [1, 0, 1];

    var arr8 = [1, 2, 3, 4, 5, 6, 7, 8];
    var arr9 = [6, 7, 8, 1, 2, 3, 4, 5];
    var arr10 =[9, 1, 2, 3, 4, 5, 6, 7];


    assert(isRotation(arr1, arr2) === false);
    assert(isRotation(arr1, arr3) === true);
    assert(isRotation(arr1, arr4) === false);
    assert(isRotation(arr4, arr1) === false);
    assert(isRotation(arr4, arr5) === true);
    assert(isRotation(arr5, arr7) === false);
    assert(isRotation(arr4, arr6) === false);
    assert(isRotation(arr8, arr9) === true);
    assert(isRotation(arr8, arr10) === false);

    console.log("isRotation test passed");
}

// Write fibbonaci iteratively and recursively (bonus: use dynamic programming)
function fibIterative(num) {
    // Assumes: [1, 1, 2, 3, 5, ...]
    // Anything less than 2 returns 1
    var a = 0;
    var b = 1;
    for(var i = 0; i < num; i++){
        var t = a + b;
        a = b;
        b = t;
    }
    return b;
}

function fibRecursive(num) {
    if(num <= 1) {
        return 1;
    }
    return fibRecursive(num-1) + fibRecursive(num - 2);
}

_fibDynamicMemory = [1, 1];
function fibDynamic(num) {
    if(_fibDynamicMemory.length > num){
        return _fibDynamicMemory[num];
    }

    _fibDynamicMemory.push(fibDynamic(num-1) + fibDynamic(num-2))
    return _fibDynamicMemory[num];
}

function fibTest() {
    assert(fibIterative(0) === 1);
    assert(fibIterative(1) === 1);
    assert(fibIterative(2) === 2);
    assert(fibIterative(3) === 3);
    assert(fibIterative(4) === 5);
    assert(fibIterative(5) === 8);

    console.log("fibIterative passed");

    assert(fibRecursive(0) === 1);
    assert(fibRecursive(1) === 1);
    assert(fibRecursive(2) === 2);
    assert(fibRecursive(3) === 3);
    assert(fibRecursive(4) === 5);
    assert(fibRecursive(5) === 8);
    console.log("fibRecursive passed");

    assert(fibDynamic(0) === 1);
    assert(fibDynamic(1) === 1);
    assert(fibDynamic(2) === 2);
    assert(fibDynamic(10) === 89);
    assert(fibDynamic(3) === 3);
    assert(fibDynamic(5) === 8);
    console.log("fibDynamic passed");
}

// Find the only element in an array that only occurs once.
function findUnique(arr) {
    var unique = [];
    var multi = [];

    for(var i = 0; i < arr.length; i++){
        var val = arr[i];
        if(multi.indexOf(val) >= 0){
            continue;
        }
        var idx = unique.indexOf(val);
        if(idx >= 0){
            multi.push(val);
            unique.splice(idx, 1); // Moves unique to found multiple of
            continue;
        }
        unique.push(val);
    }

    if(unique.length !== 1){
        return false;
    }

    return unique[0];
}

function findUniqueTest() {
    var arr0 = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5]; //5
    var arr1 = [2]; //2
    var arr2 = [1, 2, 2, 1, 2, 2, 3, 4, 4, 5, 5, 2, 6, 6] //3
    var arrX = [1, 1, 2, 2] // No unique values

    assert(findUnique(arr0) === 5);
    assert(findUnique(arr1) === 2);
    assert(findUnique(arr2) === 3);
    assert(findUnique(arrX) === false);

    console.log("findUnique passed");
}

// Find the common elements of 2 int arrays
function findCommon(arr1, arr2){

}

function findCommonTest() {
    var arr0 = [0];
    var arr1 = [1];
    var arr2 = [0, 1, 2];
    var arr3 = [2, 3, 4];
}
