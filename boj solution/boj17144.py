def spread(arr, cleaner, r, c):
    temp = [[0]*c for _ in range(r)]
    move = [(0,1),(0,-1),(1,0),(-1,0)]
    for i in range(r):
        for j in range(c):
            if arr[i][j]==0 or arr[i][j]==-1: continue
            cnt = 0
            for x, y in move:
                cx = i+x
                cy = j+y
                if 0<=cx<r and 0<=cy<c and arr[cx][cy]!= -1:
                    temp[cx][cy] += arr[i][j]//5
                    cnt += 1
            temp[i][j] += arr[i][j]-cnt*(arr[i][j]//5)
    temp[cleaner[0][0]][cleaner[0][1]] = -1
    temp[cleaner[1][0]][cleaner[1][1]] = -1
    arr = temp
    return arr

def clean(cleaner, move, arr):
    x, y = cleaner
    last = 0
    j = 0
    start = (x, y)
    x += move[0][0]
    y += move[0][1]
    while x != start[0] or y != start[1]:
        next = arr[x][y]
        arr[x][y] = last
        last = next
        x += move[j][0]
        y += move[j][1]
        if not (0<=x<r and 0<=y<c):
            if j == 3: break
            x = x - move[j][0] + move[j+1][0]
            y = y - move[j][1] + move[j+1][1]
            j += 1
    return arr

r,c,t = map(int, input().split())

UP, DOWN, LEFT, RIGHT = (-1, 0), (1, 0), (0, -1), (0, 1)
dx = [0,0,1,-1]
dy = [1,-1,0,0]
MAP = list()
cleaner = list()

for i in range(r):
    tmp = input().split(' ')
    tmp = list(map(int, tmp))
    MAP.append(tmp)

for i in range(r):
    for j in range(c):
        if MAP[i][j] == -1:
            cleaner.append([i,j])

for _ in range(t):
    # 미세먼지 확산
    MAP = spread(MAP, cleaner,r,c)
    # 공기청정기 작동
    MAP = clean(cleaner[0],  [RIGHT, UP, LEFT, DOWN], MAP)
    MAP = clean(cleaner[1],  [RIGHT, DOWN, LEFT, UP], MAP)

cnt = 0
for i in range(r):
    for j in range(c):
        if MAP[i][j] and MAP[i][j] != -1:
            cnt+= MAP[i][j]
print(cnt)