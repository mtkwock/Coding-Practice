
# Node of a generic binary tree
# Extend later to create other tree types like heaps, BST, etc.
class BinaryNode():
    left = None
    right = None
    parent = None
    side = None
    def __init__(self, data):
        self.data = data

    def get(self):
        return self.data

    # Sets parent and tells what side it's on
    def setParent(self, parent, side):
        self.parent = parent
        self.side = side
        if parent:
            if side is "left":
                parent.left = self
            if side is "right":
                parent.right = self

    def getParent(self):
        return self.parent

    def getSide(self):
        return self.side

    def setLeft(self, node):
        self.left = node
        if node and node is not self:
            node.setParent(self, "left")

    def getLeft(self):
        return self.left

    def setRight(self, node):
        self.right = node
        if node and node is not self:
            node.setParent(self, "right")

    def setChild(self, node, side):
        if side is "left":
            self.setLeft(node)
        elif side is "right":
            self.setRight(node)

    def getRight(self):
        return self.right

    # Generic insert function that prioritizes left.
    # Returns True on success, False on failure
    # Overwrite to allow for more meaningful trees
    def insert(self, node):
        if not self.getLeft():
            self.setLeft(node)
            return True
        if not self.right:
            self.setRight(node)
            return True
        return False

    def isConnected(self, node):
        return self.getParent() is node or node.getParent() is self

    # Switches references from parents and children of this node and another node
    def switch(self, node):
        if not self.isConnected(node):
            tempParent = self.getParent()
            tempLeft = self.getLeft()
            tempRight = self.getRight()
            tempSide = self.getSide()

            self.setLeft(node.getLeft())
            self.setRight(node.getRight())
            self.setParent(node.getParent(), node.getSide())

            node.setLeft(tempLeft)
            node.setRight(tempRight)
            node.setParent(tempParent, tempSide)

        else:
            self.switchImmediate(node)

    def switchImmediate(self, node):
        selfParent = self.getParent()
        nodeParent = node.getParent()

        selfLeft = self.getLeft()
        nodeLeft = node.getLeft()

        selfRight = self.getRight()
        nodeRight = node.getRight()

        selfSide = self.getSide()
        nodeSide = node.getSide()

        # Reference modifications because they are connected
        if selfParent is node:
            selfParent = self
            nodeLeft = nodeLeft if nodeLeft is not self else node
            nodeRight = nodeRight if nodeRight is not self else node
        elif nodeParent is self:
            nodeParent = node
            selfLeft = selfLeft if selfLeft is not node else self
            selfRight = selfRight if selfRight is not node else self
        else:
            print "How'd we get here?!"
            return

        self.setParent(nodeParent, nodeSide)
        node.setParent(selfParent, selfSide)

        self.setLeft(nodeLeft)
        node.setLeft(selfLeft)

        self.setRight(nodeRight)
        node.setRight(selfRight)


    def inorder(self):
        return self._inorder()[:-2]

    def _inorder(self):
        leftString = self.left._inorder() if self.left else ""
        rightString = self.right._inorder() if self.right else ""
        return leftString + str(self.get()) + ", " + rightString

    def preorder(self):
        queue = [self]
        output = ""

        while queue:
            node = queue[0]
            queue = queue[1:]
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

            output = output + str(node.get()) + ", "

        return output[0:-2]


class BinarySortNode(BinaryNode):
    # Binary Sort Node find method.  O(logn) time
    def find(self, data):
        if self.get() is data:
            return self
        if self.get() < data and self.right:
            return self.right.find(data)
        if self.get() > data and self.left:
            return self.left.find(data)
        return None # No match found

    def findMin(self):
        if self.left:
            return self.left.findMin()
        return self

    def findMax(self):
        if self.right:
            return self.right.findMax()
        return self

    def insert(self, data):
        if type(data) is not type(self):
            data = BinarySortNode(data)
        if data.get() is self.get():
            return False

        if data.get() > self.get():
            if self.right:
                return self.right.insert(data)
            self.setRight(data)
            return True

        if data.get() < self.get():
            if self.left:
                return self.left.insert(data)
            self.setLeft(data)
            return True

        return "Why am I here?"

    # Finds node.  If found, removes references and returns the node
    # returns false if not found
    def delete(self, data):
        node = self.find(data)
        if node:
            if node.left and node.right:
                node.switch(node.right.findMin())
                node.parent.setChild(None, node.side)
                # TODO: remove references to node from the new parent
            elif node.left:
                node.parent.setChild(node.left, node.side)
            elif node.right:
                node.parent.setChild(node.right, node.side)
            else:
                node.parent.setChild(None, node.side)
            return node
        return False


def test1():
    n1 = BinaryNode(1)
    n2 = BinaryNode(2)
    n3 = BinaryNode(3)
    n4 = BinaryNode(4)
    n5 = BinaryNode(5)
    n6 = BinaryNode(6)
    n7 = BinaryNode(7)

    n1.setLeft(n2)
    n1.setRight(n3)
    n2.setLeft(n4)
    n2.setRight(n5)
    n3.setLeft(n6)
    n3.setRight(n7)

    n6.switch(n3)
    print n1.preorder()

def test2():
    root = BinarySortNode(4)
    root.insert(2)
    root.insert(6)
    root.insert(1)
    root.insert(3)
    root.insert(5)
    root.insert(7)
    root.delete(7)
    print "preorder: ", root.preorder()
    print "inorder:  ", root.inorder()

test2()