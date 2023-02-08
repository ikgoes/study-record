import sys
from collections import deque

input = sys.stdin.readline
dx = [1,0,0,-1]
dy = [0,1,-1,0]

m,n = map(int, input().split())
arr = [list(map(int, input().rstrip())) for _ in range(n)]
dist = [[-1]*m for _ in range(n)]  

q = deque()
q.append((0,0))
dist[0][0] = 0

while q:
    x, y = q.popleft()
    for k in range(4):
        nx, ny = x + dx[k], y + dy[k]
        if 0 <= nx and 0 <= ny and nx < n and ny < m: 
            if dist[nx][ny] == -1:
                if arr[nx][ny] == 0:
                    q.appendleft((nx, ny))
                    dist[nx][ny] = dist[x][y]
                else:
                    q.append((nx, ny))
                    dist[nx][ny] = dist[x][y] + 1
                    

print(dist[n-1][m-1])