import random as r

# In place swap
def swap(arr, idx1, idx2):
    t = arr[idx1]
    arr[idx1] = arr[idx2]
    arr[idx2] = t

def _quicksort(arr, beg, end):
    if beg < end:
        p = _partition(arr, beg, end)
        _quicksort(arr, beg, p - 1) # Sort the left side
        _quicksort(arr, p+1, end) # Sort the right side

def _partition(arr, beg, end):
    pivot = arr[end]
    i = beg
    for j in range(beg, end):
        if arr[j] <= pivot:
            swap(arr, i, j)
            i = i + 1
    swap(arr, i, end)
    return i

def quicksort(arr):
    _quicksort(arr, 0, len(arr) - 1)

def _mergelists(l1, l2):
    out = []
    while l1 or l2:
        if not l1:
            out.append(l2[0])
            l2 = l2[1:]
            continue
        if not l2:
            out.append(l1[0])
            l1 = l1[1:]
            continue
        if l1[0] <= l2[0]:
            out.append(l1[0])
            l1 = l1[1:]
        else:
            out.append(l2[0])
            l2 = l2[1:]
    return out

def mergesort(arr):
    bigArr = [[x] for x in arr]
    while len(bigArr) > 1:
        i = 0
        while i < len(bigArr) - 1:
            bigArr[i] = _mergelists(bigArr[i], bigArr[i+1])
            bigArr.pop(i+1)
            i = i + 1

    return bigArr[0]

def test1():
    a = [r.randint(-100, 100) for x in range(50)]
    print a
    quicksort(a)
    print a

def test2():
    a = [r.randint(0, 100) for x in range(20)]
    print a
    print mergesort(a)

test2()