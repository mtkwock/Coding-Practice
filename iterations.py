import itertools

def squares(n):
    i = 0
    while i < n:
        yield i * i
        i += 1

for x, y in itertools.izip(["a", "b", "c"], [1, 2, 3]):
    print x, y


for square in squares(10):
    print square