import sys
input = sys.stdin.readline

saw = []

saw = [list(input().rstrip()) for _ in range(4)]
k = int(input())
data = []

def rotate_clock(saw):
    saw = saw[-1] + saw[:-1]

def rotate_ban_clock(saw):
    saw = saw[1:] + saw[0]

def dfs(x,y):
    global visited
    if visited[x] == 0:
        visited[x] = 1
        left = saw[x][6]
        right = saw[x][2]
        if y == 1: 
            rotate_clock(saw[x])
        else:
            rotate_ban_clock(saw[x])
        if x-1 >= 0 and left != saw[x-1][2]:
            dfs(x-1,-y) 
        if x+1 <=3 and right != saw[x+1][6]:
            dfs(x+1,-y)

for _ in range(k):
    a,b = map(int,input().split())
    visited = [0] * 4
    dfs(a-1,b)

cnt = 0
for i in range(4):
    if saw[i][0] =='1':
        cnt += (2**i)
print(cnt)