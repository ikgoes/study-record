
import sys
input = sys.stdin.readline

N, M = map(int, input().split())
r, c, d = map(int, input().split()) 
direction = [(-1,0),(0,1),(1,0),(0,-1)] 
MAP = []
for i in range(N):
    MAP.append(list(map(int, input().split())))
 
cnt = 0
while 1:
    if MAP[r][c] != 2:
        cnt += 1
    MAP[r][c] = 2
 
    flag = False
    for i in range(4):
        dx, dy = direction[(d + i) % 4]
        if MAP[r + dx][c + dy] == 0:
            flag = True
    
    if flag:
        d += 3 
        dx, dy = direction[d % 4]
        if MAP[r+dx][c+dy] == 0:
            r += dx
            c += dy

    else:
        dx, dy = direction[(d + 2) % 4]

        if MAP[r+dx][c+dy] == 1:
            print(cnt)
            exit()
        else:
            r += dx
            c += dy