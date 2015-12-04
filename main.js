var general = require("./general");
var strings = require("./strings");
var sorting = require("./sorting");
var trees = require("./trees");
var stackQueueHeap = require("./sqhdata");
var linkedlist = require("./linkedlist");

function testSuite() {
    general();
    strings();
    sorting();
    trees();
    stackQueueHeap();
    linkedlist();
    console.log("All tests passed");
}

testSuite();
