/* TODO
Find the first non-repeated character in a String
Reverse a String iteratively and recursively
Determine if 2 Strings are anagrams
Check if String is a palindrome
Check if a String is composed of all unique characters
Determine if a String is an int or a double
HARD: Find the shortest palindrome in a String
HARD: Print all permutations of a String

*/

module.exports = function() {
    var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc odio leo, malesuada sagittis finibus suscipit, volutpat vitae urna. Sed et pretium turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id ante tempor, sagittis eros congue, tincidunt dui. Donec auctor et sem quis volutpat. Fusce mollis lacus in ullamcorper consectetur. Sed ac ligula in massa posuere tristique eu quis quam. Maecenas sagittis libero odio, a facilisis mi eleifend at. Nunc nec laoreet arcu, vel ullamcorper dolor. Duis bibendum mi ac quam pulvinar congue. Donec arcu ipsum, aliquam sed gravida et, dictum gravida sem. Nam eu semper nunc. Integer a diam non orci tristique consequat ultricies at sem.";
    var text = justify(lorem, 80);
    console.log(text);
    console.log("All String Tests passed")
}

// HARD: Given a single-line text String and a maximum width value, write the function 'String justify(String text, int maxWidth)' that formats the input text using full-justification, i.e., extra spaces on each line are equally distributed between the words; the first word on each line is flushed left and the last word on each line is flushed right
function justify(text, maxWidth){
    var words = text.split(" "); // Assumes that words are only split by spaces
    var final = [Array(maxWidth+1).join("*")]
    while(words.length > 0){
        var working = {
            width: -1, // Account for the lack of first space
            words: []
        };
        while(words.length > 0 && working.width + words[0].length + 1 < maxWidth){
            var word = words.shift();
            working.words.push(word);
            working.width += word.length + 1; // Account for space
        }
        var extraSpace = maxWidth - working.width;
        var spacesPerWord = (extraSpace / (working.words.length - 1)) + 1;
        var line = working.words.shift();
        for(var i = 0; i < working.words.length; i++){
            line = line + Array(Math.floor((i+1)*spacesPerWord) - Math.floor(i * spacesPerWord) + 1).join(" ") + working.words[i];
        }
        final.push(line);
    }
    return final.join("\n");
}
