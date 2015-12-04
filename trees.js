/* TODO
Write a function that determines if a tree is a BST
Find the smallest element in a BST
Find the 2nd largest number in a BST
Given a binary tree which is a sum tree (child nodes add to parent), write an algorithm to determine whether the tree is a valid sum tree
Find the distance between 2 nodes in a BST and a normal binary tree
Print the coordinates of every node in a binary tree, where root is 0,0
Print a tree by levels
Given a binary tree which is a sum tree, write an algorithm to determine whether the tree is a valid sum tree
Given a tree, verify that it contains a subtree.
HARD: Find the max distance between 2 nodes in a BST.
HARD: Construct a BST given the pre-order and in-order traversal Strings
*/

module.exports = function() {
    testBST();
    console.log("All Tree Tests passed")
};

// Implement a BST with insert and delete functions
var BSTnode = function(data, parent, side){
    this.data = data;
    this.parent = parent || null;
    this.side = side || "root";
    this.left = null; // Another node, explicitly <= to this
    this.right = null; // Another node, explicitly >= to this
    return this;
}

BSTnode.prototype = {
    getVal: function(data){ // Can be overwritten to allow for other data types
        return data;
    },
    val: function(){
        return this.getVal(this.data);
    },
    find: function(val) {
        var nodeVal = this.val();
        if(val === nodeVal){
            return this;
        }
        if(val < nodeVal){
            if(this.left){
                return this.left.find(val);
            }
            return false;
        }
        if(val > nodeVal) {
            if(this.right) {
                return this.right.find(val);
            }
            return false;
        }
        console.log("How did we get here?");
        return false;
    },
    min: function(){
        if(this.left){
            return this.left.min();
        }
        return this;
    },
    max: function(){
        if(this.right){
            return this.right.max();
        }
        return this;
    },
    insert: function(data) {
        var insertVal = this.getVal(data);
        var nodeVal = this.val();
        if(insertVal === nodeVal){
            return false; // Already found
        }
        if(insertVal < nodeVal){
            if(this.left){
                return this.left.insert(data);
            }
            this.left = new BSTnode(data, this, "left");
            return this.left;
        }
        if(insertVal > nodeVal) {
            if(this.right) {
                return this.right.insert(data);
            }
            this.right = new BSTnode(data, this, "right");
            return this.right;
        }
    },
    delete: function(data) {
        var node = this.find(data);
        if(!node){
            return false;
        }
        if(this === node){ // Handles root case
            if(!this.left && !this.right){
                this.data = undefined;
                return "No Children";
            }
            if(this.left && this.right){
                var min = this.right.min();
                min.parent[min.side] = min.right; // Disconnect min and connect min's right branch
                if(min.right){
                    min.right.side = min.side;
                    min.right.parent = min.parent;
                }
                this.data = min.data;
                return "Two children";
            }
            if(this.left) {
                this.data = this.left.data;
                this.right = this.left.right;
                this.left = this.left.left;
                if(this.left){
                    this.left.side = "left";
                }
                if(this.right){
                    this.right.side = "right";
                }
                return "Left child";
            }
            if(this.right) {
                this.data = this.right.data;
                this.left = this.right.left;
                this.right = this.right.right;
                if(this.left){
                    this.left.side = "left";
                }
                if(this.right){
                    this.right.side = "right";
                }
                return "Right child";
            }
            return "How did I get here?!";
        }
        if(!node.left && !node.right){
            node.parent[node.side] = null;
            return "No Children";
        }
        if(node.left && node.right){
            var min = node.right.min();
            node.parent[node.side] = min;
            min.parent[min.side] = min.right; // Clear reference to minimum
            if(min.right){
                min.right.side = min.side;
                min.right.parent = min.parent;
            }
            min.parent = node.parent; // Give minimum parent reference
            min.left = node.left; // Give minimum child left reference
            min.right = node.right // Give minimum child right reference
            return "Two children";
        }
        if(node.left) {
            node.parent[node.side] = node.left;
            node.left.parent = node.parent;
            node.left.side = node.side;
            return "Left child";
        }
        if(node.right) {
            // console.log(node);
            node.right.side = node.side;
            node.right.parent = node.parent;
            node.parent[node.side] = node.right;
            return "Right child";
        }
        return "How did I get here?!";
    },
    // Print a tree using BFS and DFS
    printBreadth: function() {
        var str = this._printBreadth([this]);
        return str.slice(0, str.length - 2);
    },
    _printBreadth: function(queue){
        if(queue.length === 0){ return ""; }
        var node = queue.shift();
        if(node.left){
            queue.push(node.left);
        }
        if(node.right){
            queue.push(node.right);
        }
        return node.data + ", " + this._printBreadth(queue);
    },
    // Prints from least to greatest
    printDepth: function() {
        var str = this.data;
        if(this.left){
            str = this.left.printDepth() + ", " + str;
        }
        if(this.right) {
            str = str + ", " + this.right.printDepth();
        }
        return str;
    }
}

function testBST() {
    var root = new BSTnode(5);
    root.insert(2);
    root.insert(7);
    root.insert(10);
    root.insert(8);
    root.insert(11);
    root.insert(3);
    /*
              5
           2      7
             3       10
                  8     11
    */
    console.log(root.printBreadth());
    console.log(root.printDepth());
    // console.log(root.delete(2));
    // console.log(root.delete(3));
    console.log(root.delete(5));
    console.log(root.delete(7));
    console.log(root.delete(8));
    console.log(root.delete(11));
    console.log(root.printBreadth());
    console.log(root.printDepth());
}
