N = int(input())
num = list(map(int, input().split()))
op = list(map(int, input().split())) 

maxi = -123456789
mini = -maxi

def dfs(d, total, add, sub, mul, div):
    global maxi, mini
    if d == N:
        maxi, mini = max(total, maxi), min(total, mini)
        return
    if add:
        dfs(d + 1, total + num[d], add - 1, sub, mul, div)
    if sub:
        dfs(d + 1, total - num[d], add, sub - 1, mul, div)
    if mul:
        dfs(d + 1, total * num[d], add, sub, mul - 1, div)
    if div:
        dfs(d + 1, int(total/num[d]), add, sub, mul, div - 1)

dfs(1,num[0],op[0],op[1],op[2],op[3])
print(f"{maxi}\n{mini}")