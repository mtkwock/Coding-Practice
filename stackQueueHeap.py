# Write a function that sorts a stack (bonus: sort the stack in place without extra memory)
# Implement a binary min heap. Turn it into a binary max heap

# Implement a stack with push and pop functions
class Stack(object):
    def __init__(self):
        self._vals = []

    def push(self, val):
        self._vals.append(val)

    def pop(self):
        if self._vals:
            el = self._vals[-1]
            self._vals = self._vals[:-1]
            return el
        return False #None left

    def get(self):
        return self._vals

# Implement a queue with queue and dequeue functions
class Queue(object):
    def __init__(self):
        self._vals = []

    def queue(self, val):
        self._vals.append(val)

    def dequeue(self):
        el = self._vals[0]
        self._vals = self._vals[1:]
        return el

    def get(self):
        return self._vals

# Find the minimum element in a stack in O(1) time
class StackMin(Stack):
    def __init__(self):
        super(StackMin, self).__init__()
        self._mins = []

    def push(self, val):
        super(StackMin, self).push(val)
        low = val
        if self._mins and self._mins[-1] < low:
            low = self._mins[-1]
        self._mins.append(low)

    def pop(self, val):
        self._mins = self._mins[:-1]
        return super(StackMin, self).pop()

    def getMins(self):
        return self._mins

    def getMin(self):
        return self._mins[-1]

# HARD: Implement a queue using 2 stacks
class QueueFromStacks():
    def __init__(self):
        self._outStack = Stack()
        self._inStack = Stack()

    def queue(self, val):
        self._inStack.push(val)

    def dequeue(self):
        val = self._outStack.pop()
        if val:
            return val
        el = self._inStack.pop()
        while el:
            self._outStack.push(el)
            el = self._inStack.pop()

        return self._outStack.pop()

    def get(self):
        return [self._inStack.get(), self._outStack.get()]

def test1():
    stack = Stack()
    stack.push(0)
    stack.push(1)
    stack.push(2)
    stack.push(3)

    print stack.get()

    print stack.pop()
    print stack.get()
    stack.push(4)
    print stack.get()

def test2():
    q = Queue()
    q.queue(0)
    q.queue(1)
    q.queue(2)
    q.queue(3)

    print q.get()
    print q.dequeue()
    print q.dequeue()
    print q.get()
    q.queue(4)
    print q.get()

def test3():
    s = StackMin()
    s.push(2)
    s.push(1)
    s.push(0)
    s.push(3)
    s.push(4)

    print s.get()
    print s.getMins()
    print s.getMin()

def test4():
    q = QueueFromStacks()
    q.queue(0)
    q.queue(1)
    q.queue(2)
    q.queue(3)

    print q.get()
    print q.dequeue()
    print q.dequeue()
    print q.get()
    q.queue(4)
    q.queue(5)
    print q.get()
    print q.dequeue()
    print q.dequeue()
    print q.get()

test4()