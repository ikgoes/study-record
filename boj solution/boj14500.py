def inRange(n,m,x,y):
    return ((x>=0) and (y>=0) and (x<n) and (y<m))

u, d, l, r = [-1,0],[1,0],[0,-1],[0,1]
poly = [
    [[r,r,r],[l,l,l],[u,u,u],[d,d,d]],
    [[r,d,l],[d,l,u],[l,u,r],[u,r,d]],
    [[r,r,d],[r,r,u],[u,u,l],[u,u,r],[l,l,u],[l,l,d],[d,d,l],[d,d,r]],
    [[d,r,d],[d,l,d],[l,d,l],[l,u,l],[u,r,u],[u,l,u],[r,d,r],[r,u,r]],
    [[r,l,l,r,u],[r,l,l,r,d],[d,u,u,d,l],[d,u,u,d,r]]
]

n,m = list(map(int, input().split()))

arr = list()
for i in range(n):
    arr.append(list(map(int, input().split())))

MAX = -1

for i in range(n):
    for j in range(m):
        for k in range(5):
            for path in poly[k]:
                x, y = i, j     
                tmp = arr[x][y]    
                for t, (dx, dy) in enumerate(path):
                    x, y = x+dx, y+dy
                    if not inRange(n,m,x,y):
                        break
                    if k==4 and t%2==1:
                        continue
                    else:
                        tmp += arr[x][y]
                MAX = max(MAX, tmp)
print(MAX)

# 모든 도형을 i,j에 따라서 체크하면 더 효율적
# 현재 버전은 i,j에서 모든 도형을 넣어보는 형태 -> (0,0) ~ (0,3) 의 도형과 (0,3) ~ (0,0) 의 도형이 중복으로 확인되어 약간 비효율적