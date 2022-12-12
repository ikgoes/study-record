def inrange(n, x, y):
    return (x>=0 and y>=0 and x<n and y<n)

def can_pass(now, next):
    return next <= now

def can_eat(now, next):
    return (0<next and next < now)

def check_possible_fish(size, fish):
    possible_fish = []
    for i,v in enumerate(fish):        
        for j, k in enumerate(v):
            if can_eat(size, k):
                possible_fish.append([i,j])
    return possible_fish

def can_go(now, n, water, size, dx=[-1,0,0,1],dy=[0,-1,1,0]):
    x,y = now
    queue = list()
    check = [[0]*n for _ in range(n)]
    queue.append([x,y, 0])
    check[x][y] = 1
    max_d = 0
    candidate = list()
    
    while queue:
        x,y,d = queue.pop(0)
        if max_d < d:
            max_d = max(max_d, d)
            if candidate:
                break
        if can_eat(size, water[x][y]):
            candidate.append([x,y,d])
            continue
        for k in range(4):
            nx, ny = x + dx[k], y + dy[k]
            if inrange(n, nx, ny) and check[nx][ny] == 0 and can_pass(size, water[nx][ny]):
                queue.append([nx,ny,d+1])
                check[nx][ny] = 1
                
    candidate.append([_,_,987654321])
    return sorted(candidate)[0]
    
baby = [-1,-1]
baby_size = 2
baby_sum = 0

n = int(input())
water = list()
fish_count = 0

for _ in range(n):
    water.append(list(map(int,input().split())))
    for idx, val in enumerate(water[-1]):
        if val == 9:
            baby = [len(water)-1, idx]
            water[len(water)-1][idx] = 0
        elif val != 0:
            fish_count += 1

time = 0

while fish_count:
    x,y,d = can_go(baby, n, water, baby_size)
    if d != 987654321:
        baby = [x,y]
        water[x][y] = 0
        fish_count -= 1
        baby_sum += 1
        time += d
        if baby_sum == baby_size:
            baby_size += 1
            baby_sum = 0          
    else:
        break
          
print(time)