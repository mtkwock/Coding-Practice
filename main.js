// Programming problems found:
// https://www.reddit.com/r/cscareerquestions/comments/20ahfq/heres_a_pretty_big_list_of_programming_interview/

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
