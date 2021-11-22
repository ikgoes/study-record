n = int(input())
arr = list(map(int,input().split()))

idxArr = [x+1 for x in range(n)]

idx = 0
res = str()
tmp = arr.pop(idx)
res += str(idxArr.pop(idx))

while arr:
    if tmp < 0:
        idx = (idx + tmp) % len(arr)
    else:
        idx = (idx + (tmp - 1)) % len(arr)
    tmp = arr.pop(idx)
    res += ' ' + str(idxArr.pop(idx))

print(res)